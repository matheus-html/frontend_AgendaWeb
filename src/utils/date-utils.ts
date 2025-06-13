import { DayOfWeek, Month, TimeSlot, TimeSlotMap } from "../types/scheduler";

export const MONTHS: Month[] = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const TIME_SLOTS: TimeSlot[] = [
  // Manhã
  'A-M', 'B-M', 'C-M', 'D-M', 'E-M', 'F-M',
  // Tarde
  'A-T', 'B-T', 'C-T', 'D-T', 'E-T', 'F-T',
  // Noite
  'A-N', 'B-N'
];

export const TIME_SLOT_MAP: TimeSlotMap = {
  // Manhã
  'A-M': '07:00 - 08:00',
  'B-M': '08:00 - 09:00',
  'C-M': '09:00 - 10:00',
  'D-M': '10:00 - 11:00',
  'E-M': '11:00 - 12:00',
  'F-M': '12:00 - 13:00',
  // Tarde
  'A-T': '13:00 - 14:00',
  'B-T': '14:00 - 15:00',
  'C-T': '15:00 - 16:00',
  'D-T': '16:00 - 17:00',
  'E-T': '17:00 - 18:00',
  'F-T': '18:00 - 19:00',
  // Noite
  'A-N': '19:00 - 20:00',
  'B-N': '20:00 - 21:00'
};

export const getCurrentMonth = (): Month => {
  const monthIndex = new Date().getMonth();
  return MONTHS[monthIndex];
};

export const getMonthDays = (month: Month, year: number): number => {
  const monthIndex = MONTHS.indexOf(month);
  // 0th day of next month is the last day of current month
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getFirstDayOfMonth = (month: Month, year: number): number => {
  const monthIndex = MONTHS.indexOf(month);
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want 0 for Monday, so we adjust
  const day = new Date(year, monthIndex, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const formatTimeSlot = (timeSlot: TimeSlot): string => {
  return TIME_SLOT_MAP[timeSlot];
};

export const getPeriodLabel = (timeSlot: TimeSlot): string => {
  if (timeSlot.endsWith('-M')) return 'Manhã';
  if (timeSlot.endsWith('-T')) return 'Tarde';
  if (timeSlot.endsWith('-N')) return 'Noite';
  return '';
};

export const getTimeSlotLetter = (timeSlot: TimeSlot): string => {
  return timeSlot.split('-')[0];
};

export const groupTimeSlotsByPeriod = () => {
  return {
    'Manhã': TIME_SLOTS.filter(slot => slot.endsWith('-M')),
    'Tarde': TIME_SLOTS.filter(slot => slot.endsWith('-T')),
    'Noite': TIME_SLOTS.filter(slot => slot.endsWith('-N'))
  };
};
