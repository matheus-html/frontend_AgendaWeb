export type FacilityType = 'Quadra A' | 'Quadra B' | 'Quadra C' | 'Ginásio' | 'Arena';

export type TimeSlot = 'A-M' | 'B-M' | 'C-M' | 'D-M' | 'E-M' | 'F-M' | 'A-T' | 'B-T' | 'C-T' | 'D-T' | 'E-T' | 'F-T' | 'A-N' | 'B-N';

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export interface Reservation {
  id: string;
  dateTime: string;
  isFixed: boolean;
  facility: FacilityType;
  description: string;
  responsible: string;
  timeSlot: TimeSlot;
  month: Month;
  day: DayOfWeek;
}