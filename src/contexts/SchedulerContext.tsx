// import React, { createContext, useContext, useState, useEffect } from "react";
// import { FacilityType, Month, Reservation, ReservationType, TimeSlot, DayOfWeek } from "../types/scheduler";
// import { getCurrentMonth, TIME_SLOT_MAP } from "../utils/date-utils";
// import { useToast } from "@/components/ui/use-toast";

// interface SchedulerContextType {
//   reservations: Reservation[];
//   selectedFacility: FacilityType | "all";
//   selectedMonth: Month;
//   selectedReservationType: ReservationType | "all";
//   selectedYear: number;
//   selectedDay: DayOfWeek | undefined;
//   setSelectedDay: (day: DayOfWeek | undefined) => void;
//   setSelectedFacility: (facility: FacilityType | "all") => void;
//   setSelectedMonth: (month: Month) => void;
//   setSelectedReservationType: (type: ReservationType | "all") => void;
//   addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>;
//   updateReservation: (id: string, reservation: Partial<Omit<Reservation, "id">>) => Promise<void>;
//   deleteReservation: (id: string) => Promise<void>;
//   filteredReservations: Reservation[];
// }

// export const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

// export const useScheduler = (): SchedulerContextType => {
//   const context = useContext(SchedulerContext);
//   if (!context) {
//     throw new Error("useScheduler must be used within a SchedulerProvider");
//   }
//   return context;
// };

// export const SchedulerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
//   const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
//   const [selectedReservationType, setSelectedReservationType] = useState<ReservationType | "all">("all");
//   const [selectedYear] = useState<number>(2025);
//   const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
//   const { toast } = useToast();

//   const fetchReservations = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/mes/${selectedYear}/${selectedMonth}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const formattedReservations: Reservation[] = data.map((item: any) => ({
//           id: item.id,
//           facility: item.place,
//           month: selectedMonth,
//           day: item.dayOfWeek,
//           timeSlot: item.timeSlot,
//           reservationType: item.reservationType,
//           comments: {
//             bookedBy: item.bookedBy,
//             eventDescription: item.eventDescription,
//             additionalDetails: item.additionalDetails || "",
//           },
//         }));
//         setReservations(formattedReservations);
//       } else {
//         console.error("Failed to fetch reservations:", response.statusText);
//         toast({
//           title: "Erro",
//           description: "Não foi possível carregar as reservas.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [selectedMonth, selectedYear]);

//   const addReservation = async (reservation: Omit<Reservation, "id">) => {
//     try {
//       const response = await fetch("http://localhost:8080/agendamento/cadastro", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${selectedMonth}-${new Date().getDate()}T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments.bookedBy,
//           eventDescription: reservation.comments.eventDescription,
//           additionalDetails: reservation.comments.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva criada",
//           description: `${reservation.facility} - ${reservation.day} ${formatTimeSlot(reservation.timeSlot)}`,
//         });
//       } else {
//         const errorText = await response.text();
//         toast({
//           title: "Erro",
//           description: errorText || "Não foi possível criar a reserva.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>) => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/edit/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${selectedMonth}-${new Date().getDate()}T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments?.bookedBy,
//           eventDescription: reservation.comments?.eventDescription,
//           additionalDetails: reservation.comments?.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva atualizada",
//           description: "Suas alterações foram salvas.",
//         });
//       } else {
//         const errorText = await response.text();
//         toast({
//           title: "Erro",
//           description: errorText || "Não foi possível atualizar a reserva.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const deleteReservation = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva deletada",
//           description: "A reserva foi removida.",
//           variant: "destructive",
//         });
//       } else {
//         const errorText = await response.text();
//         toast({
//           title: "Erro",
//           description: errorText || "Não foi possível deletar a reserva.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const formatTimeSlot = (timeSlot: TimeSlot) => {
//     return TIME_SLOT_MAP[timeSlot] || timeSlot;
//   };

//   const filteredReservations = reservations.filter((reservation) => {
//     const facilityMatch = selectedFacility === "all" || reservation.facility === selectedFacility;
//     const monthMatch = reservation.month === selectedMonth;
//     const typeMatch =
//       selectedReservationType === "all" || reservation.reservationType === selectedReservationType;
//     const dayMatch = !selectedDay || reservation.day === selectedDay;
//     return facilityMatch && monthMatch && typeMatch && dayMatch;
//   });

