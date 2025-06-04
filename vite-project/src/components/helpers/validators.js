export const required = (value) =>
  value ? undefined : "This Field Is Required";
export const minLength = (value) =>
  value.length < 5 ? "Min length 5" : undefined;
export const phoneValid = (value) =>
  /^\d{3}-\d{3}-\d{4}$/.test(value) ? undefined : "Invalid format";
export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
