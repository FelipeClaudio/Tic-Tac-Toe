import AIPlayer from "../../assets/js/domain/aiPlayer";

describe("Player creation", () => {
  test.each(["X", "O", "x", "o"])(
    "It should return previously set symbol.",
    (playerSymbol) => {
      // Arrange
      const aiPlayer = new AIPlayer(playerSymbol);

      // Act & Assert
      expect(aiPlayer.getPlayerSymbol()).toBe(playerSymbol.toUpperCase());
    }
  );

  test.each(["F", "3", "K", "J", null, undefined, ""])(
    "It should not allow symbols different from 'X' and 'O'.",
    (playerSymbol) => {
      // Arrange & Act
      const act = () => new AIPlayer(playerSymbol);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("Play", () => {
  test.each([
    [{ opponentPlays: [1, 2], aiPlayerPlays: [4, 8], expectedPlay: 3 }],
    [{ opponentPlays: [7, 4], aiPlayerPlays: [3, 8], expectedPlay: 1 }],
  ])(
    "It should not allow player win when only one mark is needed.",
    (playedPositions) => {
      // Arrange
      const gameBoard = setupBoard(
        playedPositions.opponentPlays,
        playedPositions.aiPlayerPlays
      );
      const aiPlayer = new AIPlayer("X");

      // Act
      const markedPosition = aiPlayer.play(gameBoard);

      // Act & Assert
      expect(markedPosition).toBe(playedPositions.expectedPlay);
    }
  );

  test.each([
    [{ opponentPlays: [1, 6], aiPlayerPlays: [2, 5], expectedPlay: 8 }],
    [{ opponentPlays: [8, 4], aiPlayerPlays: [9, 5], expectedPlay: 1 }],
  ])(
    "It should do a game winner play whenever is possible.",
    (playedPositions) => {
      // Arrange
      const aiPlayer = new AIPlayer("X");
      const gameBoard = setupBoard(
        playedPositions.opponentPlays,
        playedPositions.aiPlayerPlays
      );

      // Act
      const markedPosition = aiPlayer.play(gameBoard);

      // Act & Assert
      expect(markedPosition).toBe(playedPositions.expectedPlay);
    }
  );
});

const setupBoard = (opponentPlays, aiPlays) => {
  const gameBoard = [];

  opponentPlays.forEach((position) => {
    gameBoard.push({
      playerId: "O",
      position: Number(position),
    });
  });

  aiPlays.forEach((position) => {
    gameBoard.push({
      playerId: "X",
      position: Number(position),
    });
  });

  return gameBoard;
};
