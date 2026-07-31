# FieldFlow Project Notes

## Completed Features & Updates

1. **Dashboard & Settings Styling**:
   - Modern light dashboard theme (`#F4F6FB` background, `#111F36` dark navy sidebar, `#FF6000` orange accents).
   - Unified `SettingsLayout` across all roles (`customer`, `admin`, `dispatcher`, `technician`).

2. **Environment Variable Configuration**:
   - Centralized API endpoint routing via `lib/apiConfig.js`.
   - `.env.local` and `.env.example` set up with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ADMIN_API_URL`.

3. **Backend & Database**:
   - `user_preferences` PostgreSQL table created and migrated in Supabase.
   - Settings routes & controllers updated for profile, password, appearance, language, notifications, and privacy preferences.

4. **Postman Documentation**:
   - Created `POSTMAN_COLLECTION.json` for rapid API import.
   - Created `POSTMAN_GUIDE.md` for endpoint documentation.

*Last Updated: 2026-07-31*
