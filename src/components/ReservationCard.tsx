
import React from "react";
import { Reservation } from "@/types/scheduler";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { formatTimeSlot } from "@/utils/date-utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

interface ReservationCardProps {
  reservation: Reservation;
  onEdit: () => void;
  onDelete: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onEdit, onDelete }) => {
  // Determinar cor de fundo com base no tipo de reserva
  const cardClass = reservation.reservationType === "fixed" 
    ? "reservation-fixed" 
    : "reservation-mobile";

  // Traduzir tipo de reserva
  const traduzirTipoReserva = (tipo: string) => tipo === "fixed" ? "Fixo" : "Móvel";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`p-2 my-1 shadow-sm hover-effect relative ${cardClass}`}>
          <div className="flex justify-between items-start">
            <div className="font-medium text-xs truncate">
              {reservation.comments.eventDescription}
            </div>
          </div>
          
          <div className="mt-1 flex items-center justify-between">
            <div className="text-[10px] opacity-80">
              por {reservation.comments.bookedBy}
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-70 hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  onEdit();
                }}
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-70 hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  onDelete();
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        className="bg-white border border-scheduler-gray-medium p-3 rounded-md shadow-lg w-64 z-50" 
        side="right"
        align="start"
        sideOffset={5}
      >
        <h4 className="font-bold text-sm mb-1">{reservation.comments.eventDescription}</h4>
        <p className="mb-1 text-sm"><span className="font-medium">Por:</span> {reservation.comments.bookedBy}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Local:</span> {reservation.facility}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Tipo:</span> {traduzirTipoReserva(reservation.reservationType)}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Horário:</span> {formatTimeSlot(reservation.timeSlot)}</p>
        {reservation.comments.additionalDetails && (
          <p className="mb-1 text-sm"><span className="font-medium">Detalhes:</span> {reservation.comments.additionalDetails}</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};

export default ReservationCard;
