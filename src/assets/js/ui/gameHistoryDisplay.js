export default class GameHistoryDisplay {
  constructor() {
    this.gameHistoryDisplay = document.createElement("div");
    this.gameHistoryDisplay.classList.add("game-history-display");
  }

  setGameHistory = (newGameHistory) => {
    this.#validateGameHistory(newGameHistory);

    this.gameHistoryDisplay.innerHTML = `X Victories: ${newGameHistory.playerXVictories} | O Victories: ${newGameHistory.playerOVictories} | Draws: ${newGameHistory.draws}`;
  };

  getHtml = () => {
    return this.gameHistoryDisplay;
  };

  #validateGameHistory = (newGameHistory) => {
    if (!newGameHistory)
      throw new TypeError("New game history cannot be empty.");

    // X == null => X === null || X === undefined
    if (
      newGameHistory.playerOVictories == null ||
      newGameHistory.playerXVictories == null ||
      newGameHistory.draws == null
    )
      throw new TypeError(
        "Gme history should not contain null or empty field."
      );

    if (
      !Number.isInteger(newGameHistory.playerOVictories) ||
      !Number.isInteger(newGameHistory.playerXVictories) ||
      !Number.isInteger(newGameHistory.draws)
    )
      throw new TypeError("Game history element should be integers only.");

    if (
      newGameHistory.playerOVictories < 0 ||
      newGameHistory.playerXVictories < 0 ||
      newGameHistory.draws < 0
    )
      throw new TypeError("Game history cannot contain negative count.");
  };
}
