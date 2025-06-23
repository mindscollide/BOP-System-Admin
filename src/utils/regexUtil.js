export function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export function validateBopEmail(email) {
  const pattern = /^[^\s@]+@bop\.com(\.pk)?$/;
  return pattern.test(email);
}
