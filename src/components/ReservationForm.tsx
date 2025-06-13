import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { MONTHS, TIME_SLOTS, formatTimeSlot } from "@/utils/date-utils";
import { FacilityType } from "@/types/scheduler";
import { monthTranslations } from "@/utils/translations";

const ReservationForm: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  
  const facilities: FacilityType[] = ["Quadra A", "Quadra B", "Quadra C", "Ginásio", "Arena"];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="place">Local</Label>
          <Controller
            name="place"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                {/* << CORREÇÃO: Adicionado id para conectar com o Label */}
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione o Local" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility} value={facility}>
                      {facility}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.place && <p className="text-red-500 text-sm">{errors.place.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="month">Mês</Label>
          <Controller
            name="month"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                {/* << CORREÇÃO: Adicionado id para conectar com o Label */}
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione o Mês" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month} value={month}>
                      {monthTranslations[month]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.month && <p className="text-red-500 text-sm">{errors.month.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dayOfMonth">Dia do Mês</Label>
          <Controller
            name="dayOfMonth"
            control={control}
            render={({ field }) => (
              <Input 
                {...field}
                id={field.name} // << CORREÇÃO: Adicionado id para conectar com o Label
                type="number"
                placeholder="Ex: 15"
                min="1"
                max="31"
              />
            )}
          />
          {errors.dayOfMonth && <p className="text-red-500 text-sm">{errors.dayOfMonth.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeSlot">Horário</Label>
          <Controller
            name="timeSlot"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                {/* << CORREÇÃO: Adicionado id para conectar com o Label */}
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione o Horário" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot} ({formatTimeSlot(slot)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.timeSlot && <p className="text-red-500 text-sm">{errors.timeSlot.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="reservationType">Tipo de Reserva</Label>
          <Controller
            name="reservationType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                {/* << CORREÇÃO: Adicionado id para conectar com o Label */}
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Selecione o Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixo</SelectItem>
                  <SelectItem value="mobile">Móvel</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.reservationType && <p className="text-red-500 text-sm">{errors.reservationType.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsible">Responsável</Label>
          <Controller
            name="responsible"
            control={control}
            render={({ field }) => (
              <Input 
                {...field} 
                id={field.name} // << CORREÇÃO: Adicionado id para conectar com o Label
                placeholder="Nome da pessoa responsável" 
              />
            )}
          />
          {errors.responsible && <p className="text-red-500 text-sm">{errors.responsible.message as string}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição do Evento</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input 
              {...field} 
              id={field.name} // << CORREÇÃO: Adicionado id para conectar com o Label
              placeholder="Breve descrição do evento" 
            />
          )}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}
      </div>
    </div>
  );
};

export default ReservationForm;