//   return (
//     <SchedulerContext.Provider
//       value={{
//         reservations,
//         selectedFacility,
//         selectedMonth,
//         selectedReservationType,
//         selectedYear,
//         selectedDay,
//         setSelectedDay,
//         setSelectedFacility,
//         setSelectedMonth,
//         setSelectedReservationType,
//         addReservation,
//         updateReservation,
//         deleteReservation,
//         filteredReservations,
//       }}
//     >
//       {children}
//     </SchedulerContext.Provider>
//   );
// };










// import React, { createContext, useContext, useState, useEffect } from "react";
// import { FacilityType, Month, Reservation, ReservationType, TimeSlot, DayOfWeek } from "../types/scheduler";
// import { getCurrentMonth, TIME_SLOT_MAP } from "../utils/date-utils";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/contexts/AuthContext";

// interface SchedulerContextType {
//   reservations: Reservation[];
//   selectedFacility: FacilityType | "all";
//   selectedMonth: Month;
//   selectedReservationType: ReservationType | "all";
//   selectedYear: number;
//   selectedDay: DayOfWeek | undefined;
//   setSelectedDay: (day: DayOfWeek | undefined) => void;
//   setSelectedFacility: (facility: FacilityType | "all") => void;
//   setSelectedMonth: (month: Month) => void;
//   setSelectedReservationType: (type: ReservationType | "all") => void;
//   addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>;
//   updateReservation: (id: string, reservation: Partial<Omit<Reservation, "id">>) => Promise<void>;
//   deleteReservation: (id: string) => Promise<void>;
//   filteredReservations: Reservation[];
// }

// export const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

// export const useScheduler = (): SchedulerContextType => {
//   const context = useContext(SchedulerContext);
//   if (!context) {
//     throw new Error("useScheduler must be used within a SchedulerProvider");
//   }
//   return context;
// };

// export const SchedulerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
//   const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
//   const [selectedReservationType, setSelectedReservationType] = useState<ReservationType | "all">("all");
//   const [selectedYear] = useState<number>(2025);
//   const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
//   const { toast } = useToast();
//   const { logout } = useAuth();

//   // Map month names to numbers
//   const monthMap: Record<Month, number> = {
//     January: 1,
//     February: 2,
//     March: 3,
//     April: 4,
//     May: 5,
//     June: 6,
//     July: 7,
//     August: 8,
//     September: 9,
//     October: 10,
//     November: 11,
//     December: 12,
//   };

//   const fetchReservations = async () => {
//     try {
//       const numericMonth = monthMap[selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/mes/${selectedYear}/${numericMonth}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const formattedReservations: Reservation[] = data.map((item: any) => ({
//           id: item.id,
//           facility: item.place,
//           month: selectedMonth,
//           day: item.dayOfWeek,
//           timeSlot: item.timeSlot,
//           reservationType: item.reservationType,
//           comments: {
//             bookedBy: item.bookedBy,
//             eventDescription: item.eventDescription,
//             additionalDetails: item.additionalDetails || "",
//           },
//         }));
//         setReservations(formattedReservations);
//       } else {
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           const errorText = await response.text();
//           console.error(`Failed to fetch reservations: ${response.status} ${response.statusText} - ${errorText}`);
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível carregar as reservas.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [selectedMonth, selectedYear]);

