
import React from "react";

interface MapScaleProps {
  isExpanded: boolean;
}

export const MapScale: React.FC<MapScaleProps> = ({ isExpanded }) => {
  return (
    <div className={`absolute bottom-1 left-2 ${isExpanded ? 'text-[8px]' : 'text-[6px]'} text-gray-500 font-mono flex items-center`}>
      ESCALA 1:100
      <div className={`ml-1 ${isExpanded ? 'w-8 h-[4px]' : 'w-5 h-[3px]'} bg-gray-400 flex`}>
        <div className="w-1/2 h-full bg-gray-600"></div>
      </div>
    </div>
  );
};
