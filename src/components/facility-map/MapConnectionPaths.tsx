
import React from "react";

export const MapConnectionPaths: React.FC = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      {/* Caminho Arena para Quadra A */}
      <path 
        d={`M ${12/2},${10/2} L ${14/2},${14/2}`} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="3,3"
        fill="none"
      />
      
      {/* Caminho Arena para Quadra B */}
      <path 
        d={`M ${100-12/2},${10/2} L ${100-14/2},${14/2}`} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="3,3"
        fill="none"
      />
      
      {/* Caminho Arena para Quadra C */}
      <path 
        d={`M ${12/2},${100-10/2} L ${14/2},${100-14/2}`} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="3,3"
        fill="none"
      />
      
      {/* Caminho Arena para Ginásio */}
      <path 
        d={`M ${100-12/2},${100-10/2} L ${100-14/2},${100-14/2}`} 
        stroke="#e5e7eb" 
        strokeWidth="1" 
        strokeDasharray="3,3"
        fill="none"
      />
    </svg>
  );
};
