//Date
export const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

//Date and Time
export const formatDateTime = (date) =>
  date ? new Date(date).toISOString() : "";

// export const formatDateAndTimeFromString = (dateString) => {
//   // Assuming the dateString is in the format 'YYYYMMDDHHMMSS'
//   let year = dateString.substring(0, 4);
//   let month = dateString.substring(4, 6) - 1; // Month is 0-indexed in JavaScript
//   let day = dateString.substring(6, 8);
//   let hours = dateString.substring(8, 10);
//   let minutes = dateString.substring(10, 12);
//   let seconds = dateString.substring(12, 14);

//   // Create a Date object
//   let date = new Date(year, month, day, hours, minutes, seconds);

//   // Format the date as 'DD/MM/YYYY HH:MM:SS'
//   return (
//     ("0" + date.getDate()).slice(-2) +
//     "/" +
//     ("0" + (date.getMonth() + 1)).slice(-2) +
//     "/" +
//     date.getFullYear() +
//     " " +
//     ("0" + date.getHours()).slice(-2) +
//     ":" +
//     ("0" + date.getMinutes()).slice(-2) +
//     ":" +
//     ("0" + date.getSeconds()).slice(-2)
//   );
// };

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
