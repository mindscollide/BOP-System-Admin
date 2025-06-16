import moment from "moment";
import React from "react";
import { z } from "zod";

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

// export const generateData = (
//   Data,
//   columnValue,
//   tenors = [],
//   instruments = [],
//   forwardRates = [],
//   discountRates = []
// ) => {
//   let discountRatesResult = [];
//   let forwardsRatesResult = [];

//   console.log(tenors, "tenorstenorstenors");
//   console.log(instruments, "tenorstenorstenors");
//   console.log(forwardRates, "tenorstenorstenors");
//   console.log(discountRates, "tenorstenorstenors");

//   if (columnValue === 1) {
//     discountRates.map((discValue, index) => {
//       let findTenorName = tenors.find(
//         (tenorsData) => tenorsData.tenorID === discValue.tenorID
//       );
//       let findInstrumentName = instruments.find(
//         (insturmentData) =>
//           insturmentData.instrumentID === discValue.instrumentID
//       );

//       const discountRateValue = {
//         key: `index ${index + 1}`,
//         Tenor: findTenorName ? findTenorName.tenorName : "",
//         TenorID: findTenorName ? findTenorName.tenorID : 0,
//         tenorDays: findTenorName ? findTenorName.tenorDays : "",
//         instrumentTitle: findInstrumentName
//           ? findInstrumentName.instrumentName
//           : "",
//         InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,
//         value: discValue.rate,
//       };

//       discountRatesResult.push(discountRateValue);
//     });
//   } else if (columnValue === 2) {
//     Data.discountRates.map((discValue, index) => {
//       let findTenorName = Data.tenors.find(
//         (tenorsData) => tenorsData.tenorID === discValue.tenorID
//       );
//       let findInstrumentName = Data.instruments.find(
//         (insturmentData) =>
//           insturmentData.instrumentID === discValue.instrumentID
//       );

//       const discountRateValue = {
//         key: `index ${index + 1}`,
//         Tenor: findTenorName ? findTenorName.tenorName : "",
//         TenorID: findTenorName ? findTenorName.tenorID : 0,
//         tenorDays: findTenorName ? findTenorName.tenorDays : "",
//         instrumentTitle: findInstrumentName
//           ? findInstrumentName.instrumentName
//           : "",
//         InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,
//         value: discValue.rate,
//       };

//       discountRatesResult.push(discountRateValue);
//     });
//   } else if (columnValue === 3) {
//     // Dummy Data
//     Data.forwardRates.map((forwData, index) => {
//       let findTenorName = Data.tenors.find(
//         (tenorsData) => tenorsData.tenorID === forwData.tenorID
//       );
//       let findInstrumentName = Data.instruments.find(
//         (insturmentData) =>
//           insturmentData.instrumentID === forwData.instrumentID
//       );

//       const forwardRateData = {
//         key: `index ${index + 1}`,
//         Tenor: findTenorName ? findTenorName.tenorName : "",
//         TenorID: findTenorName ? findTenorName.tenorID : 0,
//         tenorDays: findTenorName ? findTenorName.tenorDays : "",
//         instrumentName: findInstrumentName
//           ? findInstrumentName.instrumentName
//           : "",
//         InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,

//         ask: forwData.ask,
//         bid: forwData.bid,
//       };

//       forwardsRatesResult.push(forwardRateData);
//     });
//   } else if (columnValue === 4) {
//     forwardRates.map((forwData, index) => {
//       let findTenorName = tenors.find(
//         (tenorsData) => tenorsData.tenorID === forwData.tenorID
//       );
//       let findInstrumentName = instruments.find(
//         (insturmentData) =>
//           insturmentData.instrumentID === forwData.instrumentID
//       );

//       const forwardRateData = {
//         key: `index ${index + 1}`,
//         Tenor: findTenorName ? findTenorName.tenorName : "",
//         TenorID: findTenorName ? findTenorName.tenorID : 0,
//         tenorDays: findTenorName ? findTenorName.tenorDays : "",
//         instrumentName: findInstrumentName
//           ? findInstrumentName.instrumentName
//           : "",
//         InstrumentID: findInstrumentName ? findInstrumentName.instrumentID : 0,

//         ask: forwData.ask,
//         bid: forwData.bid,
//       };

//       forwardsRatesResult.push(forwardRateData);
//     });
//   }

//   return {
//     discountRates: discountRatesResult,
//     forwardsRates: forwardsRatesResult,
//   };
// };

/**
 * Creates dynamic columns for an Ant Design table based on provided data and type.
 *
 * @param {Array} data - The data used to generate columns, containing instrument information.
 * @param {number} value - Determines the type of columns to create (1 for Discount, others for Forwards).
 * @returns {Array} - An array of column configurations for the Ant Design table.
 */

