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
  
  // << MELHORIA: Cria um objeto de data para formatação
  const reservationDate = new Date(reservation.dateTime);
  const diaDoMes = reservationDate.getDate();
  const nomeDoMes = MESES_TRADUZIDOS[reservation.month] || reservation.month;
  const nomeDoDia = DIAS_TRADUZIDOS[reservation.day] || reservation.day;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Reserva</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esta reserva?
            <div className="mt-2 p-3 bg-gray-50 rounded-md border text-sm text-gray-800">
              <p><strong>Local:</strong> {reservation.facility}</p>
              {/* << CORREÇÃO: Exibe a data completa para maior clareza */}
              <p><strong>Data:</strong> {`${nomeDoDia}, ${diaDoMes} de ${nomeDoMes}`}</p>
              <p><strong>Horário:</strong> {formatTimeSlot(reservation.timeSlot)}</p>
              {/* << CORREÇÃO: Acessa 'description' diretamente */}
              <p><strong>Evento:</strong> {reservation.description}</p>
              {/* << CORREÇÃO: Acessa 'responsible' diretamente */}
              <p><strong>Reservado por:</strong> {reservation.responsible}</p>
            </div>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;