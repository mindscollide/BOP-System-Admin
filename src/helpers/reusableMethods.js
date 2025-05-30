import moment from "moment";
import React from "react";

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
  if (!value) return "";

  // Allow only numbers and one dot
  let cleanVal = value.replace(/[^0-9.]/g, "");

  // Only allow one dot
  const parts = cleanVal.split(".");
  if (parts.length > 2) {
    return parts[0].slice(0, 2) + "." + parts[1].slice(0, 4); // Ignore extra dots
  }

  const beforeDot = parts[0].slice(0, 2); // Max 2 digits before dot

  if (parts.length === 2) {
    const afterDot = parts[1].slice(0, 4); // Max 4 digits after dot
    return `${beforeDot}.${afterDot}`;
  }

  return beforeDot;
};

export const IndexCell = React.memo(({ value, record, CellClassName }) => {
  console.log("Rendering IndexCell:", record, value);
  return <span className={CellClassName}>{value}</span>;
});
