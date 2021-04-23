import Player from "../../assets/js/domain/player";

describe("Player creation", () => {
  test.each(["X", "O", "x", "o"])(
    "It should return previously set symbol.",
    (playerSymbol) => {
      // Arrange
      const player = new Player(playerSymbol);

      // Act & Assert
      expect(player.getPlayerSymbol()).toBe(playerSymbol.toUpperCase());
    }
  );

  test.each(["F", "3", "K", "J", null, undefined, ""])(
    "It should not allow symbols different from 'X' and 'O'.",
    (playerSymbol) => {
      // Arrange & Act
      const act = () => new Player(playerSymbol);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});
