import GameUi from "../../assets/js/ui/gameUi";
import { sequenceOrientationEnum } from "../../assets/js/commons/enums/sequenceOrientationEnum";
import { winningCombinations } from "../../assets/js/commons/constants/winningCombinations";

beforeEach(() => {
  cleanDocument();
});

describe("Game UI creation", () => {
  test("it should not throw exception when valid arguments are provided.", () => {
    // Arrange & Act
    const act = () => new GameUi(jest.fn(), jest.fn());

    // Assert
    expect(act).not.toThrow(TypeError);
  });

  test("it should not throw exception when valid arguments are provided.", () => {
    // Arrange & Act
    getDefaultGameUi();

    // At first, it gets contents inside html tag, then inside body tag
    const body = getBodyFromDocument();
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
    "It should throw exception when invalid arguments are provided.",
    (fn1, fn2) => {
      // Arrange & Act
      const act = () => new GameUi(fn1, fn2);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("Draw end game line", () => {
  test.each(
    getWinningCombinationArrayByOrientation(sequenceOrientationEnum.horizontal)
  )(
    "It should draw horizontal line for given horizontal orientation.",
    (winningCombination) => {
      // Arrange
      const className = ".horizontal-end-game-line";

      const gameUi = getDefaultGameUi();
      // Act
      gameUi.drawEndGameLine(winningCombination);
      const numberOfDiagonalLines = document.querySelectorAll(className).length;

      // Assert
      expect(numberOfDiagonalLines).toBe(1);
    }
  );

  test.each(
    getWinningCombinationArrayByOrientation(sequenceOrientationEnum.vertical)
  )(
    "It should draw vertical line for given vertical orientation.",
    (winningCombination) => {
      // Arrange
      const className = ".vertical-end-game-line";

      const gameUi = getDefaultGameUi();

      // Act
      gameUi.drawEndGameLine(winningCombination);
      const numberOfDiagonalLines = document.querySelectorAll(className).length;

      // Assert
      expect(numberOfDiagonalLines).toBe(1);
    }
  );

  test.each(
    getWinningCombinationArrayByOrientation(sequenceOrientationEnum.diagonal)
  )(
    "It should draw diagonal line for given diagonal orientation.",
    (winningCombination) => {
      // Arrange
      const className = ".diagonal-end-game-line";

      const gameUi = getDefaultGameUi();

      // Act
      gameUi.drawEndGameLine(winningCombination);
      const numberOfDiagonalLines = document.querySelectorAll(className).length;

      // Assert
      expect(numberOfDiagonalLines).toBe(1);
    }
  );

  test.each([null, undefined, ""])(
    "It should throw type error when empty winning combination is provided.",
    (winningCombination) => {
      // Arrange
      const gameUi = getDefaultGameUi();

      // Act
      const act = () => gameUi.drawEndGameLine(winningCombination);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([null, undefined, "", "ops"])(
    "It should throw type error when unknown orientation is provided.",
    (orientation) => {
      // Arrange
      const gameUi = getDefaultGameUi();

      // Act
      const act = () =>
        gameUi.drawEndGameLine({
          orientation: orientation,
          sequence: [1, 2, 3],
        });

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([null, undefined, ""])(
    "It should throw type error when unknown sequence is provided.",
    (sequence) => {
      // Arrange
      const gameUi = getDefaultGameUi();

      // Act
      const act = () =>
        gameUi.drawEndGameLine({
          orientation: sequenceOrientationEnum.horizontal,
          sequence: sequence,
        });

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("Set game info", () => {
  test.each(["abc", 123, 35.2])("It should set text value.", (text) => {
    // Arrange
    const gameUi = getDefaultGameUi();

    // Act
    gameUi.setGameInfo(text);

    const body = getBodyFromDocument();
    const gameInfo = body.getElementsByClassName("game-info")[0];

    // Assert
    expect(gameInfo.textContent).toBe(text.toString());
  });
});

describe("Set game history", () => {
  test("It should set game history.", () => {
    // Arrange
    const gameUi = getDefaultGameUi();
    const newGameHistory = {
      playerOVictories: 2,
      playerXVictories: 3,
      draws: 4,
    };

    // Act
    gameUi.setGameHistory(newGameHistory);

    const body = getBodyFromDocument();
    const gameInfo = body.getElementsByClassName("game-history-display")[0];

    // Assert
    const expectedText = `X Victories: ${newGameHistory.playerXVictories} | O Victories: ${newGameHistory.playerOVictories} | Draws: ${newGameHistory.draws}`;
    expect(gameInfo.textContent).toBe(expectedText);
  });
});

// TODO: improve test to test for symbol remotion.
describe("Clean game board", () => {
  test("It should clean game board.", () => {
    // Arrange
    const gameUi = getDefaultGameUi();
    gameUi.drawEndGameLine({
      orientation: sequenceOrientationEnum.horizontal,
      sequence: [1, 2, 3],
    });

    const body = getBodyFromDocument();

    // Act
    gameUi.cleanGameBoard();

    const horizontalLine = body.getElementsByClassName(
      "horizontal-end-game-line"
    )[0];

    // Assert
    expect(horizontalLine).toBeUndefined();
  });
});

const getDefaultGameUi = () => new GameUi(jest.fn(), jest.fn());

const getBodyFromDocument = () => document.childNodes[1].children[1];

const cleanDocument = () => {
  let child = document.body.firstChild;
  while (child) {
    document.body.removeChild(child);
    child = document.body.firstChild;
  }
};

function getWinningCombinationArrayByOrientation(orientation) {
  return Array.from(
    winningCombinations.filter((w) => w.orientation == orientation)
  );
}
