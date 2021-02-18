import Element from "../../assets/js/ui/element";

describe("Element creation", () => {
  test.each([1, 2, 9])("It should create valid element.", (playerId) => {
    // Arrange
    const element = new Element(playerId, jest.fn());

    // Act
    const elementHtml = element.getHtml();

    // Assert
    expect(elementHtml.classList).toContain("game-grid");
  });

  test.each([-1, 10])(
    "It should not create element if id is not contained in [0, 9] interval.",
    (playerId) => {
      // Arrange & Act
      const act = () => new Element(playerId, jest.fn());

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([1.2, 5.3, null, undefined, [], "abc"])(
    "It should not create element if it is not an integer.",
    (playerId) => {
      // Arrange & Act
      const act = () => new Element(playerId, jest.fn());

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("On click even handling", () => {
  test("It should call passed function.", () => {
    // Arrange
    const onClickHandler = jest.fn();
    const element = new Element(1, onClickHandler);
    const elementHtml = element.getHtml();

    // Act
    elementHtml.click();

    // Assert
    expect(onClickHandler.mock.calls.length).toBe(1);
  });
});

describe("Set player mark", () => {
  test.each(["X", "O"])("It should set valid mark.", (mark) => {
    // Arrange
    const onClickHandler = jest.fn();
    const element = new Element(1, onClickHandler);

    // Act
    element.setPlayerMark(mark);
    const elementHtml = element.getHtml();

    // Assert
    expect(elementHtml.innerHTML).toBe(mark);
  });
});
