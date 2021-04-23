import GameGrid from "../../assets/js/ui/gameGrid";

describe("GameGrid creation", () => {
  test.each([1, 2, 9])("It should create valid game grid.", (playerId) => {
    // Arrange
    const gameGrid = new GameGrid(playerId, jest.fn());

    // Act
    const elementHtml = gameGrid.getHtml();

    // Assert
    expect(elementHtml.classList).toContain("game-grid");
  });

  test.each([-1, 10])(
    "It should not create game grid if id is not contained in [0, 9] interval.",
    (playerId) => {
      // Arrange & Act
      const act = () => new GameGrid(playerId, jest.fn());

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([1.2, 5.3, null, undefined, [], "abc"])(
    "It should not create game grid if it is not an integer.",
    (playerId) => {
      // Arrange & Act
      const act = () => new GameGrid(playerId, jest.fn());

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("On click even handling", () => {
  test("It should call passed function.", () => {
    // Arrange
    const onClickHandler = jest.fn();
    const gameGrid = new GameGrid(1, onClickHandler);
    const elementHtml = gameGrid.getHtml();

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
    const gameGrid = new GameGrid(1, onClickHandler);

    // Act
    gameGrid.setPlayerMark(mark);
    const elementHtml = gameGrid.getHtml();

    // Assert
    expect(elementHtml.innerHTML).toBe(mark);
  });
});
