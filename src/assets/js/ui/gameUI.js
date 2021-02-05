import Element from "./element";
import GameHistoryDisplay from "./gameHistoryDisplay";
import RestartButton from "./restartButton";
import { sequenceOrientationEnum } from "../commons/enums/sequenceOrientationEnum";
import { validateFunction } from "../commons/utils/validators";

export default class GameUi {
  constructor(handleElementOnClickEvent, handleRestartGameEvent) {
    validateFunction(handleElementOnClickEvent);
    validateFunction(handleRestartGameEvent);

    this.gameInfo = document.createElement("div");
    this.gameInfo.classList.add("game-info");

    this.gridContainer = document.createElement("div");
    this.gridContainer.classList.add("game-grid-container");

    this.handleElementOnClickEvent = handleElementOnClickEvent;

    for (let index = 0; index < 9; index++) {
      const element = new Element(index + 1, this.handleElementOnClickEvent);

      this.gridContainer.appendChild(element.getHtml());
    }

    this.restartGameButton = new RestartButton(handleRestartGameEvent);

    this.gameHistoryDisplay = new GameHistoryDisplay();
    this.gameHistoryDisplay.setGameHistory({
      playerXVictories: 0,
      playerOVictories: 0,
      draws: 0,
    });

    document.body.appendChild(this.gameInfo);
    document.body.appendChild(this.gridContainer);
    document.body.appendChild(this.gameHistoryDisplay.getHtml());
    document.body.appendChild(this.restartGameButton.getHtml());
  }

  drawEndGameLine = (winningCombination) => {
    const firstElement = winningCombination.sequence[0];

    switch (winningCombination.orientation) {
      case sequenceOrientationEnum.horizontal:
        this.#createHorizontalLine(firstElement);
        break;
      case sequenceOrientationEnum.vertical:
        this.#createVerticalLine(firstElement);
        break;
      case sequenceOrientationEnum.diagonal:
        this.#createDiagonalLine(firstElement);
        break;
      default:
        break;
    }
  };

  #createVerticalLine = (columnId) => {
    const line = document.createElement("div");
    line.classList.add("vertical-end-game-line");
    line.style.left = `${(columnId - 1) * 200 + 110}px`;

    this.gridContainer.appendChild(line);
  };

  #createHorizontalLine = (rowId) => {
    // Row first elements can be 1, 4 and 7
    const newRowId = 1 + Math.floor(rowId / 3);

    const line = document.createElement("hr");
    line.classList.add("horizontal-end-game-line");
    line.style.top = `${(newRowId - 1) * 200 + 135}px`;

    this.gridContainer.appendChild(line);
  };

  #createDiagonalLine = (firstElement) => {
    const line = document.createElement("div");
    line.classList.add("diagonal-end-game-line");

    // doesn't starts in left top corner
    if (firstElement !== 1) {
      line.style.transform = "rotate(-45deg)";
      line.style.transformOrigin = "715px 300px";
    }

    this.gridContainer.appendChild(line);
  };

  setGameInfo = (text) => {
    this.gameInfo.innerHTML = text;
  };

  cleanGameBoard = () => {
    this.#removeSymbolFromBoard("x");
    this.#removeSymbolFromBoard("o");
    this.#removeLineOrientationFromBoard("vertical");
    this.#removeLineOrientationFromBoard("horizontal");
    this.#removeLineOrientationFromBoard("diagonal");
  };

  setGameHistory = (newGameHistory) => {
    this.gameHistoryDisplay.setGameHistory(newGameHistory);
  };

  #removeSymbolFromBoard = (symbol) => {
    const playerSymbolClass = `player-symbol-${symbol.toLowerCase()}`;
    console.log("playerSymbolClass: ", playerSymbolClass);
    const playerMarks = Array.from(
      document.getElementsByClassName(playerSymbolClass)
    );
    playerMarks.forEach((p) => {
      p.classList.remove(playerSymbolClass);
      p.textContent = "";
    });
  };

  #removeLineOrientationFromBoard = (lineOrientation) => {
    const lineClass = `${lineOrientation}-end-game-line`;
    Array.from(document.getElementsByClassName(lineClass)).forEach((x) =>
      x.classList.remove(lineClass)
    );
  };
}
