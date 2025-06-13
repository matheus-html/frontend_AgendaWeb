
import { Reservation } from "@/types/scheduler";

// Função para verificar quantas reservas cada local tem
export const getFacilityUsage = (facilityName: string, reservations: Reservation[]): number => {
  return reservations.filter(res => res.facility === facilityName).length;
};

// Função para determinar a cor de cada local baseado em seu uso
export const getFacilityColor = (facilityName: string, reservations: Reservation[]): string => {
  const usage = getFacilityUsage(facilityName, reservations);
  if (usage === 0) return "border-green-500 bg-green-100"; // Disponível
  if (usage <= 2) return "border-yellow-400 bg-yellow-50"; // Parcialmente ocupado
  return "border-red-500 bg-red-50"; // Muito ocupado
};

// Função para determinar o texto do status
export const getFacilityStatus = (facilityName: string, reservations: Reservation[]): string => {
  const usage = getFacilityUsage(facilityName, reservations);
  if (usage === 0) return "Livre";
  if (usage <= 2) return `${usage} reservas`;
  return "Ocupado";
};

// Lista de instalações disponíveis
export const facilities = ['Quadra A', 'Quadra B', 'Quadra C', 'Ginásio', 'Arena'];
