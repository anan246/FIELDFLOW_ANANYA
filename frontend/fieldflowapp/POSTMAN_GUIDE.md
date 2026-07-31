# FieldFlow API — Postman Testing Guide

This guide details all API endpoints for the **FieldFlow** application, how to import the Postman collection, and sample JSON payloads.

---

## Quick Import

You can directly import all requests into Postman using the provided collection file:
- File Location: [`POSTMAN_COLLECTION.json`](file:///c:/Users/Ananya%20L%20S/OneDrive/Documents/Field%20Flow/FieldFlow-frontend/frontend/fieldflowapp/POSTMAN_COLLECTION.json)
- In Postman: Click **Import** (top left) ➔ Select **File** ➔ Choose `POSTMAN_COLLECTION.json`.

---

## Server Ports & Base URLs

| Server | Base URL | Environment Variable |
| :--- | :--- | :--- |
| **Main API (Auth, Settings, Users)** | `http://localhost:5000/api` | `NEXT_PUBLIC_API_URL` |
| **Admin API (Dashboard & Admin stats)** | `http://localhost:5001/api/admin` | `NEXT_PUBLIC_ADMIN_API_URL` |

---

## Authorization

All endpoints except `POST /api/auth/register` require a **JWT Bearer Token**.

In Postman:
1. Go to the **Auth** tab.
2. Type: **Bearer Token**.
3. Token: Paste the JWT token returned after registering/logging in.

---

## API Endpoints Reference

### 1. Authentication

#### `POST /api/auth/register`
Creates a new user account (*customer*, *technician*, *dispatcher*, or *admin*).

**Headers**: `Content-Type: application/json`

**Body (`raw` -> `JSON`)**:
```json
{
  "role": "customer",
  "name": "Ananya Sharma",
  "email": "ananya@example.com",
  "phone": "9876543210",
  "password": "password123",
  "city": "Bangalore",
  "address": "100 Feet Road, Indiranagar",
  "pincode": "560038"
}
```

---

### 2. Settings & Preferences (Port 5000)

#### `GET /api/settings/preferences`
Fetches active user preferences.

#### `PUT /api/settings/appearance`
Updates theme preferences (*light*, *dark*, *system*).

```json
{
  "theme": "light"
}
```

#### `PUT /api/settings/notifications`
Updates notification preferences.

```json
{
  "email_notifications": true,
  "push_notifications": false,
  "marketing_notifications": true
}
```

#### `PUT /api/settings/language`
Updates interface language (*en*, *hi*, *ta*, *te*, *kn*).

```json
{
  "language": "hi"
}
```

#### `PUT /api/settings/privacy`
Updates profile visibility (*public*, *private*, *friends*).

```json
{
  "privacy_profile_visibility": "public"
}
```

#### `PUT /api/settings/password`
Updates account password.

```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

#### `PUT /api/settings/profile`
Updates user profile information.

```json
{
  "name": "Ananya Sharma",
  "phone": "9876543210",
  "city": "Mumbai"
}
```

---

### 3. Admin API (Port 5001)

#### `GET /api/admin/dashboard`
Fetches dashboard stats, booking counts, and recent bookings.

#### `GET /api/admin/users`
Lists all registered users.

#### `GET /api/admin/technicians`
Lists all technicians and availability statuses.

#### `GET /api/admin/bookings`
Lists all bookings and job status timelines.
