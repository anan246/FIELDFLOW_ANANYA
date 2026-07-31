const Notification = require("../models/Notification");

async function notify(userId, message) {
  return Notification.create(userId, message);
}

module.exports = { notify };
