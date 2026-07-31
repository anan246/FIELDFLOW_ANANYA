function validateProfileUpdate(body) {
  const errors = [];
  if (body.name !== undefined && typeof body.name !== "string") {
    errors.push("Name must be a string.");
  }
  if (body.phone !== undefined && body.phone !== "" && !/^[+0-9\s-]{7,15}$/.test(body.phone)) {
    errors.push("Phone number must be a valid phone number format.");
  }
  return errors;
}

function validatePasswordUpdate(body) {
  const errors = [];
  if (!body.currentPassword) errors.push("Current password is required.");
  if (!body.newPassword) errors.push("New password is required.");
  if (body.newPassword && body.newPassword.length < 6) {
    errors.push("New password must be at least 6 characters.");
  }
  return errors;
}

function validatePreferences(body) {
  const errors = [];
  const validThemes = ["light", "dark", "system"];
  const validLanguages = ["en", "hi", "ta", "te", "kn"];
  const validVisibility = ["public", "private", "friends"];

  if (body.theme && !validThemes.includes(body.theme)) {
    errors.push(`Theme must be one of: ${validThemes.join(", ")}`);
  }
  if (body.language && !validLanguages.includes(body.language)) {
    errors.push(`Language must be one of: ${validLanguages.join(", ")}`);
  }
  if (body.privacy_profile_visibility && !validVisibility.includes(body.privacy_profile_visibility)) {
    errors.push(`Privacy profile visibility must be one of: ${validVisibility.join(", ")}`);
  }
  return errors;
}

module.exports = { validateProfileUpdate, validatePasswordUpdate, validatePreferences };
