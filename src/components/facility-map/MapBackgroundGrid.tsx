
import React from "react";

export const MapBackgroundGrid: React.FC = () => {
  return (
    <>
      {/* Grid de fundo estilo planta arquitetônica - mais detalhado */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border border-gray-100"></div>
        ))}
      </div>
      
      {/* Linhas de medição e cotas */}
      <div className="absolute left-0 right-0 top-0 h-[1px] border-t border-dashed border-gray-300"></div>
      <div className="absolute left-0 right-0 bottom-0 h-[1px] border-t border-dashed border-gray-300"></div>
      <div className="absolute top-0 bottom-0 left-0 w-[1px] border-l border-dashed border-gray-300"></div>
      <div className="absolute top-0 bottom-0 right-0 w-[1px] border-l border-dashed border-gray-300"></div>
      
      {/* Linhas diagonais de medição nos cantos */}
      <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-dashed border-gray-300"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-dashed border-gray-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-t border-r border-dashed border-gray-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-t border-l border-dashed border-gray-300"></div>
      
      {/* Elementos adicionais de estilo arquitetônico */}
      <div className="absolute top-[45%] left-[20%] w-[1px] h-[10%] border-l border-dashed border-gray-300"></div>
      <div className="absolute top-[45%] right-[20%] w-[1px] h-[10%] border-l border-dashed border-gray-300"></div>
      <div className="absolute bottom-[45%] left-[20%] w-[1px] h-[10%] border-l border-dashed border-gray-300"></div>
      <div className="absolute bottom-[45%] right-[20%] w-[1px] h-[10%] border-l border-dashed border-gray-300"></div>
      
      {/* Círculos decorativos ao redor da arena */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-dashed border-gray-300"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-dotted border-gray-200"></div>
    </>
  );
};
