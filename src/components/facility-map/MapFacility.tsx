
import React from "react";
import { Reservation } from "@/types/scheduler";
import { getFacilityColor, getFacilityStatus } from "@/utils/facility-utils";

interface MapFacilityProps {
  name: string;
  position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
  reservations: Reservation[];
  isExpanded: boolean;
}

export const MapFacility: React.FC<MapFacilityProps> = ({ 
  name, 
  position, 
  reservations, 
  isExpanded 
}) => {
  const isCenter = position === "center";
  
  // Determine sizes based on expansion state and position
  const sizeClasses = isCenter 
    ? (isExpanded ? "w-24 h-24" : "w-14 h-14") 
    : (isExpanded ? "w-20 h-16" : "w-12 h-10");
  
  const textSizeClasses = isCenter
    ? (isExpanded ? "text-sm" : "text-[9px]") 
    : (isExpanded ? "text-xs" : "text-[8px]");
  
  const statusTextSizeClasses = isCenter
    ? (isExpanded ? "text-xs" : "text-[7px]") 
    : (isExpanded ? "text-[10px]" : "text-[6px]");
  
  // Determine position classes
  let positionClasses = "";
  switch (position) {
    case "topLeft":
      positionClasses = "top-0 left-0";
      break;
    case "topRight":
      positionClasses = "top-0 right-0";
      break;
    case "bottomLeft":
      positionClasses = "bottom-0 left-0";
      break;
    case "bottomRight":
      positionClasses = "bottom-0 right-0";
      break;
    case "center":
      positionClasses = "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
      break;
  }
  
  const shapeClasses = isCenter ? "rounded-full" : "rounded-sm";
  
  return (
    <div 
      className={`absolute ${positionClasses} ${getFacilityColor(name, reservations)} ${sizeClasses} border-2 flex flex-col items-center justify-center text-gray-700 ${shapeClasses}`}
      title={`${name}: ${reservations.filter(res => res.facility === name).length} reservas`}
    >
      <span className={`font-semibold ${textSizeClasses}`}>{name}</span>
      <span className={statusTextSizeClasses}>{getFacilityStatus(name, reservations)}</span>
    </div>
  );
};
