import React, { useState, useEffect } from "react";
import { DAYS_OF_WEEK, TIME_SLOTS, TIME_SLOT_MAP, getTimeSlotLetter, getPeriodLabel, groupTimeSlotsByPeriod } from "@/utils/date-utils";
import { useScheduler } from "@/contexts/SchedulerContext";
import ReservationCard from "./ReservationCard";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import EditReservationModal from "./EditReservationModal";
import { Reservation, TimeSlot, DayOfWeek, Month } from "@/types/scheduler";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { dayTranslations } from "@/utils/translations";

const MESES_TRADUZIDOS: Record<string, string> = {
  "January": "Janeiro", "February": "Fevereiro", "March": "Março", "April": "Abril",
  "May": "Maio", "June": "Junho", "July": "Julho", "August": "Agosto",
  "September": "Setembro", "October": "Outubro", "November": "Novembro", "December": "Dezembro"
};

const getStartOfWeek = (date: Date): Date => {
  const dt = new Date(date);
  const day = dt.getDay();
  const diff = dt.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(dt.setDate(diff));
};

const WeeklyView: React.FC = () => {
  const { 
    filteredReservations, 
    deleteReservation, 
    selectedMonth, 
    selectedYear,
    selectedDay, 
    setSelectedDay 
  } = useScheduler();

  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [visibleReservations, setVisibleReservations] = useState<Reservation[]>([]);
  const [weekStartDate, setWeekStartDate] = useState(() => getStartOfWeek(new Date()));
  const groupedTimeSlots = groupTimeSlotsByPeriod();
  
  const MONTHS: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const startOfWeek = getStartOfWeek(weekStartDate);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const weekBasedReservations = filteredReservations.filter(reservation => {
      const reservationDate = new Date(reservation.dateTime);
      return reservationDate >= startOfWeek && reservationDate < endOfWeek;
    });
    
    setVisibleReservations(weekBasedReservations);
  }, [filteredReservations, weekStartDate]);

  useEffect(() => {
    const monthIndex = MONTHS.indexOf(selectedMonth);
    const firstDayOfMonth = new Date(selectedYear, monthIndex, 1);
    setWeekStartDate(getStartOfWeek(firstDayOfMonth));
  }, [selectedMonth, selectedYear]);
  
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

  const getReservationsByDayAndTime = (day: DayOfWeek, timeSlot: TimeSlot) => {
    return visibleReservations.filter(
      (reservation) => reservation.day === day && reservation.timeSlot === timeSlot
    );
  };

  const handlePreviousWeek = () => {
    setWeekStartDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 7);
      return newDate;
    });
  };
  
  const handleNextWeek = () => {
    setWeekStartDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 7);
      return newDate;
    });
  };

  const formatWeekRange = (start: Date): string => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startDay = start.getDate();
    const startMonth = MESES_TRADUZIDOS[MONTHS[start.getMonth()]];
    const endDay = end.getDate();
    const endMonth = MESES_TRADUZIDOS[MONTHS[end.getMonth()]];
    
    if (startMonth === endMonth) {
        return `Semana de ${startDay} a ${endDay} de ${startMonth}`;
    }
    return `Semana de ${startDay} de ${startMonth} a ${endDay} de ${endMonth}`;
  };

  const handleDayClick = (day: DayOfWeek) => {
    setSelectedDay(day === selectedDay ? undefined : day);
  };

  useEffect(() => {
    return () => {
      setSelectedDay(undefined);
    };
  }, [setSelectedDay]);

  const renderPeriodSection = (periodName: string, timeSlots: TimeSlot[]) => (
    <React.Fragment key={periodName}>
      <div className="period-header col-span-8 bg-scheduler-blue-dark text-white text-center py-2 font-bold">
        {periodName}
      </div>
      
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
      <div className="flex items-center justify-between mb-2 p-3 glass-card rounded-lg">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-scheduler-blue-medium mr-2" />
          <h2 className="text-lg font-semibold text-scheduler-blue-dark">{formatWeekRange(weekStartDate)}</h2>
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

      <div className="grid grid-cols-8 gap-0">
        <div className="p-2 bg-white border border-scheduler-gray-medium/30 rounded-tl-lg"></div>
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

      <div className="grid grid-cols-8 gap-0 border-collapse rounded-b-lg overflow-hidden">
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

      {selectedReservation && (
          <EditReservationModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            reservation={selectedReservation}
          />
      )}
    </div>
  );
};

export default WeeklyView;