//   const addReservation = async (reservation: Omit<Reservation, "id">) => {
//     try {
//       const numericMonth = monthMap[reservation.month];
//       const response = await fetch("http://localhost:8080/agendamento/cadastro", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments.bookedBy,
//           eventDescription: reservation.comments.eventDescription,
//           additionalDetails: reservation.comments.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva criada",
//           description: `${reservation.facility} - ${reservation.day} ${formatTimeSlot(reservation.timeSlot)}`,
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível criar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error adding reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>) => {
//     try {
//       const numericMonth = monthMap[reservation.month || selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/edit/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments?.bookedBy,
//           eventDescription: reservation.comments?.eventDescription,
//           additionalDetails: reservation.comments?.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva atualizada",
//           description: "Suas alterações foram salvas.",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível atualizar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error updating reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const deleteReservation = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva deletada",
//           description: "A reserva foi removida.",
//           variant: "destructive",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível deletar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const formatTimeSlot = (timeSlot: TimeSlot) => {
//     return TIME_SLOT_MAP[timeSlot] || timeSlot;
//   };

//   const filteredReservations = reservations.filter((reservation) => {
//     const facilityMatch = selectedFacility === "all" || reservation.facility === selectedFacility;
//     const monthMatch = reservation.month === selectedMonth;
//     const typeMatch =
//       selectedReservationType === "all" || reservation.reservationType === selectedReservationType;
//     const dayMatch = !selectedDay || reservation.day === selectedDay;
//     return facilityMatch && monthMatch && typeMatch && dayMatch;
//   });

//   return (
//     <SchedulerContext.Provider
//       value={{
//         reservations,
//         selectedFacility,
//         selectedMonth,
//         selectedReservationType,
//         selectedYear,
//         selectedDay,
//         setSelectedDay,
//         setSelectedFacility,
//         setSelectedMonth,
//         setSelectedReservationType,
//         addReservation,
//         updateReservation,
//         deleteReservation,
//         filteredReservations,
//       }}
//     >
//       {children}
//     </SchedulerContext.Provider>
//   );
// };










// import React, { createContext, useContext, useState, useEffect } from "react";
// import { FacilityType, Month, Reservation, ReservationType, TimeSlot, DayOfWeek } from "../types/scheduler";
// import { getCurrentMonth, TIME_SLOT_MAP } from "../utils/date-utils";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/contexts/AuthContext";

// interface SchedulerContextType {
//   reservations: Reservation[];
//   selectedFacility: FacilityType | "all";
//   selectedMonth: Month;
//   selectedReservationType: ReservationType | "all";
//   selectedYear: number;
//   selectedDay: DayOfWeek | undefined;
//   setSelectedDay: (day: DayOfWeek | undefined) => void;
//   setSelectedFacility: (facility: FacilityType | "all") => void;
//   setSelectedMonth: (month: Month) => void;
//   setSelectedReservationType: (type: ReservationType | "all") => void;
//   addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>;
//   updateReservation: (id: string, reservation: Partial<Omit<Reservation, "id">>) => Promise<void>;
//   deleteReservation: (id: string) => Promise<void>;
//   filteredReservations: Reservation[];
// }

// export const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

// export const useScheduler = (): SchedulerContextType => {
//   const context = useContext(SchedulerContext);
//   if (!context) {
//     throw new Error("useScheduler must be used within a SchedulerProvider");
//   }
//   return context;
// };

// export const SchedulerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
//   const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
//   const [selectedReservationType, setSelectedReservationType] = useState<ReservationType | "all">("all");
//   const [selectedYear] = useState<number>(2025);
//   const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
//   const { toast } = useToast();
//   const { logout } = useAuth();

//   // Map month names to numbers
//   const monthMap: Record<Month, number> = {
//     January: 1,
//     February: 2,
//     March: 3,
//     April: 4,
//     May: 5,
//     June: 6,
//     July: 7,
//     August: 8,
//     September: 9,
//     October: 10,
//     November: 11,
//     December: 12,
//   };

//   const fetchReservations = async () => {
//     try {
//       const numericMonth = monthMap[selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/mes/${selectedYear}/${numericMonth}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 204) {
//         setReservations([]);
//         return;
//       }
//       if (response.ok) {
//         const data = await response.json();
//         const formattedReservations: Reservation[] = data.map((item: any) => ({
//           id: item.id,
//           facility: item.place,
//           month: selectedMonth,
//           day: item.dayOfWeek,
//           timeSlot: item.timeSlot,
//           reservationType: item.reservationType,
//           comments: {
//             bookedBy: item.bookedBy,
//             eventDescription: item.eventDescription,
//             additionalDetails: item.additionalDetails || "",
//           },
//         }));
//         setReservations(formattedReservations);
//       } else {
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           const errorText = await response.text();
//           console.error(`Failed to fetch reservations: ${response.status} ${response.statusText} - ${errorText}`);
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível carregar as reservas.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor. Verifique sua conexão.",
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [selectedMonth, selectedYear]);

