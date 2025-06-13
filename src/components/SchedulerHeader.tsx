
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MONTHS } from "@/utils/date-utils";
import { useScheduler } from "@/contexts/SchedulerContext";
import { FacilityType } from "@/types/scheduler";
import { Calendar, Clock, Plus } from "lucide-react";
import ReservationModal from "./ReservationModal";

interface SchedulerHeaderProps {
  view: "weekly" | "monthly";
  setView: (view: "weekly" | "monthly") => void;
}

// Traduzir meses
const MESES_TRADUZIDOS = {
  January: "Janeiro",
  February: "Fevereiro",
  March: "Março",
  April: "Abril",
  May: "Maio",
  June: "Junho",
  July: "Julho",
  August: "Agosto",
  September: "Setembro",
  October: "Outubro",
  November: "Novembro",
  December: "Dezembro"
};

const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({ view, setView }) => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedFacility,
    setSelectedFacility,
    selectedReservationType,
    setSelectedReservationType,
  } = useScheduler();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Traduzir nomes das quadras
  const facilities: (FacilityType | "all")[] = ["all", "Quadra A", "Quadra B", "Quadra C", "Ginásio", "Arena"];
  const reservationTypes = ["all", "fixed", "mobile"];
  const reservationTypesLabels = {
    "all": "Todos os Tipos",
    "fixed": "Fixo",
    "mobile": "Móvel"
  };

  const traduzirMes = (mes: string) => {
    return MESES_TRADUZIDOS[mes as keyof typeof MESES_TRADUZIDOS] || mes;
  };

  return (
    <div className="mb-6 space-y-4 bg-white p-4 rounded-t-xl shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={view === "monthly" ? "secondary" : "outline"}
            size="sm"
            className="rounded-full px-4"
            onClick={() => setView("monthly")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Mês
          </Button>
          <Button
            variant={view === "weekly" ? "secondary" : "outline"}
            size="sm"
            className="rounded-full px-4"
            onClick={() => setView("weekly")}
          >
            <Clock className="h-4 w-4 mr-1" />
            Semana
          </Button>
        </div>

        <Button 
          onClick={() => setIsCreateModalOpen(true)} 
          className="bg-scheduler-blue-medium hover:bg-scheduler-blue-dark text-white rounded-full shadow-sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Nova Reserva
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Select
            value={selectedFacility}
            onValueChange={(value) => setSelectedFacility(value as FacilityType | "all")}
          >
            <SelectTrigger className="bg-white rounded-lg border border-scheduler-gray-medium/50">
              <SelectValue placeholder="Selecionar Local" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg">
              {facilities.map((facility) => (
                <SelectItem key={facility} value={facility}>
                  {facility === "all" ? "Todos os Locais" : facility}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value as any)}
          >
            <SelectTrigger className="bg-white rounded-lg border border-scheduler-gray-medium/50">
              <SelectValue placeholder="Selecionar Mês" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg">
              {MONTHS.map((month) => (
                <SelectItem key={month} value={month}>
                  {traduzirMes(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={selectedReservationType}
            onValueChange={(value) => setSelectedReservationType(value as any)}
          >
            <SelectTrigger className="bg-white rounded-lg border border-scheduler-gray-medium/50">
              <SelectValue placeholder="Tipo de Reserva" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg">
              {reservationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {reservationTypesLabels[type as keyof typeof reservationTypesLabels]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ReservationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default SchedulerHeader;
