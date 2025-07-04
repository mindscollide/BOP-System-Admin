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

export function isValidNumberUnderMax(value, previousValue, max = 100) {
  if (/\s/.test(value)) return false; // 🚫 Blocks spacebar input
  if (value === "" || value === null || value === undefined) return true;

  const trimmed = value.trim();

  // Allow just "." — intermediate input
  if (trimmed === ".") return true;

  // If previous value was "0" and new input is a digit (1-9), replace "0" with the new digit
  if (previousValue === "0" && /^[1-9]$/.test(trimmed)) {
    return trimmed; // Returns "5" instead of "05"
  }

  // Build regex dynamically based on max value
  // Accept up to 2 decimal places
  const maxInt = Math.floor(max);
  const regex = new RegExp(
    `^(${maxInt}(\\.0{0,2})?|\\d{1,${
      maxInt.toString().length - 1
    }}(\\.\\d{0,2})?)$`
  );

  if (!regex.test(trimmed)) return false;

  const number = parseFloat(trimmed);
  if (!isNaN(number)) {
    return number >= 0 && number <= max;
  }

  return true;
}

/**
 * Validates if a value is a positive number with optional decimal places
 * @param {string|number} value - The value to validate
 * @param {number} [maxDecimalPlaces=2] - Maximum allowed decimal places
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidAmount = (value, maxDecimalPlaces = 2) => {
  if (value === null || value === undefined || value === "") return false;

  // Convert to number if it's a string
  const num = Number(value);
  if (isNaN(num)) return false;

  // Check if positive
  if (num < 0) return false;

  // Check decimal places
  const decimalPart = value.toString().split(".")[1];
  if (decimalPart && decimalPart.length > maxDecimalPlaces) return false;

  return true;
};


export const convertDateTimeIntoLocal = (utcDateString) => {
  const year = parseInt(utcDateString.slice(0, 4));
  const month = parseInt(utcDateString.slice(4, 6)) - 1; // JS months are 0-based
  const day = parseInt(utcDateString.slice(6, 8));
  const hour = parseInt(utcDateString.slice(8, 10));
  const minute = parseInt(utcDateString.slice(10, 12));
  const second = parseInt(utcDateString.slice(12, 14));

  // Create date in UTC
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  console.log(utcDate, "utcDateutcDate")
  // Convert to local time string
  const localDateString = utcDate.toString(); // Uses system/browser local time

  console.log("Local Time:", localDateString);

  return utcDate;
};