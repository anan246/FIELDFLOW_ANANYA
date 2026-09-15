// Central real-time data sync manager & event bus for FieldFlow
// Synchronizes data across Admin, Dispatcher, Technician, and Customer roles in real-time

const BROADCAST_CHANNEL_NAME = "fieldflow_realtime_channel";

// Helper to get BroadcastChannel safely in browser environments
function getChannel() {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    try {
      return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch (_) {
      return null;
    }
  }
  return null;
}

// Initial realistic seed data if localStorage is empty
const INITIAL_CUSTOMERS = [
  { id: 1, name: "Kripa", email: "kripa@example.com", phone: "9876543210", address: "MG Road, Bengaluru", role: "customer" },
  { id: 2, name: "Ananya L S", email: "ananya@example.com", phone: "9876543211", address: "Indiranagar, Bengaluru", role: "customer" },
  { id: 3, name: "Priya Sharma", email: "priya@example.com", phone: "9876543212", address: "Koramangala, Bengaluru", role: "customer" },
  { id: 4, name: "Rahul Sharma", email: "rahul@example.com", phone: "9876543213", address: "HSR Layout, Bengaluru", role: "customer" },
];

const INITIAL_TECHNICIANS = [
  { id: 101, name: "Ravi Kumar", phone: "9123456780", specialization: "AC Servicing", category: "AC Servicing", working_area: "Koramangala, Bengaluru", status: "Available", available_today: true },
  { id: 102, name: "Nanda", phone: "9123456781", specialization: "Electrician", category: "Electrician", working_area: "Indiranagar, Bengaluru", status: "Available", available_today: true },
  { id: 103, name: "Suresh Nair", phone: "9123456782", specialization: "Plumbing", category: "Plumbing", working_area: "HSR Layout, Bengaluru", status: "Available", available_today: true },
  { id: 104, name: "Vikram Singh", phone: "9123456783", specialization: "Home Repair", category: "Home Repair", working_area: "Whitefield, Bengaluru", status: "Available", available_today: true },
];

const INITIAL_BOOKINGS = [
  {
    id: 1043,
    bookingId: 1043,
    customer_name: "Kripa",
    customer: "Kripa",
    phone: "9876543210",
    service_name: "Home Repair",
    service: "Home Repair",
    category: "General Maintenance",
    price: 499,
    address: "MG Road, Bengaluru",
    location: "MG Road, Bengaluru",
    booking_date: "2026-08-10",
    date: "2026-08-10",
    booking_time: "10:30 AM",
    time: "10:30 AM",
    status: "Pending",
    technician_name: "Not Assigned",
    technician: "Not Assigned",
  },
  {
    id: 1042,
    bookingId: 1042,
    customer_name: "Rahul Sharma",
    customer: "Rahul Sharma",
    phone: "9876543213",
    service_name: "Electrician",
    service: "Electrician",
    category: "Electrical",
    price: 699,
    address: "HSR Layout, Bengaluru",
    location: "HSR Layout, Bengaluru",
    booking_date: "2026-08-10",
    date: "2026-08-10",
    booking_time: "11:00 AM",
    time: "11:00 AM",
    status: "Assigned",
    technician_name: "Nanda",
    technician: "Nanda",
    technician_id: 102,
  },
];

// Read from localStorage with fallback
export function getStoredData(key, fallback = []) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (_) {
    return fallback;
  }
}

// Write to localStorage safely
export function setStoredData(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("setStoredData error:", err);
  }
}

// Dispatch event across tabs & windows
export function notifyRealtimeSync(eventType, payload = {}) {
  if (typeof window === "undefined") return;

  // 1. Dispatch custom Window event for current tab
  const customEvent = new CustomEvent("fieldflow_realtime_event", {
    detail: { type: eventType, payload, timestamp: Date.now() },
  });
  window.dispatchEvent(customEvent);

  // Legacy window events for backward compatibility
  window.dispatchEvent(new CustomEvent(eventType, { detail: payload }));
  window.dispatchEvent(new Event("storage"));

  // 2. Dispatch via BroadcastChannel for multi-tab sync
  const channel = getChannel();
  if (channel) {
    try {
      channel.postMessage({ type: eventType, payload, timestamp: Date.now() });
      channel.close();
    } catch (_) {}
  }
}

