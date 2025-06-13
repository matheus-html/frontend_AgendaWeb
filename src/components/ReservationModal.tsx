import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, ReservationFormValues } from "@/schemas/reservationSchema";
import { MONTHS, TIME_SLOT_MAP } from "@/utils/date-utils";
import ReservationForm from "./ReservationForm";
import { useAuth } from "@/contexts/AuthContext";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const methods = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
  });
  
  const { handleSubmit, reset } = methods;
  const { token } = useAuth();

  // << CORREÇÃO: Função para transformar os dados do formulário no formato do DTO do backend
  const onSubmit = async (data: ReservationFormValues) => {
    try {
      // 1. Converter 'reservationType' (string) para 'isFixed' (boolean)
      const isFixed = data.reservationType === "fixed";

      // 2. Construir o objeto LocalDateTime no formato ISO (YYYY-MM-DDTHH:mm:ss)
      const monthIndex = MONTHS.indexOf(data.month as any);
      const year = new Date().getFullYear(); // Usando o ano atual
      const day = parseInt(data.dayOfMonth, 10);
      const startTime = TIME_SLOT_MAP[data.timeSlot as keyof typeof TIME_SLOT_MAP].split(' - ')[0]; // Pega "07:00" de "07:00 - 08:00"
      const [hour, minute] = startTime.split(':');

      const localDateTime = new Date(year, monthIndex, day, parseInt(hour), parseInt(minute));
      
      // Formata para ISO string e remove o 'Z' do final para ser um LocalDateTime
      const dateTimeString = localDateTime.toISOString().slice(0, 19);

      // 3. Montar o payload final com os nomes de campo corretos
      const payload = {
        place: data.place,
        dateTime: dateTimeString,
        isFixed: isFixed,
        description: data.description,
        responsible: data.responsible,
      };

      // 4. Enviar para o backend
      const response = await fetch("http://localhost:8080/agendamento/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Assumindo que você precisa de autenticação
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Reserva criada com sucesso!");
        onClose();
        reset();
      } else {
        const errorText = await response.text();
        alert(`Erro ao criar reserva: ${errorText}`);
      }
    } catch (error) {
      console.error("Falha na requisição:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nova Reserva</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para a nova reserva.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReservationForm />
            
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Criar Reserva
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;