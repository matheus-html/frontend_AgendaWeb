
import React, { useState } from "react";
import { useScheduler } from "@/contexts/SchedulerContext";
import {
  DAYS_OF_WEEK,
  getFirstDayOfMonth,
  getMonthDays
} from "@/utils/date-utils";
import ReservationCard from "./ReservationCard";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import ReservationModal from "./ReservationModal";
import { Reservation } from "@/types/scheduler";
import { dayTranslations } from "@/utils/translations";

const MonthlyView: React.FC = () => {
  const { filteredReservations, selectedMonth, selectedYear, deleteReservation } = useScheduler();
  const [selectedReservation, setSelectedReservation] = useState<Reservation | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const daysInMonth = getMonthDays(selectedMonth, selectedYear);
  const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);

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

  const getReservationsForDayNumber = (day: number) => {
    const dayOfWeekIndex = (firstDay + day - 1) % 7;
    const dayName = DAYS_OF_WEEK[dayOfWeekIndex];
    
    return filteredReservations.filter(
      (reservation) => reservation.day === dayName
    );
  };

  // Gerar grade do calendário
  const calendarDays = [];
  // Adicionar células vazias para os dias antes do primeiro dia do mês
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="border border-scheduler-gray-medium/30 p-1 bg-gray-50/50 rounded-sm" />);
  }

  // Adicionar dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const dayReservations = getReservationsForDayNumber(day);
    calendarDays.push(
      <div key={day} className="border border-scheduler-gray-medium/30 min-h-[100px] p-1 hover:bg-gray-50/70 transition rounded-sm">
        <div className="text-right text-xs font-medium mb-1 text-scheduler-blue-dark">{day}</div>
        <div className="space-y-1 overflow-y-auto max-h-[90px]">
          {dayReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onEdit={() => handleEditReservation(reservation)}
              onDelete={() => handleDeleteReservation(reservation)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 animate-fade-in">
        {DAYS_OF_WEEK.map((day) => (
          <div 
            key={day} 
            className="p-2 font-medium text-center border-b border-scheduler-gray-medium/30 bg-scheduler-blue-light/10 text-scheduler-blue-dark truncate"
          >
            {dayTranslations[day]}
          </div>
        ))}
        {calendarDays}
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

export default MonthlyView;
