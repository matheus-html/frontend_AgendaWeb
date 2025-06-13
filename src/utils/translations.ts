
import { DayOfWeek, Month } from "@/types/scheduler";

// Mapeamento dos dias da semana para português
export const dayTranslations: Record<DayOfWeek, string> = {
  'Monday': 'Segunda',
  'Tuesday': 'Terça',
  'Wednesday': 'Quarta',
  'Thursday': 'Quinta',
  'Friday': 'Sexta',
  'Saturday': 'Sábado',
  'Sunday': 'Domingo'
};

// Mapeamento dos meses para português
export const monthTranslations: Record<Month, string> = {
  'January': 'Janeiro',
  'February': 'Fevereiro',
  'March': 'Março',
  'April': 'Abril',
  'May': 'Maio',
  'June': 'Junho',
  'July': 'Julho',
  'August': 'Agosto',
  'September': 'Setembro',
  'October': 'Outubro',
  'November': 'Novembro',
  'December': 'Dezembro'
};
