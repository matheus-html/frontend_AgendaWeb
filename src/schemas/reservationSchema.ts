import { z } from "zod";

// << CORREÇÃO: Schema ajustado para corresponder ao DTO do backend.
export const reservationSchema = z.object({
  place: z.string().min(1, "O local é obrigatório."),
  month: z.string().min(1, "O mês é obrigatório."),
  dayOfMonth: z.string().min(1, "O dia do mês é obrigatório."), // << ADICIONADO: Campo para o dia exato.
  timeSlot: z.string().min(1, "O horário é obrigatório."),
  reservationType: z.enum(["fixed", "mobile"]), // Este será convertido para 'isFixed' (boolean)
  responsible: z.string().min(1, "Nome do responsável é obrigatório"),
  description: z.string().min(1, "Descrição do evento é obrigatória"),
});

export type ReservationFormValues = z.infer<typeof reservationSchema>;