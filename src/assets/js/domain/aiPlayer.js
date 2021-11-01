import Player from "./player";
import { winningCombinations } from "../commons/constants/winningCombinations";

export default class AIPlayer extends Player {
  constructor(symbol) {
    super(symbol);
  }

  play(gameBoard) {
    const opponentPlays = gameBoard.filter((m) => m.playerId !== this.symbol);

    const aiPlays = gameBoard.filter((m) => m.playerId === this.symbol);

    let positionToBeMarked = -1;

    // Verify if it is possible to win the game with next move.
    const aiWinningNextRoundCombinations =
      this.#GetPossibleCombinationsForNextRound(aiPlays, 2);

    // If it is not possible to win the game with current move,
    // the function below will return -1.
    positionToBeMarked = this.#getNextMove(
      aiWinningNextRoundCombinations,
      opponentPlays,
      aiPlays
    );

    // If two of three element of a winningCombination are marked for opponent,
    // it is necessary to place a mark in the last position need to opponent win the game.
    if (positionToBeMarked === -1) {
      const opponentWinningNextRoundCombinations =
        this.#GetPossibleCombinationsForNextRound(opponentPlays, 2);

      positionToBeMarked = this.#getNextMove(
        opponentWinningNextRoundCombinations,
        opponentPlays,
        aiPlays
      );
    }

    // If it is not possible to win game in next move for both players, selects a position to mark
    while (positionToBeMarked === -1) {
      const nextRoundCombinations = this.#GetPossibleCombinationsForNextRound(
        aiPlays,
        1
      );

      const combination = [];
      if (nextRoundCombinations.length > 0) {
        combination.push(
          nextRoundCombinations[
            Math.round(Math.random() * nextRoundCombinations.length)
          ]
        );
      } else {
        combination.push(
          winningCombinations.map((w) => w.sequence)[
            Math.round(Math.random() * nextRoundCombinations.length)
          ]
        );
      }

      positionToBeMarked = this.#getNextMove(
        combination,
        opponentPlays,
        aiPlays
      );
    }

    const gameGrid = Array.from(document.querySelectorAll(".game-grid"));
    gameGrid[positionToBeMarked - 1].click();
  }

  #GetPossibleCombinationsForNextRound = (
    playerPlays,
    numberOfMarkedPositions
  ) => {
    return winningCombinations
      .filter(
        (combination) =>
          combination.sequence.filter((c) =>
            playerPlays.map((play) => play.position).includes(c)
          ).length === numberOfMarkedPositions
      )
      .map((x) => x.sequence);
  };

  #getNextMove = (playerCombinations, opponentPlays, aiPlays) => {
    let selectedPosition = -1;

    // Selects the first valid position not played by player and AI.
    if (playerCombinations.length > 0 && playerCombinations[0] != null) {
      selectedPosition = playerCombinations[0].filter(
        (position) =>
          opponentPlays.map((play) => play.position).indexOf(position) < 0 &&
          aiPlays.map((play) => play.position).indexOf(position) < 0
      )[0];
    }

    // Returns -1 if it was not possible to select a position to play.
    return selectedPosition || -1;
  };
}