//   const addReservation = async (reservation: Omit<Reservation, "id">) => {
//     try {
//       const numericMonth = monthMap[reservation.month];
//       const response = await fetch("http://localhost:8080/agendamento/cadastro", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments.bookedBy,
//           eventDescription: reservation.comments.eventDescription,
//           additionalDetails: reservation.comments.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva criada",
//           description: `${reservation.facility} - ${reservation.day} ${formatTimeSlot(reservation.timeSlot)}`,
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível criar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error adding reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>) => {
//     try {
//       const numericMonth = monthMap[reservation.month || selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/edit/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments?.bookedBy,
//           eventDescription: reservation.comments?.eventDescription,
//           additionalDetails: reservation.comments?.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva atualizada",
//           description: "Suas alterações foram salvas.",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível atualizar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error updating reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const deleteReservation = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva deletada",
//           description: "A reserva foi removida.",
//           variant: "destructive",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível deletar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting reservation:", error);
//       toast({
//         title: "Erro",
//         description: "Não foi possível conectar ao servidor.",
//         variant: "destructive",
//       });
//     }
//   };

//   const formatTimeSlot = (timeSlot: TimeSlot) => {
//     return TIME_SLOT_MAP[timeSlot] || timeSlot;
//   };

//   const filteredReservations = reservations.filter((reservation) => {
//     const facilityMatch = selectedFacility === "all" || reservation.facility === selectedFacility;
//     const monthMatch = reservation.month === selectedMonth;
//     const typeMatch =
//       selectedReservationType === "all" || reservation.reservationType === selectedReservationType;
//     const dayMatch = !selectedDay || reservation.day === selectedDay;
//     return facilityMatch && monthMatch && typeMatch && dayMatch;
//   });

//   return (
//     <SchedulerContext.Provider
//       value={{
//         reservations,
//         selectedFacility,
//         selectedMonth,
//         selectedReservationType,
//         selectedYear,
//         selectedDay,
//         setSelectedDay,
//         setSelectedFacility,
//         setSelectedMonth,
//         setSelectedReservationType,
//         addReservation,
//         updateReservation,
//         deleteReservation,
//         filteredReservations,
//       }}
//     >
//       {children}
//     </SchedulerContext.Provider>
//   );
// };





// import React, { createContext, useContext, useState, useEffect } from "react";
// import { FacilityType, Month, Reservation, ReservationType, TimeSlot, DayOfWeek } from "../types/scheduler";
// import { getCurrentMonth, TIME_SLOT_MAP } from "../utils/date-utils";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/contexts/AuthContext";

// interface SchedulerContextType {
//   reservations: Reservation[];
//   selectedFacility: FacilityType | "all";
//   selectedMonth: Month;
//   selectedReservationType: ReservationType | "all";
//   selectedYear: number;
//   selectedDay: DayOfWeek | undefined;
//   setSelectedDay: (day: DayOfWeek | undefined) => void;
//   setSelectedFacility: (facility: FacilityType | "all") => void;
//   setSelectedMonth: (month: Month) => void;
//   setSelectedReservationType: (type: ReservationType | "all") => void;
//   addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>;
//   updateReservation: (id: string, reservation: Partial<Omit<Reservation, "id">>) => Promise<void>;
//   deleteReservation: (id: string) => Promise<void>;
//   filteredReservations: Reservation[];
// }

// export const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

// export const useScheduler = (): SchedulerContextType => {
//   const context = useContext(SchedulerContext);
//   if (!context) {
//     throw new Error("useScheduler must be used within a SchedulerProvider");
//   }
//   return context;
// };

// export const SchedulerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [reservations, setReservations] = useState<Reservation[]>([]);
//   const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
//   const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
//   const [selectedReservationType, setSelectedReservationType] = useState<ReservationType | "all">("all");
//   const [selectedYear] = useState<number>(2025);
//   const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
//   const { toast } = useToast();
//   const { logout } = useAuth();

//   // Map month names to numbers
//   const monthMap: Record<Month, number> = {
//     January: 1,
//     February: 2,
//     March: 3,
//     April: 4,
//     May: 5,
//     June: 6,
//     July: 7,
//     August: 8,
//     September: 9,
//     October: 10,
//     November: 11,
//     December: 12,
//   };

//   const fetchReservations = async () => {
//     try {
//       const numericMonth = monthMap[selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/mes/${selectedYear}/${numericMonth}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 204) {
//         setReservations([]);
//         return;
//       }
//       if (response.ok) {
//         const data = await response.json();
//         const formattedReservations: Reservation[] = data.map((item: any) => ({
//           id: item.id,
//           facility: item.place,
//           month: selectedMonth,
//           day: item.dayOfWeek,
//           timeSlot: item.timeSlot,
//           reservationType: item.reservationType,
//           comments: {
//             bookedBy: item.bookedBy,
//             eventDescription: item.eventDescription,
//             additionalDetails: item.additionalDetails || "",
//           },
//         }));
//         setReservations(formattedReservations);
//       } else {
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           const errorText = await response.text();
//           console.error(`Failed to fetch reservations: ${response.status} ${response.statusText} - ${errorText}`);
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível carregar as reservas.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       let errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
//       if (error.message.includes("NetworkError")) {
//         errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
//       }
//       toast({
//         title: "Erro",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [selectedMonth, selectedYear]);

//   const addReservation = async (reservation: Omit<Reservation, "id">) => {
//     try {
//       const numericMonth = monthMap[reservation.month];
//       const response = await fetch("http://localhost:8080/agendamento/cadastro", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments.bookedBy,
//           eventDescription: reservation.comments.eventDescription,
//           additionalDetails: reservation.comments.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva criada",
//           description: `${reservation.facility} - ${reservation.day} ${formatTimeSlot(reservation.timeSlot)}`,
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível criar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error adding reservation:", error);
//       let errorMessage = "Não foi possível conectar ao servidor.";
//       if (error.message.includes("NetworkError")) {
//         errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
//       }
//       toast({
//         title: "Erro",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }
//   };

//   const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>) => {
//     try {
//       const numericMonth = monthMap[reservation.month || selectedMonth];
//       const response = await fetch(`http://localhost:8080/agendamento/edit/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           place: reservation.facility,
//           dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${reservation.timeSlot}:00`,
//           dayOfWeek: reservation.day,
//           timeSlot: reservation.timeSlot,
//           reservationType: reservation.reservationType,
//           bookedBy: reservation.comments?.bookedBy,
//           eventDescription: reservation.comments?.eventDescription,
//           additionalDetails: reservation.comments?.additionalDetails,
//         }),
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva atualizada",
//           description: "Suas alterações foram salvas.",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível atualizar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error updating reservation:", error);
//       let errorMessage = "Não foi possível conectar ao servidor.";
//       if (error.message.includes("NetworkError")) {
//         errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
//       }
//       toast({
//         title: "Erro",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }
//   };

//   const deleteReservation = async (id: string) => {
//     try {
//       const response = await fetch(`http://localhost:8080/agendamento/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (response.ok) {
//         await fetchReservations();
//         toast({
//           title: "Reserva deletada",
//           description: "A reserva foi removida.",
//           variant: "destructive",
//         });
//       } else {
//         const errorText = await response.text();
//         if (response.status === 401) {
//           toast({
//             title: "Sessão Expirada",
//             description: "Por favor, faça login novamente.",
//             variant: "destructive",
//           });
//           logout();
//         } else {
//           toast({
//             title: "Erro",
//             description: errorText || "Não foi possível deletar a reserva.",
//             variant: "destructive",
//           });
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting reservation:", error);
//       let errorMessage = "Não foi possível conectar ao servidor.";
//       if (error.message.includes("NetworkError")) {
//         errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
//       }
//       toast({
//         title: "Erro",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     }
//   };

//   const formatTimeSlot = (timeSlot: TimeSlot) => {
//     return TIME_SLOT_MAP[timeSlot] || timeSlot;
//   };

//   const filteredReservations = reservations.filter((reservation) => {
//     const facilityMatch = selectedFacility === "all" || reservation.facility === selectedFacility;
//     const monthMatch = reservation.month === selectedMonth;
//     const typeMatch =
//       selectedReservationType === "all" || reservation.reservationType === selectedReservationType;
//     const dayMatch = !selectedDay || reservation.day === selectedDay;
//     return facilityMatch && monthMatch && typeMatch && dayMatch;
//   });

//   return (
//     <SchedulerContext.Provider
//       value={{
//         reservations,
//         selectedFacility,
//         selectedMonth,
//         selectedReservationType,
//         selectedYear,
//         selectedDay,
//         setSelectedDay,
//         setSelectedFacility,
//         setSelectedMonth,
//         setSelectedReservationType,
//         addReservation,
//         updateReservation,
//         deleteReservation,
//         filteredReservations,
//       }}
//     >
//       {children}
//     </SchedulerContext.Provider>
//   );
// };





import React, { createContext, useContext, useState, useEffect } from "react";
import { FacilityType, Month, Reservation, ReservationType, TimeSlot, DayOfWeek } from "../types/scheduler";
import { getCurrentMonth, TIME_SLOT_MAP } from "../utils/date-utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface SchedulerContextType {
  reservations: Reservation[];
  selectedFacility: FacilityType | "all";
  selectedMonth: Month;
  selectedReservationType: ReservationType | "all";
  selectedYear: number;
  selectedDay: DayOfWeek | undefined;
  setSelectedDay: (day: DayOfWeek | undefined) => void;
  setSelectedFacility: (facility: FacilityType | "all") => void;
  setSelectedMonth: (month: Month) => void;
  setSelectedReservationType: (type: ReservationType | "all") => void;
  addReservation: (reservation: Omit<Reservation, "id">) => Promise<void>;
  updateReservation: (id: string, reservation: Partial<Omit<Reservation, "id">>) => Promise<void>;
  deleteReservation: (id: string) => Promise<void>;
  filteredReservations: Reservation[];
}

