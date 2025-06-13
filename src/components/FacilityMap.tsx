
import React from "react";
import { Reservation, DayOfWeek } from "@/types/scheduler";
import { Maximize2 } from "lucide-react";
import { dayTranslations } from "@/utils/translations";
import { MapFacility } from "./facility-map/MapFacility";
import { MapBackgroundGrid } from "./facility-map/MapBackgroundGrid";
import { MapConnectionPaths } from "./facility-map/MapConnectionPaths";
import { MapLegend } from "./facility-map/MapLegend";
import { MapScale } from "./facility-map/MapScale";

interface FacilityMapProps {
  reservations: Reservation[];
  selectedDay?: DayOfWeek;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const FacilityMap: React.FC<FacilityMapProps> = ({ 
  reservations, 
  selectedDay, 
  isExpanded = false,
  onToggleExpand
}) => {
  // Filtra reservas pelo dia selecionado se houver um
  const filteredReservations = selectedDay 
    ? reservations.filter(res => res.day === selectedDay)
    : reservations;

  // Traduzir o dia selecionado para português
  const translatedDay = selectedDay ? dayTranslations[selectedDay] : undefined;

  return (
    <div className={`${isExpanded ? 'fixed inset-0 z-50 bg-white/95 flex items-center justify-center p-4' : 'relative w-full h-full'} bg-[#F8F9FA] overflow-hidden rounded-lg`}>
      <MapBackgroundGrid />
      
      {/* Título do mapa */}
      <div className="absolute top-1 left-2 text-[10px] text-gray-500 font-mono">
        {translatedDay ? `PLANTA - ${translatedDay}` : 'PLANTA GERAL'}
      </div>
      
      {/* Botão de expandir */}
      {onToggleExpand && !isExpanded && (
        <button 
          onClick={onToggleExpand}
          className="absolute top-1 right-1 bg-scheduler-blue-medium text-white rounded-md p-1 z-10 hover:bg-scheduler-blue-dark transition-colors"
          title="Expandir"
        >
          <Maximize2 size={12} />
        </button>
      )}
      
      {/* Layout de instalações */}
      <div className={`${isExpanded ? 'absolute inset-12' : 'absolute inset-4'} flex items-center justify-center`}>
        <div className="relative w-full h-full">
          {/* Quadra A (superior esquerda) */}
          <MapFacility 
            name="Quadra A" 
            position="topLeft" 
            reservations={filteredReservations} 
            isExpanded={isExpanded} 
          />
          
          {/* Quadra B (superior direita) */}
          <MapFacility 
            name="Quadra B" 
            position="topRight" 
            reservations={filteredReservations} 
            isExpanded={isExpanded} 
          />
          
          {/* Quadra C (inferior esquerda) */}
          <MapFacility 
            name="Quadra C" 
            position="bottomLeft" 
            reservations={filteredReservations} 
            isExpanded={isExpanded} 
          />
          
          {/* Ginásio (inferior direita) */}
          <MapFacility 
            name="Ginásio" 
            position="bottomRight" 
            reservations={filteredReservations} 
            isExpanded={isExpanded} 
          />
          
          {/* Arena (centro) */}
          <MapFacility 
            name="Arena" 
            position="center" 
            reservations={filteredReservations} 
            isExpanded={isExpanded} 
          />
          
          <MapConnectionPaths />
        </div>
      </div>

      <MapLegend isExpanded={isExpanded} />
      <MapScale isExpanded={isExpanded} />

      {/* Botão fechar quando expandido */}
      {isExpanded && (
        <button 
          onClick={onToggleExpand} 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-scheduler-blue-dark text-white px-4 py-2 rounded-lg shadow-md hover:bg-scheduler-blue-medium transition-all"
        >
          Fechar
        </button>
      )}
    </div>
  );
};
