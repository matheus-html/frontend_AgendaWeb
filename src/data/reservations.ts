
import { Reservation } from "../types/scheduler";

export const mockReservations: Reservation[] = [
  {
    id: "1",
    facility: "Quadra C",
    month: "May",
    day: "Monday",
    timeSlot: "A-M",
    reservationType: "fixed",
    comments: {
      bookedBy: "Sabina",
      eventDescription: "Graduation Ceremony",
      additionalDetails: "Setup required 1 hour before event"
    }
  },
  {
    id: "2",
    facility: "Ginásio",
    month: "May",
    day: "Tuesday",
    timeSlot: "B-M",
    reservationType: "fixed",
    comments: {
      bookedBy: "Marco",
      eventDescription: "Semester Basketball Practice",
      additionalDetails: "Team Jaguars"
    }
  },
  {
    id: "3",
    facility: "Arena",
    month: "May",
    day: "Wednesday",
    timeSlot: "C-M",
    reservationType: "mobile",
    comments: {
      bookedBy: "Lisa",
      eventDescription: "Student Tournament",
      additionalDetails: "One-time event"
    }
  },
  {
    id: "4",
    facility: "Quadra A",
    month: "May",
    day: "Thursday",
    timeSlot: "D-M",
    reservationType: "mobile",
    comments: {
      bookedBy: "Carlos",
      eventDescription: "Faculty Game",
      additionalDetails: "Contact: carlos@email.com"
    }
  },
  {
    id: "5",
    facility: "Quadra B",
    month: "May",
    day: "Friday",
    timeSlot: "F-M",
    reservationType: "fixed",
    comments: {
      bookedBy: "Department of Athletics",
      eventDescription: "Regular Training",
      additionalDetails: "Every Friday this semester"
    }
  },
  {
    id: "6",
    facility: "Quadra C",
    month: "May",
    day: "Tuesday",
    timeSlot: "A-T",
    reservationType: "mobile",
    comments: {
      bookedBy: "Student Association",
      eventDescription: "Charity Tournament",
      additionalDetails: "Registration desk required"
    }
  },
  {
    id: "7",
    facility: "Arena",
    month: "May",
    day: "Monday",
    timeSlot: "D-T",
    reservationType: "fixed",
    comments: {
      bookedBy: "Sports Department",
      eventDescription: "Hockey Practice",
      additionalDetails: "Ice maintenance needed before session"
    }
  },
  {
    id: "8",
    facility: "Ginásio",
    month: "May",
    day: "Wednesday",
    timeSlot: "F-T",
    reservationType: "mobile",
    comments: {
      bookedBy: "Alumni Association",
      eventDescription: "Fundraiser Event",
      additionalDetails: "VIP section required"
    }
  },
  {
    id: "9",
    facility: "Quadra A",
    month: "May",
    day: "Saturday",
    timeSlot: "B-N",
    reservationType: "mobile",
    comments: {
      bookedBy: "External Organization",
      eventDescription: "Community Tournament",
      additionalDetails: "Contact: community@org.com"
    }
  },
  {
    id: "10",
    facility: "Quadra B",
    month: "May",
    day: "Sunday",
    timeSlot: "A-N",
    reservationType: "mobile",
    comments: {
      bookedBy: "Youth Association",
      eventDescription: "Kids Sports Day",
      additionalDetails: "Special equipment required"
    }
  }
];
