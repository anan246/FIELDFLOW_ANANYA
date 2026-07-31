import {
  CalendarCheck,
  Clock3,
  CircleCheckBig,
  TriangleAlert,
  Zap,
  Wrench,
  Snowflake,
  Paintbrush,
  Hammer,
  Sparkles,
} from "lucide-react";

export const customerDashboardData = {

  user: {
    name: "Madhushri",
  },

  stats: [
    {
      title: "Total Bookings",
      value: 24,
      icon: CalendarCheck,
    },
    {
      title: "Active Services",
      value: 3,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: 19,
      icon: CircleCheckBig,
    },
    {
      title: "Emergency",
      value: 2,
      icon: TriangleAlert,
    },
  ],

  upcomingBooking: {
    service: "AC Repair",
    status: "Assigned",
    date: "30 July 2026",
    time: "10:30 AM",
    technician: "Rahul Sharma",
    location: "JP Nagar, Bengaluru",
  },

  services: [
    {
      name: "Electrician",
      icon: Zap,
    },
    {
      name: "Plumber",
      icon: Wrench,
    },
    {
      name: "AC Repair",
      icon: Snowflake,
    },
    {
      name: "Painting",
      icon: Paintbrush,
    },
    {
      name: "Carpenter",
      icon: Hammer,
    },
    {
      name: "Cleaning",
      icon: Sparkles,
    },
  ],

  bookings: [
    {
      id: "#BK1023",
      service: "AC Repair",
      date: "28 Jul 2026",
      status: "Completed",
    },
    {
      id: "#BK1024",
      service: "Electrician",
      date: "29 Jul 2026",
      status: "On the Way",
    },
    {
      id: "#BK1025",
      service: "Plumbing",
      date: "30 Jul 2026",
      status: "Pending",
    },
  ],

  notifications: [
    {
      title: "Technician Assigned",
      message: "Rahul Sharma has been assigned to your booking.",
      time: "10 mins ago",
    },
    {
      title: "Booking Confirmed",
      message: "Your plumbing service has been confirmed.",
      time: "2 hours ago",
    },
    {
      title: "Service Completed",
      message: "Your electrician service has been completed.",
      time: "Yesterday",
    },
  ],

};