import {
  validateFunction,
  validateInteger,
  validateString,
} from "../../assets/js/utils/validators";

describe("Validate Function", () => {
  test("It should not throw exception when valid function is provided.", () => {
    // Act
    const act = () => validateFunction(jest.fn());

    // Assert
    expect(act).not.toThrow(TypeError);
  });

  test.each([null, 10, "abc", undefined])(
    "It should throw exception when argument is not a function.",
    (arg) => {
      // Act
      const act = () => {
        validateFunction(arg);
      };

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("Validate String", () => {
  test.each(["123", "abc"])(
    "it should not throw exception when valid string is provided.",
    (arg) => {
      // Act
      const act = () => validateString(arg);

      // Assert
      expect(act).not.toThrow(TypeError);
    }
  );

  test("it should not throw exception when empty string is provided with 'allowEmptyString' parameter as true.", () => {
    // Act
    const act = () => validateString(arg, [], true);

    // Assert
    expect(act).not.toThrow(TypeError);
  });

  test.each([123, null, undefined, false])(
    "It should throw exception when argument is not a string.",
    (arg) => {
      // Act
      const act = () => validateString(arg);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test("It should throw exception when argument is not included in allowed strings.", () => {
    // Arrange
    const allowedStrings = ["abc", "123", "yyz"];
    const arg = "notValid";

    // Act
    const act = () => validateString(arg, allowedStrings);

    // Assert
    expect(act).toThrow(TypeError);
  });
});

describe("Validate Integer", () => {
  test.each([1, 5, 9])(
    "it should not throw exception when valid integer is provided.",
    (arg) => {
      // Act
      const act = () => validateInteger(arg);

      // Assert
      expect(act).not.toThrow(TypeError);
    }
  );

  test.each([
    [99, 98, 100],
    [-300, -500, -100],
    [25, 25, 25],
  ])(
    "it should not throw exception when valid integer is provided with custom valid range.",
    (value, rangeLow, rangeHigh) => {
      // Act
      const act = () => validateInteger(value, rangeLow, rangeHigh);

      // Assert
      expect(act).not.toThrow(TypeError);
    }
  );

  test.each([null, "abc", false, undefined])(
    "it should throw exception when argument is not a number.",
    (arg) => {
      // Act
      const act = () => validateInteger(arg);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([1.25, 2.6, 8.1])(
    "it should throw exception when argument is not an integer.",
    (arg) => {
      // Act
      const act = () => validateInteger(arg);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([
    [null, 3],
    [4, false],
    [1.3, 7.4],
  ])(
    "it should throw exception when invalid range is provided.",
    (rangeLow, rangeHigh) => {
      // Arrange
      const arg = 3;

      // Act
      const act = () => validateInteger(arg, rangeLow, rangeHigh);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([
    [120, 98, 100],
    [-600, -500, -100],
    [26, 25, 25],
  ])(
    "it should throw exception when argument is out of custom valid range.",
    (value, rangeLow, rangeHigh) => {
      // Act
      const act = () => validateInteger(value, rangeLow, rangeHigh);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});
