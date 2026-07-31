const router = require("express").Router();
const ctrl   = require("../controllers/settingsController");
const { protect } = require("../middleware/authMiddleware");

router.get ("/profile",       protect, ctrl.getProfile);
router.put ("/profile",       protect, ctrl.updateProfile);
router.put ("/password",      protect, ctrl.updatePassword);
router.get ("/preferences",   protect, ctrl.getPreferences);
router.put ("/preferences",   protect, ctrl.updatePreferences);
router.get ("/notifications", protect, ctrl.getNotifications);
router.put ("/notifications", protect, ctrl.updateNotifications);
router.get ("/appearance",    protect, ctrl.getAppearance);
router.put ("/appearance",    protect, ctrl.updateAppearance);
router.get ("/language",      protect, ctrl.getLanguage);
router.put ("/language",      protect, ctrl.updateLanguage);
router.get ("/privacy",       protect, ctrl.getPrivacy);
router.put ("/privacy",       protect, ctrl.updatePrivacy);

module.exports = router;
