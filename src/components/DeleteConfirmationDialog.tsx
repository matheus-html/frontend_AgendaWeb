
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Reservation } from "@/types/scheduler";
import { formatTimeSlot } from "@/utils/date-utils";

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

// Tradução dos dias
const DIAS_TRADUZIDOS: Record<string, string> = {
  "Monday": "Segunda-feira",
  "Tuesday": "Terça-feira",
  "Wednesday": "Quarta-feira",
  "Thursday": "Quinta-feira",
  "Friday": "Sexta-feira",
  "Saturday": "Sábado",
  "Sunday": "Domingo"
};

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reservation?: Reservation;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  reservation,
}) => {
  if (!reservation) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Traduzir dia e mês
  const traduzirDia = (dia: string) => DIAS_TRADUZIDOS[dia] || dia;
  const traduzirMes = (mes: string) => MESES_TRADUZIDOS[mes] || mes;

  // Traduzir tipo de reserva
  const traduzirTipoReserva = (tipo: string) => tipo === "fixed" ? "Fixo" : "Móvel";

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Reserva</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta reserva?
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p><strong>Local:</strong> {reservation.facility}</p>
              <p><strong>Data:</strong> {`${traduzirDia(reservation.day)}, ${traduzirMes(reservation.month)}`}</p>
              <p><strong>Horário:</strong> {formatTimeSlot(reservation.timeSlot)}</p>
              <p><strong>Evento:</strong> {reservation.comments.eventDescription}</p>
              <p><strong>Reservado por:</strong> {reservation.comments.bookedBy}</p>
            </div>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
