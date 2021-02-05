import GameHistoryDisplay from "../../assets/js/ui/gameHistoryDisplay";

describe("Game History Display creation", () => {
  test("it should return previously set symbol.", () => {
    // Arrange
    const gameHistoryDisplay = new GameHistoryDisplay();

    // Act
    const gameHistoryDisplayHtml = gameHistoryDisplay.getHtml();

    // Act & Assert
    expect(gameHistoryDisplayHtml.classList).toContain("game-history-display");
  });
});

describe("Set Game History", () => {
  test.each([
    [0, 0, 0],
    [1, 1, 1],
    [3, 5, 6],
  ])(
    "It should set game history correctly when valid game history is provided.",
    (playerOVictories, playerXVictories, draws) => {
      // Arrange
      const gameHistoryDisplay = new GameHistoryDisplay();

      const gameHistory = {
        playerOVictories,
        playerXVictories,
        draws,
      };
      const expectedText = getExpectedText(gameHistory);

      // Act
      gameHistoryDisplay.setGameHistory(gameHistory);
      const gameHistoryDisplayHtml = gameHistoryDisplay.getHtml();

      // Assert
      expect(gameHistoryDisplayHtml.innerHTML).toBe(expectedText);
    }
  );

  test.each([null, undefined])(
    "It should throw exception when null or undefined game history is provided.",
    (gameHistory) => {
      // Arrange
      const gameHistoryDisplay = new GameHistoryDisplay();

      // Act
      const act = () => gameHistoryDisplay.setGameHistory(gameHistory);

      // Act
      expect(act).toThrow(TypeError);
    }
  );

  test.each([
    [null, 0, 0],
    [1, undefined, 1],
    [3, 5, null],
  ])(
    "It should throw exception when trying to set game history with null or empty field.",
    (playerOVictories, playerXVictories, draws) => {
      // Arrange
      const gameHistoryDisplay = new GameHistoryDisplay();

      const gameHistory = {
        playerOVictories,
        playerXVictories,
        draws,
      };

      // Act
      const act = () => gameHistoryDisplay.setGameHistory(gameHistory);

      // Act
      expect(act).toThrow(TypeError);
    }
  );

  test.each([
    ["", 0, 0],
    [1, [], 1],
    [3, 5, false],
  ])(
    "It should throw exception when trying to set game history with non integer fields.",
    (playerOVictories, playerXVictories, draws) => {
      // Arrange
      const gameHistoryDisplay = new GameHistoryDisplay();

      const gameHistory = {
        playerOVictories,
        playerXVictories,
        draws,
      };

      // Act
      const act = () => gameHistoryDisplay.setGameHistory(gameHistory);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );

  test.each([
    [-1, 0, 0],
    [1, -5, 1],
    [3, 5, -9],
  ])(
    "It should throw exception when trying to set game history with negative integer fields.",
    (playerOVictories, playerXVictories, draws) => {
      // Arrange
      const gameHistoryDisplay = new GameHistoryDisplay();

      const gameHistory = {
        playerOVictories,
        playerXVictories,
        draws,
      };

      // Act
      const act = () => gameHistoryDisplay.setGameHistory(gameHistory);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

const getExpectedText = (gameHistory) => {
  return `X Victories: ${gameHistory.playerXVictories} | O Victories: ${gameHistory.playerOVictories} | Draws: ${gameHistory.draws}`;
};