export const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

export const useScheduler = (): SchedulerContextType => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error("useScheduler must be used within a SchedulerProvider");
  }
  return context;
};

export const SchedulerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<FacilityType | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<Month>(getCurrentMonth());
  const [selectedReservationType, setSelectedReservationType] = useState<ReservationType | "all">("all");
  const [selectedYear] = useState<number>(2025);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | undefined>(undefined);
  const { toast } = useToast();
  const { logout } = useAuth();

  // Map month names to numbers
  const monthMap: Record<Month, number> = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };

  // Função para converter timeSlot para formato de hora válido
  const convertTimeSlotToTime = (timeSlot: TimeSlot): string => {
    // Mapeamento dos timeSlots para horários específicos
    const timeSlotHourMap: Record<string, string> = {
      'A-M': '08:00:00',     // Manhã
      'A-T': '14:00:00',     // Tarde
      'A-N': '19:00:00',     // Noite
      'M-M': '09:00:00',     // Manhã
      'M-T': '15:00:00',     // Tarde
      'M-N': '20:00:00',     // Noite
      // Adicione outros mapeamentos conforme necessário
    };

    // Se o timeSlot já está no formato HH:mm:ss, retorna como está
    if (timeSlot.match(/^\d{2}:\d{2}:\d{2}$/)) {
      return timeSlot;
    }

    // Se o timeSlot já está no formato HH:mm, adiciona os segundos
    if (timeSlot.match(/^\d{2}:\d{2}$/)) {
      return `${timeSlot}:00`;
    }

    // Usa o mapeamento ou um valor padrão
    return timeSlotHourMap[timeSlot] || '12:00:00';
  };

  const fetchReservations = async () => {
    try {
      const numericMonth = monthMap[selectedMonth];
      const response = await fetch(`/agendamento/mes/${selectedYear}/${numericMonth}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setReservations([]);
        return;
      }

      // Primeiro, lemos a resposta como texto para evitar o erro de parse
      const responseText = await response.text();

      if (response.ok) {
        try {
          // Agora, tentamos fazer o parse do texto
          const data = JSON.parse(responseText);
          const formattedReservations: Reservation[] = data.map((item: any) => ({
            id: item.id,
            facility: item.place,
            month: selectedMonth,
            day: item.dayOfWeek,
            timeSlot: item.timeSlot,
            reservationType: item.reservationType,
            comments: {
              bookedBy: item.bookedBy,
              eventDescription: item.eventDescription,
              additionalDetails: item.additionalDetails || "",
            },
          }));
          setReservations(formattedReservations);
        } catch (jsonError) {
          // Se o parse falhar, o corpo não era JSON.
          console.error("Failed to parse JSON:", responseText); // Loga a resposta real do servidor
          toast({
            title: "Erro de Resposta",
            description: "O servidor enviou uma resposta em formato inesperado.",
            variant: "destructive",
          });
        }
      } else {
        if (response.status === 401) {
          toast({
            title: "Sessão Expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          logout();
        } else {
          console.error(`Failed to fetch reservations: ${response.status} ${response.statusText} - ${responseText}`);
          toast({
            title: "Erro",
            description: responseText || "Não foi possível carregar as reservas.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
      let errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      if (error instanceof Error && error.message.includes("NetworkError")) {
          errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
      }
      toast({
        title: "Erro de Conexão",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [selectedMonth, selectedYear]);

  const addReservation = async (reservation: Omit<Reservation, "id">) => {
    try {
      const numericMonth = monthMap[reservation.month];
      const formattedTime = convertTimeSlotToTime(reservation.timeSlot);

      // Debug log para verificar o que está sendo enviado
      console.log("Sending dateTime:", `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${formattedTime}`);

      const response = await fetch("/agendamento/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          place: reservation.facility,
          dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${formattedTime}`,
          dayOfWeek: reservation.day,
          timeSlot: reservation.timeSlot,
          reservationType: reservation.reservationType,
          bookedBy: reservation.comments.bookedBy,
          eventDescription: reservation.comments.eventDescription,
          additionalDetails: reservation.comments.additionalDetails,
        }),
      });

      if (response.ok) {
        await fetchReservations();
        toast({
          title: "Reserva criada",
          description: `${reservation.facility} - ${reservation.day} ${formatTimeSlot(reservation.timeSlot)}`,
        });
      } else {
        const errorText = await response.text();
        console.error("Server response:", errorText); // Debug log
        if (response.status === 401) {
          toast({
            title: "Sessão Expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          logout();
        } else {
          toast({
            title: "Erro",
            description: errorText || "Não foi possível criar a reserva.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
      let errorMessage = "Não foi possível conectar ao servidor.";
      if (error instanceof Error && error.message.includes("NetworkError")) {
        errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
      }
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const updateReservation = async (id: string, reservation: Partial<Omit<Reservation, "id">>) => {
    try {
      const numericMonth = monthMap[reservation.month || selectedMonth];
      const formattedTime = reservation.timeSlot ? convertTimeSlotToTime(reservation.timeSlot) : '12:00:00';

      const response = await fetch(`/agendamento/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          place: reservation.facility,
          dateTime: `${selectedYear}-${numericMonth.toString().padStart(2, "0")}-01T${formattedTime}`,
          dayOfWeek: reservation.day,
          timeSlot: reservation.timeSlot,
          reservationType: reservation.reservationType,
          bookedBy: reservation.comments?.bookedBy,
          eventDescription: reservation.comments?.eventDescription,
          additionalDetails: reservation.comments?.additionalDetails,
        }),
      });

      if (response.ok) {
        await fetchReservations();
        toast({
          title: "Reserva atualizada",
          description: "Suas alterações foram salvas.",
        });
      } else {
        const errorText = await response.text();
        if (response.status === 401) {
          toast({
            title: "Sessão Expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          logout();
        } else {
          toast({
            title: "Erro",
            description: errorText || "Não foi possível atualizar a reserva.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
      let errorMessage = "Não foi possível conectar ao servidor.";
      if (error instanceof Error && error.message.includes("NetworkError")) {
        errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
      }
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const deleteReservation = async (id: string) => {
    try {
      const response = await fetch(`/agendamento/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        await fetchReservations();
        toast({
          title: "Reserva deletada",
          description: "A reserva foi removida.",
          variant: "destructive",
        });
      } else {
        const errorText = await response.text();
        if (response.status === 401) {
          toast({
            title: "Sessão Expirada",
            description: "Por favor, faça login novamente.",
            variant: "destructive",
          });
          logout();
        } else {
          toast({
            title: "Erro",
            description: errorText || "Não foi possível deletar a reserva.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
      let errorMessage = "Não foi possível conectar ao servidor.";
      if (error instanceof Error && error.message.includes("NetworkError")) {
        errorMessage = "Erro de CORS ou conexão. Verifique as configurações do servidor ou sua rede.";
      }
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const formatTimeSlot = (timeSlot: TimeSlot) => {
    return TIME_SLOT_MAP[timeSlot] || timeSlot;
  };

  const filteredReservations = reservations.filter((reservation) => {
    const facilityMatch = selectedFacility === "all" || reservation.facility === selectedFacility;
    const monthMatch = reservation.month === selectedMonth;
    const typeMatch =
      selectedReservationType === "all" || reservation.reservationType === selectedReservationType;
    const dayMatch = !selectedDay || reservation.day === selectedDay;
    return facilityMatch && monthMatch && typeMatch && dayMatch;
  });

  return (
    <SchedulerContext.Provider
      value={{
        reservations,
        selectedFacility,
        selectedMonth,
        selectedReservationType,
        selectedYear,
        selectedDay,
        setSelectedDay,
        setSelectedFacility,
        setSelectedMonth,
        setSelectedReservationType,
        addReservation,
        updateReservation,
        deleteReservation,
        filteredReservations,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
};
