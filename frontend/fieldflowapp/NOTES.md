# FieldFlow Project Notes
Last updated: June 2025

---

## Project Setup
- **Frontend**: Next.js (fieldflowapp/) — port 3000
- **Main Backend**: Express + PostgreSQL/Supabase (backend/server.js) — port 5000
- **Admin Backend**: Separate Express server (backend/admin/server.js) — port 5001
- **Database**: Supabase (PostgreSQL)

---

## How to Run
```bash
# Terminal 1 — Main backend
cd backend && node server.js

# Terminal 2 — Admin backend
cd backend/admin && node server.js

# Terminal 3 — Frontend
npm run dev
```

---

## Key Credentials & Config
- **Admin Invite Code**: `FIELDFLOW_ADMIN_2026`
- **JWT Secret**: `fieldflow_super_secret_key_2026`
- **DATABASE_URL**: in backend/.env (@ encoded as %40)
- **Color Palette**: `#08263B` (dark navy) + `orange-500` ONLY

---

## Git Info
- **Branch**: dev
- **Safe commit**: bb10d46
- **Remote**: origin/dev
- **Friend Sameeksha's commit**: 8ec490a (only login page + login image)

---

## Files Created / Modified

### Frontend — app/

| File | Description |
|------|-------------|
| `app/layout.js` | Root layout, hides Navbar/Footer for /admin routes |
| `app/register/page.js` | Role-based registration (Customer/Technician/Dispatcher/Admin), redirects to role profile after register |
| `app/admin/layout.js` | Fixed sidebar + sticky top bar with global search, notifications panel, admin profile dropdown |
| `app/admin/page.js` | Dashboard: stat cards, reports & analytics bar chart, revenue widget, recent bookings table (click for modal), booking details modal, status timeline, recent activity feed, platform summary |
| `app/admin/users/page.js` | Users: stat cards, search, role filter, table, user detail modal, delete |
| `app/admin/technicians/page.js` | Technicians: stat cards, search, category filter, availability filter, card grid, tech profile modal, toggle availability |
| `app/admin/bookings/page.js` | Bookings: stat cards, search, status filter, table, booking detail modal with status timeline + inline status updater |
| `app/profile/page.js` | Reads user from localStorage, role-aware |
| `app/profile/customer/page.js` | Shows Name, Email, Phone, City, Address, Pincode |
| `app/profile/technician/page.js` | Shows Name, Email, Phone, Category, Experience, Working Area, Available Today |
| `app/profile/dispatcher/page.js` | Shows Name, Email, Phone, Employee ID, Office Branch |
| `app/profile/ProfileHeader.js` | Role-specific title/description |
| `app/profile/AccountInfo.js` | Shows user ID, role, status, created_at |
| `app/profile/PersonalInfo.js` | Shows real user data with role-specific fields |
| `app/login/page.js` | Friend Sameeksha's login page (already merged) |

### Backend — backend/

| File | Description |
|------|-------------|
| `backend/server.js` | Express on port 5000, all routes |
| `backend/controllers/authController.js` | Register with bcrypt + JWT, returns full user object |
| `backend/config/db.js` | pg Pool with Supabase SSL |
| `backend/admin/server.js` | Separate Express on port 5001 |
| `backend/admin/authMiddleware.js` | JWT verify + role=admin check |
| `backend/admin/controllers/dashboardController.js` | Dashboard stats + recent bookings |
| `backend/admin/controllers/usersController.js` | Get all users, delete user |
| `backend/admin/controllers/techniciansController.js` | Get technicians, toggle availability |
| `backend/admin/controllers/bookingsController.js` | Get bookings, update status |

---

## Register Flow
1. User picks role → fills form → submits to `POST http://localhost:5000/api/auth/register`
2. Backend returns `{ token, user }` with full user object
3. Frontend saves to localStorage: `token` and `user`
4. Redirects:
   - admin → `/admin`
   - customer → `/profile/customer`
   - technician → `/profile/technician`
   - dispatcher → `/profile/dispatcher`

---

## Admin Dashboard Features
- ✅ Stat Cards (customers, technicians, bookings, completed)
- ✅ Reports & Analytics (bar chart, avg bookings, cities, growth)
- ✅ Revenue Placeholder Widget (marked as placeholder, connect billing API later)
- ✅ Booking Details Modal (click any row)
- ✅ Booking Status Timeline (inside modal)
- ✅ Recent Activity Feed (timeline with dots)
- ✅ Global Search Bar (top bar, UI ready)
- ✅ Notifications Panel (bell icon, unread badge, mark all read)
- ✅ Admin Profile Dropdown (name, email, role badge, logout)
- ✅ Responsive Layout (fixed sidebar, ml-64 offset, lg: breakpoints)

---

## Mock Data (Temporary)
Technicians, Bookings, Users pages all have mock data fallback.
When backend is ready — remove the `.catch(() => setXxx(MOCK_XXX))` lines.

---

## Known Issues Fixed
- `router` was not assigned from `useRouter()` in register page — fixed
- Hydration error from browser extension injecting `fdprocessedid` — fixed with `suppressHydrationWarning`
- Double `<main>` wrapping in root layout for admin pages — fixed
- lucide-react wrong version `^1.27.0` → fixed to `^0.474.0`
- dotenv v17 issue → downgraded to v16
- `@` in DATABASE_URL → encoded as `%40`

---

## Settings Module

### Routes
- `/customer/settings` → `<SettingsLayout role="customer" />`
- `/technician/settings` → `<SettingsLayout role="technician" />`
- `/dispatcher/settings` → `<SettingsLayout role="dispatcher" />`
- `/admin/settings` → `<SettingsLayout role="admin" />`

### Sections: Security, Notifications, Appearance, Language, Privacy, Help & Support, About, Logout
### Profile menu item links to role-specific profile page
### DB: user_preferences table — run backend/config/migrations/user_preferences.sql in Supabase
### API base: http://localhost:5000/api/settings (all protected with JWT)

## TODO / Pending
- [ ] Run user_preferences.sql migration in Supabase
- [ ] Wire up global search bar to actually filter data
- [ ] Connect Revenue widget to real billing API
- [ ] Login page — save token + user to localStorage on login (friend's task)
- [ ] Integrate friend's backend for technicians and bookings when ready
- [ ] Push latest changes to origin/dev

---

## Supabase Users Table Columns
id, name, email, phone, password, role,
address, city, pincode,
category, experience, working_area, available_today,
employee_id, office_branch,
invite_code, created_at
