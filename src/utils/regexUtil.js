export const validateEmail = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}(\.[a-z]{2,})?$/i;

  // Make sure TLD does not repeat like .com.com or .com.pk.com
  const invalidRepeatTLD = /\.([a-z]{2,})\.\1$/i;

  return pattern.test(email) && !invalidRepeatTLD.test(email);
};

export function validateBopEmail(email) {
  let bopEmailRegex = /^[a-zA-Z0-9._%+-]+@bop\.com\.pk$/i;
  return bopEmailRegex.test(email);
  // return true
}
