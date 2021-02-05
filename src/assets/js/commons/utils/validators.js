const validateFunction = (arg) => {
  if (!arg || {}.toString.call(arg) !== "[object Function]")
    throw new TypeError("Argument should be a function.");
};

const validateString = (arg, allowedStrings = [], allowEmptyString = false) => {
  if (Object.prototype.toString.call(arg) !== "[object String]")
    throw new TypeError("Argument should be a string.");

  if (!allowEmptyString && arg === "")
    throw new TypeError("Argument cannot be empty.");

  if (allowedStrings.length > 0 && !allowedStrings.includes(arg))
    throw new TypeError(`String value ${arg} is not valid.`);
};

const validateInteger = (arg, rangeLow = 0, rangeHigh = 9) => {
  if (!arg || Object.prototype.toString.call(arg) !== "[object Number]")
    throw new TypeError("Argument should be a number.");

  if (!Number.isInteger(arg))
    throw new TypeError("Argument should be an integer number.");

  if (!Number.isInteger(rangeLow) || !Number.isInteger(rangeHigh))
    throw new TypeError("Range should be composed of two integers.");

  if (arg < rangeLow || arg > rangeHigh)
    throw new TypeError("Argument should be inside range.");
};

export { validateFunction, validateString, validateInteger };
