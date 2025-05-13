import moment from "moment";

//Date
export const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

//Date and Time
export const formatDateTime = (date) =>
  date ? new Date(date).toISOString() : "";

export const ConvertDateTimrStringIntoGTM = (date, pattern) => {
  let ConvertIntoISO = moment(date, pattern).toISOString();
  console.log(ConvertIntoISO, "ConvertIntoISOConvertIntoISO");
  return new Date(ConvertIntoISO);
};

export const extractTimeOnly = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toTimeString().split(" ")[0]; // Returns "HH:MM:SS"
};

export const formatDateAndTimeFromString = (date) => {
  let dateString =
    date.slice(0, 4) +
    "-" +
    date.slice(4, 6) +
    "-" +
    date.slice(6, 8) +
    " " +
    date.slice(8, 10) +
    ":" +
    date.slice(10, 12) +
    ":" +
    date.slice(12, 14);
  return new Date(dateString);
};

export const formatTimeSpan = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  return `${hours} hrs ${minutes} mins ${seconds} secs`;
};

export const formatCurrencyInput = (value) => {
  if (!value) return ""; // Return empty string if no value

  // Remove non-numeric characters
  let cleanVal = value.replace(/[^0-9]/g, "");

  // Automatically add decimal if length is greater than 3
  if (cleanVal.length > 3) {
    let integerPart = cleanVal.slice(0, 3); // First 3 digits
    let decimalPart = cleanVal.slice(3, 5) || "00"; // Next 2 digits or default "00"
    return `${integerPart}.${decimalPart}`;
  }

  return cleanVal;
};