// Listen to real-time events
export function subscribeRealtimeEvents(callback) {
  if (typeof window === "undefined") return () => {};

  const handleCustomEvent = (e) => {
    if (e.detail) {
      callback(e.detail.type, e.detail.payload);
    }
  };

  window.addEventListener("fieldflow_realtime_event", handleCustomEvent);
  window.addEventListener("storage", () => callback("storage_change", {}));

  let channel = getChannel();
  if (channel) {
    channel.onmessage = (event) => {
      if (event.data && event.data.type) {
        callback(event.data.type, event.data.payload);
      }
    };
  }

  return () => {
    window.removeEventListener("fieldflow_realtime_event", handleCustomEvent);
    if (channel) {
      try {
        channel.close();
      } catch (_) {}
    }
  };
}

// Initialize seed data if not present
export function initRealtimeData() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("allRegisteredCustomers")) {
    setStoredData("allRegisteredCustomers", INITIAL_CUSTOMERS);
  }
  if (!localStorage.getItem("allRegisteredTechnicians")) {
    setStoredData("allRegisteredTechnicians", INITIAL_TECHNICIANS);
  }
  if (!localStorage.getItem("customer_bookings")) {
    setStoredData("customer_bookings", INITIAL_BOOKINGS);
  }
}

// Global Search Query Management
let currentGlobalSearchQueries = {
  admin: "",
  dispatcher: "",
  technician: "",
  customer: "",
  global: "",
};

export function setGlobalSearchQuery(query, role = "global") {
  currentGlobalSearchQueries[role] = query;
  if (role === "global") {
    currentGlobalSearchQueries.admin = query;
    currentGlobalSearchQueries.dispatcher = query;
    currentGlobalSearchQueries.technician = query;
    currentGlobalSearchQueries.customer = query;
  }
  notifyRealtimeSync("fieldflow_search_update", { query, role });
}

export function getGlobalSearchQuery(role = "global") {
  return currentGlobalSearchQueries[role] || currentGlobalSearchQueries.global || "";
}

// Customer: Create a new booking
export function createNewBooking(bookingData) {
  initRealtimeData();
  const existingBookings = getStoredData("customer_bookings", INITIAL_BOOKINGS);

  const newBookingId = bookingData.id || bookingData.bookingId || Math.floor(Math.random() * 8000) + 1000;
  const newBooking = {
    id: newBookingId,
    bookingId: newBookingId,
    customer_name: bookingData.customer_name || bookingData.customerName || bookingData.customer || "Customer",
    customer: bookingData.customer_name || bookingData.customerName || bookingData.customer || "Customer",
    phone: bookingData.phone || "9876543210",
    service_name: bookingData.service_name || bookingData.service || "Home Service",
    service: bookingData.service_name || bookingData.service || "Home Service",
    category: bookingData.category || "Service Request",
    price: bookingData.price || 499,
    address: bookingData.address || bookingData.location || "Bengaluru",
    location: bookingData.address || bookingData.location || "Bengaluru",
    booking_date: bookingData.booking_date || bookingData.date || new Date().toISOString().slice(0, 10),
    date: bookingData.booking_date || bookingData.date || "Today",
    booking_time: bookingData.booking_time || bookingData.time || "10:30 AM",
    time: bookingData.booking_time || bookingData.time || "10:30 AM",
    status: bookingData.status || "Pending",
    technician_name: bookingData.technician_name || bookingData.technician || "Not Assigned",
    technician: bookingData.technician_name || bookingData.technician || "Not Assigned",
    created_at: new Date().toISOString(),
  };

  const updatedList = [newBooking, ...existingBookings];
  setStoredData("customer_bookings", updatedList);
  setStoredData("fieldflow_current_booking", newBooking);
  setStoredData("fieldflow_bookings", updatedList);

  notifyRealtimeSync("fieldflow_booking_created", newBooking);
  return newBooking;
}

