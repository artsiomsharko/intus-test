export const requiredError = (value) => {
  if (!value) return `Required`;
};

export const lengthError = (min, max) => (value) => {
  if (value.length < min) {
    return `Must be at least ${min} characters long`;
  }
  if (value.length > max) {
    return `Must be less than ${max} characters long`;
  }
};
