
import React, { useState, useEffect } from "react";
import { DAYS_OF_WEEK, TIME_SLOTS, TIME_SLOT_MAP, getTimeSlotLetter, getPeriodLabel, groupTimeSlotsByPeriod } from "@/utils/date-utils";
import { useScheduler } from "@/contexts/SchedulerContext";
import ReservationCard from "./ReservationCard";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import ReservationModal from "./ReservationModal";
import { Reservation, TimeSlot, DayOfWeek } from "@/types/scheduler";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { dayTranslations } from "@/utils/translations";

// Tradução dos meses
const MESES_TRADUZIDOS: Record<string, string> = {
  "January": "Janeiro",
  "February": "Fevereiro",
  "March": "Março",
  "April": "Abril",
  "May": "Maio",
  "June": "Junho",
  "July": "Julho",
  "August": "Agosto",
  "September": "Setembro",
  "October": "Outubro",
  "November": "Novembro",
  "December": "Dezembro"
};

const WeeklyView: React.FC = () => {
  const { filteredReservations, deleteReservation, selectedMonth, selectedDay, setSelectedDay } = useScheduler();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(1); // Track current week
  const [weekOffset, setWeekOffset] = useState(0); // Para controlar o deslocamento das semanas
  const [visibleReservations, setVisibleReservations] = useState<Reservation[]>([]);
  const groupedTimeSlots = groupTimeSlotsByPeriod();
  
  // Atualizar as reservas visíveis com base no deslocamento da semana
  useEffect(() => {
    // Simulando o filtro por semana (em um caso real, isso seria baseado em datas reais)
    // Aqui estamos filtrando as reservas com base no offset da semana
    // Se weekOffset é 0, mostra as reservas da semana atual
    // Se weekOffset é 1, mostra as reservas da próxima semana, etc.
    
    // Aplicamos um filtro com base no offset da semana
    // Para simulação, vamos usar o ID da reserva para determinar a que semana pertence
    const weekBasedReservations = filteredReservations.filter(reservation => {
      // Simulação: usar o ID numérico para distribuir entre semanas
      // Na prática, isso seria feito com datas reais
      const reservationId = parseInt(reservation.id);
      const reservationWeek = Math.floor(reservationId / 3) % 4 + 1; // Distribui em 4 semanas
      
      return reservationWeek === currentWeek;
    });
    
    setVisibleReservations(weekBasedReservations);
  }, [filteredReservations, weekOffset, currentWeek]);
  
  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsEditModalOpen(true);
  };

  const handleDeleteReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReservation = () => {
    if (selectedReservation) {
      deleteReservation(selectedReservation.id);
    }
  };

  const getReservationsByDayAndTime = (day: string, timeSlot: TimeSlot) => {
    // Usar as reservas filtradas por semana
    return visibleReservations.filter(
      (reservation) => reservation.day === day && reservation.timeSlot === timeSlot
    );
  };

  // Manipuladores de semana anterior e próxima
  const handlePreviousWeek = () => {
    setCurrentWeek(prev => Math.max(prev - 1, 1));
    setWeekOffset(prev => prev - 1);
  };
  
  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
    setWeekOffset(prev => prev + 1);
  };

  // Traduzir o mês
  const traduzirMes = (mes: string) => {
    return MESES_TRADUZIDOS[mes] || mes;
  };

  // Função para selecionar um dia da semana
  const handleDayClick = (day: DayOfWeek) => {
    setSelectedDay(day === selectedDay ? undefined : day);
  };

  // Limpar o dia selecionado quando o componente é desmontado
  useEffect(() => {
    return () => {
      setSelectedDay(undefined);
    };
  }, []);

  // Renderiza uma seção de período (Manhã, Tarde, Noite)
  const renderPeriodSection = (periodName: string, timeSlots: TimeSlot[]) => (
    <React.Fragment key={periodName}>
      {/* Cabeçalho do período */}
      <div className="period-header col-span-8 bg-scheduler-blue-dark text-white text-center py-2 font-bold">
        {periodName}
      </div>
      
      {/* Slots de tempo para este período */}
      {timeSlots.map((timeSlot) => (
        <React.Fragment key={timeSlot}>
          <div className="time-slot-header sticky left-0 z-10 rounded-l-lg">
            <div className="font-semibold text-xl text-scheduler-blue-dark">{getTimeSlotLetter(timeSlot)}</div>
            <div className="text-xs text-gray-500 mt-1">{TIME_SLOT_MAP[timeSlot]}</div>
          </div>
          {DAYS_OF_WEEK.map((day) => {
            const dayReservations = getReservationsByDayAndTime(day, timeSlot);
            return (
              <div 
                key={`${day}-${timeSlot}`} 
                className={cn(
                  "time-slot day-column border-scheduler-gray-medium/30",
                  (day === "Saturday" || day === "Sunday") ? "bg-scheduler-gray-light/20" : "bg-white"
                )}
              >
                {dayReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    reservation={reservation}
                    onEdit={() => handleEditReservation(reservation)}
                    onDelete={() => handleDeleteReservation(reservation)}
                  />
                ))}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </React.Fragment>
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* Cabeçalho do seletor de semana */}
      <div className="flex items-center justify-between mb-2 p-3 glass-card rounded-lg">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-scheduler-blue-medium mr-2" />
          <h2 className="text-lg font-semibold text-scheduler-blue-dark">{traduzirMes(selectedMonth)} - Semana {currentWeek}</h2>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-scheduler-blue-medium text-scheduler-blue-medium hover:bg-scheduler-blue-light/20 rounded-full"
            onClick={handlePreviousWeek}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-scheduler-blue-medium text-scheduler-blue-medium hover:bg-scheduler-blue-light/20 rounded-full"
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Cabeçalho dos dias */}
      <div className="grid grid-cols-8 gap-0">
        <div className="p-2 bg-white border border-scheduler-gray-medium/30 rounded-tl-lg"></div> {/* Célula vazia para coluna de tempo */}
        {DAYS_OF_WEEK.map((day, index) => (
          <div 
            key={day} 
            className={cn(
              "p-2 text-center font-medium border border-scheduler-gray-medium/30 cursor-pointer",
              day === selectedDay 
                ? "bg-scheduler-blue-dark text-white" 
                : day === "Saturday" || day === "Sunday" 
                  ? "bg-scheduler-gray-light/50 text-scheduler-blue-dark" 
                  : "bg-scheduler-blue-medium text-white hover:bg-scheduler-blue-dark/90",
              index === DAYS_OF_WEEK.length - 1 ? "rounded-tr-lg" : ""
            )}
            onClick={() => handleDayClick(day)}
          >
            {dayTranslations[day]}
          </div>
        ))}
      </div>

      {/* Grade do calendário com seções de período */}
      <div className="grid grid-cols-8 gap-0 border-collapse rounded-b-lg overflow-hidden">
        {/* Renderizar cada seção de período */}
        {renderPeriodSection('Manhã', groupedTimeSlots['Manhã'])}
        {renderPeriodSection('Tarde', groupedTimeSlots['Tarde'])}
        {renderPeriodSection('Noite', groupedTimeSlots['Noite'])}
      </div>

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteReservation}
        reservation={selectedReservation}
      />

      <ReservationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        reservation={selectedReservation}
        isEdit={true}
      />
    </div>
  );
};

export default WeeklyView;
