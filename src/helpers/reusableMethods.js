//Date
export const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

//Date and Time
export const formatDateTime = (date) =>
  date ? new Date(date).toISOString() : "";
