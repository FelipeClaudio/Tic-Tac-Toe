import GameUi from "./gameUI";
import Player from "./player";
import { sequenceOrientationEnum } from "../enums/sequenceOrientationEnum";

export default class Game {
  constructor() {
    this.gameUi = new GameUi(
      this.handleElementOnClickEvent,
      this.#handleRestartGameEvent
    );

    this.players = [new Player("X"), new Player("O")];

    this.markedPositions = [];

    this.isGameFinished = false;

    this.round = 1;

    this.currentPlayerIndex = Math.round(Math.random());

    this.gameUi.setGameInfo(
      `It is player "${this.players[
        this.currentPlayerIndex
      ].getPlayerSymbol()}" turn`
    );

    this.winningCombinantions = [
      { sequence: [1, 2, 3], orientation: sequenceOrientationEnum.horizontal },
      { sequence: [4, 5, 6], orientation: sequenceOrientationEnum.horizontal },
      { sequence: [7, 8, 9], orientation: sequenceOrientationEnum.horizontal },
      { sequence: [1, 4, 7], orientation: sequenceOrientationEnum.vertical },
      { sequence: [2, 5, 8], orientation: sequenceOrientationEnum.vertical },
      { sequence: [3, 6, 9], orientation: sequenceOrientationEnum.vertical },
      { sequence: [1, 5, 9], orientation: sequenceOrientationEnum.diagonal },
      { sequence: [3, 5, 7], orientation: sequenceOrientationEnum.diagonal },
    ];

    this.winnerCombination = [];

    this.gameHistory = {
      playerXVictories: 0,
      playerOVictories: 0,
      draws: 0,
    };
  }

  #updateStatus = (symbol, position) => {
    this.markedPositions.push({
      playerId: symbol,
      position: Number(position),
    });

    const playerPositions = this.markedPositions
      .filter((p) => p.playerId === symbol)
      .map((p) => p.position);
    const gameHasAWinner = this.#verifyVictoryCondition(playerPositions);
    if (gameHasAWinner) {
      this.gameUi.drawEndGameLine(this.winnerCombination);
      this.gameUi.setGameInfo(`Game over! Player "${symbol}" won!`);

      if (symbol === "X") this.gameHistory.playerXVictories++;
      else this.gameHistory.playerOVictories++;

      this.isGameFinished = true;
    } else if (this.round == 9) {
      this.gameUi.setGameInfo("Draw!");
      this.gameHistory.draws++;

      this.isGameFinished = true;
    } else {
      this.#updateCurrentPlayer();
      this.gameUi.setGameInfo(
        `It is player "${this.players[
          this.currentPlayerIndex
        ].getPlayerSymbol()}" turn`
      );
      this.round++;
    }

    if (this.isGameFinished) {
      this.gameUi.setGameHistory(this.gameHistory);
    }
  };

  #verifyVictoryCondition = (markedPositions) => {
    let gameHasAWinner = false;

    this.winningCombinantions.forEach((combination) => {
      const matchedVictoryCondition = markedPositions.filter((position) =>
        combination.sequence.includes(position)
      );

      // It needs to have all three element to be consider as a victory
      if (matchedVictoryCondition.length === 3) {
        this.winnerCombination = combination;
        gameHasAWinner = true;
      }
    });

    return gameHasAWinner;
  };

  #updateCurrentPlayer = () => {
    if (this.round >= 1) {
      this.currentPlayerIndex = Math.abs(1 - this.currentPlayerIndex);
    }
  };

  #getCurrentPlayer = () => {
    return this.players[this.currentPlayerIndex];
  };

  handleElementOnClickEvent = (element) => {
    if (!this.isGameFinished) {
      const currentPlayer = this.#getCurrentPlayer();
      const symbol = currentPlayer.getPlayerSymbol();

      element.innerHTML = symbol;
      element.classList.add(`player-symbol-${symbol.toLowerCase()}`);

      this.#updateStatus(symbol, element.id);
    }
  };

  #handleRestartGameEvent = () => {
    this.markedPositions = [];
    this.round = 1;
    this.isGameFinished = false;
    this.gameUi.cleanGameBoard();
    this.#updateCurrentPlayer();
    console.log(this.gameHistory);
  };
}
