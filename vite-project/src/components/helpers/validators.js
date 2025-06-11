export const required = (value) =>
  value ? undefined : "This Field Is Required";
export const minLength = (value) =>
  value.length < 5 ? "Min length 5" : undefined;
export const isNumber = (value) =>
  !isFinite(value) ? "Write the number" : undefined;
export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
