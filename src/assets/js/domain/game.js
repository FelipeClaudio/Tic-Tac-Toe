import GameUi from "../ui/gameUi";
import Player from "./player";
import AIPlayer from "./aiPlayer";
import { winningCombinations } from "../commons/constants/winningCombinations";

export default class Game {
  constructor() {
    this.gameUi = new GameUi(
      this.#handleElementOnClickEvent,
      this.#handleRestartGameEvent
    );

    this.players = [new AIPlayer("X"), new Player("O")];

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

    this.#setMoveIfIsAnAIPlayer();
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

      if (symbol === "X") {
        this.gameHistory.playerXVictories++;
      } else {
        this.gameHistory.playerOVictories++;
      }

      this.isGameFinished = true;
    } else if (this.round == 9) {
      this.gameUi.setGameInfo("Draw!");
      this.gameHistory.draws++;

      this.isGameFinished = true;
    } else {
      this.#updateCurrentPlayer();

      this.#setMoveIfIsAnAIPlayer();
      this.round++;
    }

    if (this.isGameFinished) {
      this.gameUi.setGameHistory(this.gameHistory);
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
    this.gameUi.setGameInfo(
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
    this.gameUi.cleanGameBoard();
    this.#updateCurrentPlayer();
  };

  #setMoveIfIsAnAIPlayer = () => {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer instanceof AIPlayer) {
      console.log("AI player turn.");
      console.log("currentIndex: ", this.currentPlayerIndex);
      const positionToMark = currentPlayer.play(this.markedPositions);
      console.log("position: ", positionToMark);
      const gameGrid = Array.from(document.querySelectorAll(".game-grid"));
      gameGrid[positionToMark - 1].click();
    }
  };
}
