export const secureRandomString = (length = 16) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map((b) => b.toString(36))
    .join("")
    .slice(0, length);
};
export const formatDateToUTC = (date) => {
  console.log("date is: ", date);
  return (
    date.getUTCFullYear().toString() +
    String(date.getUTCMonth() + 1).padStart(2, "0") +
    String(date.getUTCDate()).padStart(2, "0") +
    String(date.getUTCHours()).padStart(2, "0") +
    String(date.getUTCMinutes()).padStart(2, "0") +
    String(date.getUTCSeconds()).padStart(2, "0")
  );
};

export const formatTimeToUTC = (date) => {
  return `${String(date.getUTCHours()).padStart(2, "0")}:${String(
    date.getUTCMinutes()
  ).padStart(2, "0")}`;
};

export const dateFromAndTo = (value) => {
  const now = new Date();
  if (value === 1) {
    now.setHours(0, 0, 0);
  } else {
    now.setHours(23, 59, 58);
  }

  console.log(now, "nownownownow");
  const getFromDate = formatDateToUTC(now);
  console.log(getFromDate, "getFromDategetFromDate");
  return getFromDate;
  // return value === 1 ? formatDate(dateFromUTC) : formatDate(dateToUTC);
};
