import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation, Month, DayOfWeek, TimeSlot, FacilityType, ReservationType } from "../types/scheduler";
import { useAuth } from './AuthContext';
import { TIME_SLOT_MAP, getCurrentMonth } from '../utils/date-utils';
import { useToast } from "@/components/ui/use-toast";

const MONTHS: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getTimeSlotFromHour = (hour: number): TimeSlot | undefined => {
  for (const slot in TIME_SLOT_MAP) {
    const timeRange = TIME_SLOT_MAP[slot as TimeSlot];
    const startHour = parseInt(timeRange.split(':')[0], 10);
    if (startHour === hour) {
      return slot as TimeSlot;
    }
  }
  return undefined;
};

const transformBackendData = (data: any[]): Reservation[] => {
  if (!data) return [];
  return data.map(item => {
    const date = new Date(item.dateTime);
    const dayIndex = (date.getDay() + 6) % 7;

    return {
      id: item.id,
      dateTime: item.dateTime,
      isFixed: item.isFixed,
      facility: item.place,
      description: item.description,
      responsible: item.responsible,
      timeSlot: getTimeSlotFromHour(date.getHours())!,
      month: MONTHS[date.getMonth()],
      day: DAYS_OF_WEEK[dayIndex],
    };
  });
};

interface SchedulerContextType {
  reservations: Reservation[];
  filteredReservations: Reservation[];
  fetchReservations: () => void;
  deleteReservation: (id: string) => Promise<void>;
  selectedMonth: Month;
  setSelectedMonth: (month: Month) => void;
  selectedYear: number;
  selectedFacility: FacilityType | "all";
  setSelectedFacility: (facility: FacilityType | "all") => void;
  selectedDay: DayOfWeek | undefined;
  setSelectedDay: (day: DayOfWeek | undefined) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export const useScheduler = () => {
  const context = useContext(SchedulerContext);
  if (!context) throw new Error('useScheduler deve ser usado dentro de um SchedulerProvider');
  return context;
};

export const SchedulerProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
  const [selectedYear] = useState<number>(new Date().getFullYear());
  const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
  const { token, logout } = useAuth();
  const { toast } = useToast();

  const fetchReservations = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:8080/agendamento/listagem', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.status === 401) {
        toast({ title: "Sessão Expirada", description: "Por favor, faça login novamente.", variant: "destructive" });
        logout();
        return;
      }
      
      if (response.ok) {
        const data = await response.json();
        setReservations(transformBackendData(data));
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      setReservations([]);
      toast({ title: "Erro de Rede", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    }
  };

  const deleteReservation = async (id: string) => {
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:8080/agendamento/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        toast({ title: "Sucesso", description: "Reserva deletada com sucesso." });
        fetchReservations();
      } else {
        const errorText = await response.text();
        toast({ title: "Erro", description: `Não foi possível deletar a reserva: ${errorText}`, variant: "destructive" });
      }
    } catch (error) {
      console.error("Failed to delete reservation:", error);
      toast({ title: "Erro de Rede", description: "Não foi possível conectar ao servidor.", variant: "destructive" });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [token]);

  const filteredReservations = reservations.filter(r => {
    const monthMatch = r.month === selectedMonth;
    const facilityMatch = selectedFacility === 'all' || r.facility === selectedFacility;
    const dayMatch = !selectedDay || r.day === selectedDay;
    return monthMatch && facilityMatch && dayMatch;
  });

  const value = {
    reservations,
    filteredReservations,
    fetchReservations,
    deleteReservation,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    selectedFacility,
    setSelectedFacility,
    selectedDay,
    setSelectedDay,
  };

  return (
    <SchedulerContext.Provider value={value}>
      {children}
    </SchedulerContext.Provider>
  );
};