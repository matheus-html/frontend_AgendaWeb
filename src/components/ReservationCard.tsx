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
  const cardClass = reservation.isFixed 
    ? "reservation-fixed" 
    : "reservation-mobile";

  const traduzirTipoReserva = (isFixed: boolean) => isFixed ? "Fixo" : "Móvel";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`p-2 my-1 shadow-sm hover-effect relative ${cardClass}`}>
          <div className="flex justify-between items-start">
            <div className="font-medium text-xs truncate">
              {reservation.description}
            </div>
          </div>
          
          <div className="mt-1 flex items-center justify-between">
            <div className="text-[10px] opacity-80">
              por {reservation.responsible}
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 opacity-70 hover:opacity-100" 
                onClick={(e) => {
                  e.stopPropagation();
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
                  e.stopPropagation();
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
        <h4 className="font-bold text-sm mb-1">{reservation.description}</h4>
        <p className="mb-1 text-sm"><span className="font-medium">Por:</span> {reservation.responsible}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Local:</span> {reservation.facility}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Tipo:</span> {traduzirTipoReserva(reservation.isFixed)}</p>
        <p className="mb-1 text-sm"><span className="font-medium">Horário:</span> {formatTimeSlot(reservation.timeSlot)}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ReservationCard;