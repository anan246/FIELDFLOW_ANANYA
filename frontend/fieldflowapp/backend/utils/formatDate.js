const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

module.exports = formatDate;
