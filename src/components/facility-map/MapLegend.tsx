
import React from "react";

interface MapLegendProps {
  isExpanded: boolean;
}

export const MapLegend: React.FC<MapLegendProps> = ({ isExpanded }) => {
  return (
    <div className={`absolute bottom-1 right-2 ${isExpanded ? 'text-xs' : 'text-[8px]'} flex gap-2 items-center bg-white/80 px-1.5 py-0.5 rounded-sm border border-gray-100 shadow-sm`}>
      <span className="flex items-center">
        <div className={`${isExpanded ? 'h-3 w-3' : 'h-2 w-2'} bg-green-100 border border-green-500 rounded-sm mr-0.5`}></div>
        Livre
      </span>
      <span className="flex items-center">
        <div className={`${isExpanded ? 'h-3 w-3' : 'h-2 w-2'} bg-yellow-50 border border-yellow-400 rounded-sm mr-0.5`}></div>
        Parcial
      </span>
      <span className="flex items-center">
        <div className={`${isExpanded ? 'h-3 w-3' : 'h-2 w-2'} bg-red-50 border border-red-500 rounded-sm mr-0.5`}></div>
        Ocupado
      </span>
    </div>
  );
};
