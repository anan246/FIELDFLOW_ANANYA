const ROLES = { ADMIN: "admin", CUSTOMER: "customer", TECHNICIAN: "technician", DISPATCHER: "dispatcher" };
const BOOKING_STATUS = { PENDING: "pending", ASSIGNED: "assigned", IN_PROGRESS: "in_progress", COMPLETED: "completed", CANCELLED: "cancelled" };
const SERVICE_CATEGORIES = ["Electrician", "Plumber", "AC Technician", "Carpenter", "Painter"];

module.exports = { ROLES, BOOKING_STATUS, SERVICE_CATEGORIES };
