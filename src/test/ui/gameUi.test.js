import GameUi from "../../assets/js/ui/gameUi";

describe("Game UI creation", () => {
  test("it should not throw exception when valid arguments are provided.", () => {
    // Arrange & Act
    const act = () => new GameUi(jest.fn(), jest.fn());

    // Assert
    expect(act).not.toThrow(TypeError);
  });

  test("it should not throw exception when valid arguments are provided.", () => {
    // Arrange & Act
    new GameUi(jest.fn(), jest.fn());

    // At first, it gets contents inside html tag, then inside body tag
    const body = document.childNodes[1].children[1];
    const classList = Array.from(body.children)
      .map((c) => c.classList[0])
      .filter((x) => x != null);

    const gameGridContainer = body.getElementsByClassName(
      "game-grid-container"
    )[0];

    const gameGridCount = Array.from(gameGridContainer.children).filter(
      (x) => x.className === "game-grid"
    ).length;

    // Assert
    expect(classList).toContain("game-info");
    expect(classList).toContain("game-grid-container");
    expect(classList).toContain("restart-button");
    expect(classList).toContain("game-history-display");

    expect(gameGridContainer.childElementCount).toBe(9);
    expect(gameGridCount).toBe(9);
  });

  test.each([
    [null, jest.fn()],
    [jest.fn(), null],
    [undefined, jest.fn()],
    ["abc", jest.fn()],
    [jest.fn(), 3],
  ])(
    "it should throw exception when invalid arguments are provided.",
    (fn1, fn2) => {
      // Arrange & Act
      const act = () => new GameUi(fn1, fn2);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});
