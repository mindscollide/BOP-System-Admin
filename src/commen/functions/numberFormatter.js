// for only number input
export const forNumbersOnly = (value) => {
  const regex = /^[0-9]+$/;
  return regex.test(value);
};
//  for view event Number
export const formatNumberForTwoDecimal = (value) => {
  if (value != null && value != 0.0) {
    const formattedNumber = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedNumber;
  }
};
export const formatNumberForFourDecimal = (value) => {
  if (value != null && value != 0.0) {
    const formattedNumber = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    });
    return formattedNumber;
  }
};
//  for onchange event
export const formatNumberWithCommas = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const numberformatgerWithTwoDecimalValues = (value) => {
  if (value != null && value != undefined) {
    let inputValue = value;

    // Remove existing commas and trailing decimal points
    inputValue = inputValue.replace(/\s/g, "").replace(/,/g, "");
    const regex = /^\d{0,4}(\.\d{0,2})?$/;

    // Validate and format the input
    if (inputValue === "" || regex.test(inputValue)) {
      const formattedValue = formatNumberWithCommas(inputValue);
      return formattedValue;
    }
  }
};

export const numberformatgerWithFourDecimalValues = (value) => {
  if (value != null && value != undefined) {
    let inputValue = value;

    // Remove existing commas and trailing decimal points
    inputValue = inputValue.replace(/,/g, "");
    const regex = /^\d{0,2}(\.\d{0,4})?$/;

    // Validate and format the input
    if (inputValue === "" || regex.test(inputValue)) {
      const formattedValue = formatNumberWithCommas(inputValue);
      return formattedValue;
    }
  }
};
// end onchange event

// for sending cahne string into integer
export const stringConvertintoNumber = (value) => {
  const formattedNumber = value;
  const withoutCommas = formattedNumber.replace(/,/g, "");
  const floatValue = parseFloat(withoutCommas);
  return floatValue;
};
