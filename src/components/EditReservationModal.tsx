import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, ReservationFormValues } from "@/schemas/reservationSchema";
import { MONTHS, TIME_SLOT_MAP } from "@/utils/date-utils";
import ReservationForm from "./ReservationForm";
import { useAuth } from "@/contexts/AuthContext";
import { Reservation } from "@/types/scheduler";
import { useScheduler } from "@/contexts/SchedulerContext";

interface EditReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation; 
}

const EditReservationModal: React.FC<EditReservationModalProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  const methods = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });

  const { handleSubmit, reset } = methods;
  const { token } = useAuth();
  const { fetchReservations } = useScheduler();

  useEffect(() => {
    if (reservation) {
      const date = new Date(reservation.dateTime);
      const formValues: ReservationFormValues = {
        place: reservation.facility,
        month: MONTHS[date.getMonth()],
        dayOfMonth: String(date.getDate()),
        timeSlot: reservation.timeSlot,
        reservationType: reservation.isFixed ? 'fixed' : 'mobile',
        responsible: reservation.responsible,
        description: reservation.description,
      };
      reset(formValues);
    }
  }, [isOpen, reservation, reset]);

  const onSubmit = async (data: ReservationFormValues) => {
    const isFixed = data.reservationType === "fixed";
    const monthIndex = MONTHS.indexOf(data.month as any);
    const year = new Date().getFullYear();
    const day = parseInt(data.dayOfMonth, 10);
    const startTime = TIME_SLOT_MAP[data.timeSlot as keyof typeof TIME_SLOT_MAP].split(' - ')[0];
    const [hour, minute] = startTime.split(':');
    const localDateTime = new Date(year, monthIndex, day, parseInt(hour), parseInt(minute));
    const dateTimeString = localDateTime.toISOString().slice(0, 19);

    const payload = {
      place: data.place,
      dateTime: dateTimeString,
      isFixed,
      description: data.description,
      responsible: data.responsible,
    };
    
    const url = `http://localhost:8080/agendamento/edit/${reservation.id}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Reserva atualizada com sucesso!");
        fetchReservations();
        onClose();
      } else {
        const errorText = await response.text();
        alert(`Erro ao atualizar reserva: ${errorText}`);
      }
    } catch (error) {
      console.error("Falha na requisição de edição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Reserva</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da reserva.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReservationForm />
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Alterações</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditReservationModal;