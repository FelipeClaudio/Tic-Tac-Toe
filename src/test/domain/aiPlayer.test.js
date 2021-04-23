import AIPlayer from "../../assets/js/domain/aiPlayer";
import GameUI from "../../assets/js/UI/gameUI";
import { cleanDocument } from "../testUtils";

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
  beforeEach(() => {
    cleanDocument();
  });

  test.each([
    [{ opponentPlays: [1, 2], aiPlayerPlays: [4, 8], expectedPlay: 3 }],
    [{ opponentPlays: [7, 4], aiPlayerPlays: [3, 8], expectedPlay: 1 }],
  ])(
    "It should not allow player win when only one mark is needed.",
    (playedPositions) => {
      // Arrange
      const handleElementOnClickMock = setDefaultUIWithMockedFunction();
      const gameBoard = setupBoard(
        playedPositions.opponentPlays,
        playedPositions.aiPlayerPlays
      );
      const aiPlayer = new AIPlayer("X");

      // Act
      aiPlayer.play(gameBoard);

      // Act & Assert
      expect(Number(handleElementOnClickMock.mock.calls[0][0].id)).toBe(
        playedPositions.expectedPlay
      );
    }
  );

  test.each([
    [{ opponentPlays: [1, 6], aiPlayerPlays: [2, 5], expectedPlay: 8 }],
    [{ opponentPlays: [8, 4], aiPlayerPlays: [9, 5], expectedPlay: 1 }],
  ])(
    "It should do a game winner move whenever it is possible.",
    (playedPositions) => {
      // Arrange
      const handleElementOnClickMock = setDefaultUIWithMockedFunction();
      const aiPlayer = new AIPlayer("X");
      const gameBoard = setupBoard(
        playedPositions.opponentPlays,
        playedPositions.aiPlayerPlays
      );

      // Act
      aiPlayer.play(gameBoard);

      // Act & Assert
      expect(Number(handleElementOnClickMock.mock.calls[0][0].id)).toBe(
        playedPositions.expectedPlay
      );
    }
  );

  test.each([
    [{ opponentPlays: [1], aiPlayerPlays: [] }],
    [{ opponentPlays: [1, 3], aiPlayerPlays: [2] }],
    [{ opponentPlays: [8], aiPlayerPlays: [9] }],
    [{ opponentPlays: [], aiPlayerPlays: [] }],
  ])(
    "It should do a normal move when no game winner move is available.",
    (playedPositions) => {
      // Arrange
      const handleElementOnClickMock = setDefaultUIWithMockedFunction();
      const aiPlayer = new AIPlayer("X");
      const gameBoard = setupBoard(
        playedPositions.opponentPlays,
        playedPositions.aiPlayerPlays
      );

      // Act
      aiPlayer.play(gameBoard);

      // Assert
      expect(handleElementOnClickMock.mock.calls.length).toBe(1);
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

const setDefaultUIWithMockedFunction = () => {
  const handleElementOnClickMock = jest.fn();
  new GameUI(handleElementOnClickMock, jest.fn(), jest.fn());

  return handleElementOnClickMock;
};
