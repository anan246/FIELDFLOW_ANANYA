const bcrypt = require("bcrypt");
const pool   = require("../config/db");
const svc    = require("../services/settingsService");
const { validateProfileUpdate, validatePasswordUpdate, validatePreferences } = require("../validations/settingsValidation");

const ok  = (res, data, message = "Success") => res.json({ success: true, message, data });
const err = (res, message, status = 400)     => res.status(status).json({ success: false, message, data: null });

// GET /api/settings/profile
async function getProfile(req, res) {
  try {
    const user = await svc.getProfile(req.user.id);
    if (!user) return err(res, "User profile not found.", 404);
    ok(res, user, "Profile fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/profile
async function updateProfile(req, res) {
  try {
    const errors = validateProfileUpdate(req.body);
    if (errors.length) return err(res, errors.join(" "));
    const user = await svc.updateProfile(req.user.id, req.body);
    ok(res, user, "Profile updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/password
async function updatePassword(req, res) {
  try {
    const errors = validatePasswordUpdate(req.body);
    if (errors.length) return err(res, errors.join(" "));

    const result = await pool.query("SELECT password FROM users WHERE id = $1", [req.user.id]);
    if (!result.rows.length) return err(res, "User not found.", 404);

    const match = await bcrypt.compare(req.body.currentPassword, result.rows[0].password);
    if (!match) return err(res, "Current password is incorrect.", 400);

    const hashed = await bcrypt.hash(req.body.newPassword, 10);
    await svc.updatePassword(req.user.id, hashed);
    ok(res, null, "Password updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// GET /api/settings/preferences
async function getPreferences(req, res) {
  try {
    const prefs = await svc.getPreferences(req.user.id);
    ok(res, prefs, "Preferences fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/preferences
async function updatePreferences(req, res) {
  try {
    const errors = validatePreferences(req.body);
    if (errors.length) return err(res, errors.join(" "));
    const prefs = await svc.updatePreferences(req.user.id, req.body);
    ok(res, prefs, "Preferences updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// GET /api/settings/notifications
async function getNotifications(req, res) {
  try {
    const prefs = await svc.getPreferences(req.user.id);
    ok(res, {
      email_notifications:     prefs.email_notifications,
      push_notifications:      prefs.push_notifications,
      marketing_notifications: prefs.marketing_notifications,
    }, "Notification settings fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/notifications
async function updateNotifications(req, res) {
  try {
    const prefs = await svc.updatePreferences(req.user.id, req.body);
    ok(res, {
      email_notifications:     prefs.email_notifications,
      push_notifications:      prefs.push_notifications,
      marketing_notifications: prefs.marketing_notifications,
    }, "Notification settings updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// GET /api/settings/appearance
async function getAppearance(req, res) {
  try {
    const prefs = await svc.getPreferences(req.user.id);
    ok(res, { theme: prefs.theme }, "Appearance settings fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/appearance
async function updateAppearance(req, res) {
  try {
    const errors = validatePreferences(req.body);
    if (errors.length) return err(res, errors.join(" "));
    const prefs = await svc.updatePreferences(req.user.id, { theme: req.body.theme });
    ok(res, { theme: prefs.theme }, "Appearance updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// GET /api/settings/language
async function getLanguage(req, res) {
  try {
    const prefs = await svc.getPreferences(req.user.id);
    ok(res, { language: prefs.language }, "Language settings fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/language
async function updateLanguage(req, res) {
  try {
    const errors = validatePreferences(req.body);
    if (errors.length) return err(res, errors.join(" "));
    const prefs = await svc.updatePreferences(req.user.id, { language: req.body.language });
    ok(res, { language: prefs.language }, "Language updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// GET /api/settings/privacy
async function getPrivacy(req, res) {
  try {
    const prefs = await svc.getPreferences(req.user.id);
    ok(res, { privacy_profile_visibility: prefs.privacy_profile_visibility }, "Privacy settings fetched successfully.");
  } catch (e) { err(res, e.message, 500); }
}

// PUT /api/settings/privacy
async function updatePrivacy(req, res) {
  try {
    const errors = validatePreferences(req.body);
    if (errors.length) return err(res, errors.join(" "));
    const prefs = await svc.updatePreferences(req.user.id, { privacy_profile_visibility: req.body.privacy_profile_visibility });
    ok(res, { privacy_profile_visibility: prefs.privacy_profile_visibility }, "Privacy updated successfully.");
  } catch (e) { err(res, e.message, 500); }
}

module.exports = {
  getProfile, updateProfile, updatePassword,
  getPreferences, updatePreferences,
  getNotifications, updateNotifications,
  getAppearance, updateAppearance,
  getLanguage, updateLanguage,
  getPrivacy, updatePrivacy,
};