// export const createColumns = (data, value) => {
//   let baseColumns;
//   if (value === 3) {
//     baseColumns = [
//       {
//         title: "", // Empty title for a merged header style
//         dataIndex: "", // No data index for this parent column
//         key: "", // Key for the parent column
//         align: "", // Alignment (empty for this parent column)
//         width: 80, // Set column width
//         children: [
//           {
//             title: "Tenor", // Header name for the child column
//             dataIndex: "Tenor", // Data key from the dataset for Tenor
//             key: "tenor", // Unique key for the child column
//             align: "center", // Center align the content
//             width: 80, // Set column width
//           },
//         ],
//       },
//       {
//         title: "", // Empty title for a merged header style
//         dataIndex: "", // No data index for this parent column
//         key: "", // Key for the parent column
//         align: "", // Alignment (empty for this parent column)
//         width: 80, // Set column width
//         children: [
//           {
//             title: "Days", // Header name for the child column
//             dataIndex: "tenorDays", // Data key from the dataset for Tenor
//             key: "tenorDays", // Unique key for the child column
//             align: "center", // Center align the content
//             width: 80, // Set column width
//           },
//         ],
//       },
//     ];
//   } else {
//     // Base column that will always be present, containing the Tenor column
//     baseColumns = [
//       {
//         title: "", // Empty title for a merged header style
//         dataIndex: "", // No data index for this parent column
//         key: "", // Key for the parent column
//         align: "", // Alignment (empty for this parent column)
//         width: 80, // Set column width
//         children: [
//           {
//             title: "Tenor", // Header name for the child column
//             dataIndex: "Tenor", // Data key from the dataset for Tenor
//             key: "tenor", // Unique key for the child column
//             align: "center", // Center align the content
//             width: 80, // Set column width
//           },
//         ],
//       },
//     ];
//   }

//   let instrumentColumns = [];

//   try {
//     // Check if value is 1 to create Discount columns, otherwise create Forwards columns
//     if (value === 1) {
//       // Create Discount columns
//       instrumentColumns = data.reduce((acc, item) => {
//         const instrument = item.instrumentTitle;

//         // Check if the instrument column already exists in acc
//         if (!acc.find((col) => col.title === instrument)) {
//           acc.push({
//             title: instrument, // Title of the instrument column
//             key: instrument, // Unique key for the instrument column
//             width: 100, // Set column width

//             children: [
//               {
//                 title: "Value", // Title for the child column
//                 dataIndex: "value", // Data key for Value from the dataset
//                 key: `${instrument}-value`, // Unique key for the child column
//                 align: "center", // Center align the content
//                 width: 100, // Set column width
//               },
//             ],
//           });
//         }

//         return acc; // Return the accumulator with newly added column if applicable
//       }, []);
//     } else if (value === 2 || value === 3) {
//       // Create Forwards columns
//       instrumentColumns = data.reduce((acc, item) => {
//         const instrument = item.instrumentTitle || item.instrumentName;

//         // Check if the instrument column already exists in acc
//         if (!acc.find((col) => col.title === instrument)) {
//           acc.push({
//             title: instrument, // Title of the instrument column
//             key: instrument, // Unique key for the instrument column

//             children: [
//               {
//                 title: "Bid", // Title for the Bid child column
//                 dataIndex: "bid", // Data key for Bid from the dataset
//                 key: `${instrument}-bid`, // Unique key for the Bid child column
//                 align: "center", // Center align the content
//                 width: 100, // Set column width
//               },
//               {
//                 title: "Ask", // Title for the Ask child column
//                 dataIndex: "ask", // Data key for Ask from the dataset
//                 key: `${instrument}-ask`, // Unique key for the Ask child column
//                 align: "center", // Center align the content
//                 width: 100, // Set column width
//               },
//             ],
//           });
//         }

//         return acc; // Return the accumulator with newly added column if applicable
//       }, []);
//     }
//   } catch (error) {
//     console.error("Error creating columns:", error);
//     // Handle error appropriately here, e.g., log error, return a default column structure, etc.
//     // For example, returning only baseColumns in case of error
//     return baseColumns;
//   }

//   // Combine base columns and dynamically generated instrument columns
//   return [...baseColumns, ...instrumentColumns];
// };

export function isValidNumberUnder100(value, previousValue) {
  if (/\s/.test(value)) return false; // 🚫 Blocks spacebar input
  if (value === "" || value === null || value === undefined) return true;

  const trimmed = value.trim();

  // Allow just "." — intermediate input
  if (trimmed === ".") return true;

  // If previous value was "0" and new input is a digit (1-9), replace "0" with the new digit
  if (previousValue === "0" && /^[1-9]$/.test(trimmed)) {
    return trimmed; // Returns "5" instead of "05"
  }

  // Updated regex to allow max 2 decimal digits
  const regex = /^(100(\.0{0,2})?|\d{1,2}(\.\d{0,2})?)$/;

  if (!regex.test(trimmed)) return false;

  // Parse and validate range (0-100)
  const number = parseFloat(trimmed);
  if (!isNaN(number)) {
    return number >= 0 && number <= 100;
  }

  return true;
}

export const numberUnder100Schema = z
  .string()
  .refine((val) => val.trim() === "." || !isNaN(Number(val)), {
    message: "Must be a valid number",
  })
  .transform((val) => val.trim())
  .refine((val) => {
    // Allow "." as intermediate input
    if (val === ".") return true;

    // Replace "0x" with "x" (e.g., "05" → "5")
    if (/^0[1-9]$/.test(val)) return val.slice(1);

    return val;
  })
  .refine(
    (val) => {
      // Check if it's a valid number (0-100, max 2 decimals)
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Must be between 0 and 100",
    }
  )
  .refine(
    (val) => {
      // Enforce max 2 decimal places
      return !val.includes(".") || val.split(".")[1].length <= 2;
    },
    {
      message: "Max 2 decimal places allowed",
    }
  );

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
