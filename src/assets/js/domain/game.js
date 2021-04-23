import GameUI from "../ui/gameUI";
import Player from "./player";
import AIPlayer from "./aiPlayer";
import { winningCombinations } from "../commons/constants/winningCombinations";

export default class Game {
  constructor() {
    this.gameUI = new GameUI(
      this.#handleElementOnClickEvent,
      this.#handleRestartGameEvent,
      this.#handlePlayerTypeChangeEvent
    );
    this.players = [new Player("O"), new Player("X")];
    this.markedPositions = [];
    this.isGameFinished = false;
    this.round = 1;
    this.currentPlayerIndex = Math.round(Math.random());
    this.winnerCombination = [];
    this.gameHistory = {
      playerXVictories: 0,
      playerOVictories: 0,
      draws: 0,
    };
    this.#updateCurrentPlayer();
    this.#getCurrentPlayer().play(this.markedPositions);
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
      this.gameUI.drawEndGameLine(this.winnerCombination);
      this.gameUI.setGameInfo(`Game over! Player "${symbol}" won!`);

      this.#addVictoryToPlayerHistory(symbol);

      this.isGameFinished = true;
    } else if (this.round === 9) {
      this.gameUI.setGameInfo("Draw!");
      this.gameHistory.draws++;

      this.isGameFinished = true;
    } else {
      this.round++;
      this.#updateCurrentPlayer();
      this.#getCurrentPlayer().play(this.markedPositions);
    }

    if (this.isGameFinished) {
      this.gameUI.setGameHistory(this.gameHistory);
    }
  };

  #verifyVictoryCondition = (markedPositions) => {
    let gameHasAWinner = false;

    winningCombinations.forEach((combination) => {
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
    this.currentPlayerIndex = Math.abs(1 - this.currentPlayerIndex);
    this.gameUI.setGameInfo(
      `It is player "${this.players[
        this.currentPlayerIndex
      ].getPlayerSymbol()}" turn`
    );
  };

  #getCurrentPlayer = () => {
    return this.players[this.currentPlayerIndex];
  };

  #handleElementOnClickEvent = (element) => {
    if (!this.isGameFinished && element.innerHTML === "") {
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
    this.gameUI.cleanGameBoard();
    this.#updateCurrentPlayer();
    this.#getCurrentPlayer().play(this.markedPositions);
  };

  #addVictoryToPlayerHistory = (symbol) => {
    symbol === "X"
      ? this.gameHistory.playerXVictories++
      : this.gameHistory.playerOVictories++;
  };

  #handlePlayerTypeChangeEvent = () => {
    const secondPlayer = this.players[1];
    this.players.pop();
    this.players.push(
      secondPlayer instanceof AIPlayer ? new Player("X") : new AIPlayer("X")
    );

    this.gameHistory.playerXVictories = 0;
    this.gameHistory.playerOVictories = 0;
    this.gameHistory.draws = 0;
    this.#handleRestartGameEvent();
  };
}