// Dispatcher: Assign technician to a booking
export function assignTechnicianToBooking(bookingId, techId, techName, assignedBy = "Dispatcher") {
  initRealtimeData();

  // 1. Update customer bookings
  const bookings = getStoredData("customer_bookings", INITIAL_BOOKINGS);
  let assignedItem = null;

  const updatedBookings = bookings.map((b) => {
    if (String(b.id || b.bookingId) === String(bookingId)) {
      assignedItem = {
        ...b,
        status: "Assigned",
        technician: techName,
        technician_name: techName,
        technician_id: techId,
        assigned_by: assignedBy,
        assigned_at: new Date().toISOString(),
      };
      return assignedItem;
    }
    return b;
  });

  if (!assignedItem) {
    assignedItem = {
      id: bookingId,
      bookingId: bookingId,
      customer_name: "Customer",
      customer: "Customer",
      service_name: "Service Request",
      service: "Service Request",
      address: "Bengaluru",
      location: "Bengaluru",
      phone: "9876543210",
      status: "Assigned",
      technician: techName,
      technician_name: techName,
      technician_id: techId,
      assigned_by: assignedBy,
      assigned_at: new Date().toISOString(),
    };
    updatedBookings.unshift(assignedItem);
  }

  setStoredData("customer_bookings", updatedBookings);

  // 2. Update assigned_jobs list
  const assignedJobs = getStoredData("assigned_jobs", []);
  const existingJobIdx = assignedJobs.findIndex((j) => String(j.bookingId || j.id) === String(bookingId));

  const jobRecord = {
    id: bookingId,
    bookingId: bookingId,
    customerName: assignedItem.customer_name || assignedItem.customer || "Customer",
    customer: assignedItem.customer_name || assignedItem.customer || "Customer",
    customerPhone: assignedItem.phone || "9876543210",
    phone: assignedItem.phone || "9876543210",
    serviceName: assignedItem.service_name || assignedItem.service || "Service Request",
    service: assignedItem.service_name || assignedItem.service || "Service Request",
    location: assignedItem.address || assignedItem.location || "Bengaluru",
    address: assignedItem.address || assignedItem.location || "Bengaluru",
    time: assignedItem.booking_time || assignedItem.time || "Today 10:30 AM",
    status: "Assigned",
    techName: techName,
    technician_name: techName,
    technician_id: techId,
    assignedAt: new Date().toISOString(),
  };

  if (existingJobIdx >= 0) {
    assignedJobs[existingJobIdx] = jobRecord;
  } else {
    assignedJobs.unshift(jobRecord);
  }
  setStoredData("assigned_jobs", assignedJobs);

  // 3. Update Technician status to Busy
  const technicians = getStoredData("allRegisteredTechnicians", INITIAL_TECHNICIANS);
  const updatedTechnicians = technicians.map((t) => {
    if (String(t.id) === String(techId) || t.name?.toLowerCase() === techName?.toLowerCase()) {
      return { ...t, status: "Busy", available_today: false };
    }
    return t;
  });
  setStoredData("allRegisteredTechnicians", updatedTechnicians);

  notifyRealtimeSync("fieldflow_job_assigned", jobRecord);
  return jobRecord;
}

// Technician / Dispatcher: Update Job Status
export function updateJobStatus(bookingId, newStatus) {
  initRealtimeData();

  // 1. Update customer bookings
  const bookings = getStoredData("customer_bookings", INITIAL_BOOKINGS);
  const updatedBookings = bookings.map((b) => {
    if (String(b.id || b.bookingId) === String(bookingId)) {
      return { ...b, status: newStatus };
    }
    return b;
  });
  setStoredData("customer_bookings", updatedBookings);

  // 2. Update assigned jobs
  const assignedJobs = getStoredData("assigned_jobs", []);
  const updatedAssignedJobs = assignedJobs.map((j) => {
    if (String(j.bookingId || j.id) === String(bookingId)) {
      return { ...j, status: newStatus };
    }
    return j;
  });
  setStoredData("assigned_jobs", updatedAssignedJobs);

  notifyRealtimeSync("fieldflow_job_status_change", { bookingId, status: newStatus });
}
