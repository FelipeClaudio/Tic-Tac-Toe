import Player from "./player";
import { winningCombinations } from "../commons/constants/winningCombinations";

export default class AIPlayer extends Player {
  constructor(symbol) {
    super(symbol);
  }

  play = (markedPositions) => {
    const opponentPlays = markedPositions.filter(
      (m) => m.playerId !== this.symbol
    );

    const aiPlays = markedPositions.filter((m) => m.playerId === this.symbol);

    // If two of three element of a winningCombination is marked,
    // it is necessary to place a mark in last position of sequence
    const opponentWinningNextRoundCombinations = this.#GetPlayersWinningCombinationsForNextRound(
      opponentPlays
    );

    let positionToBeMarked = -1;

    // It is necessary to verify if last element was not marked before.
    if (opponentWinningNextRoundCombinations.length > 0) {
      positionToBeMarked = opponentWinningNextRoundCombinations[0].filter(
        (position) =>
          opponentPlays.map((play) => play.position).indexOf(position) < 0 &&
          aiPlays.map((play) => play.position).indexOf(position) < 0
      )[0];
    }

    if (positionToBeMarked === -1) {
      const aiWinningNextRoundCombinations = this.#GetPlayersWinningCombinationsForNextRound(
        aiPlays
      );

      if (aiWinningNextRoundCombinations.length > 0) {
        positionToBeMarked = aiWinningNextRoundCombinations[0].filter(
          (position) =>
            opponentPlays.map((play) => play.position).indexOf(position) < 0 &&
            aiPlays.map((play) => play.position).indexOf(position) < 0
        )[0];
      }
    }

    return positionToBeMarked;
  };

  #GetPlayersWinningCombinationsForNextRound = (playerPlays) => {
    // prettier-ignore
    return winningCombinations
      .filter(
        (combination) =>
          combination.sequence.filter(
            (c) => playerPlays.map(
              play => play.position)
            .includes(c)).length === 2)
      .map((x) => x.sequence);
  };
}
