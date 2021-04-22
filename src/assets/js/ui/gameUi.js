import Element from "./element";
import GameHistoryDisplay from "./gameHistoryDisplay";
import RestartButton from "./restartButton";
import Footer from "./footer";
import { sequenceOrientationEnum } from "../commons/enums/sequenceOrientationEnum";
import { validateFunction } from "../commons/utils/validators";
import PlayerTypeSelector from "./playerTypeSelector";

export default class GameUi {
  constructor(
    handleElementOnClickEvent,
    handleRestartGameEvent,
    handlePlayerTypeChangeEvent
  ) {
    validateFunction(handleElementOnClickEvent);
    validateFunction(handleRestartGameEvent);
    validateFunction(handlePlayerTypeChangeEvent);

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

    this.playerTypeSelector = new PlayerTypeSelector(
      handlePlayerTypeChangeEvent
    );

    this.footer = new Footer();

    document.body.appendChild(this.gameInfo);
    document.body.appendChild(this.gridContainer);
    document.body.appendChild(this.gameHistoryDisplay.getHtml());
    document.body.appendChild(this.restartGameButton.getHtml());
    document.body.appendChild(this.playerTypeSelector.getHtml());
    document.body.appendChild(this.footer.getHtml());
  }

  drawEndGameLine = (winningCombination) => {
    const firstElement = winningCombination.sequence[0];

    if (
      !winningCombination ||
      !winningCombination.orientation ||
      !winningCombination.sequence
    ) {
      throw new TypeError(
        "Winning combination should have a valid associated orientation and sequence."
      );
    }

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
        throw new TypeError("Invalid orientation for winning game.");
    }
  };

  #createHorizontalLine = (rowId) => {
    // Row first elements can be 1, 4 and 7
    const newRowId = 1 + Math.floor(rowId / 3);

    const line = document.createElement("hr");
    line.classList.add("horizontal-end-game-line");
    line.style.top = `${(newRowId - 1) * 200 + 135}px`;

    this.gridContainer.appendChild(line);
  };

  #createVerticalLine = (columnId) => {
    const line = document.createElement("div");
    line.classList.add("vertical-end-game-line");
    line.style.left = `${(columnId - 1) * 200 + 110}px`;

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

  setGameHistory = (newGameHistory) => {
    this.gameHistoryDisplay.setGameHistory(newGameHistory);
  };

  cleanGameBoard = () => {
    this.#removeSymbolFromBoard("x");
    this.#removeSymbolFromBoard("o");
    this.#removeLineOrientationFromBoard("vertical");
    this.#removeLineOrientationFromBoard("horizontal");
    this.#removeLineOrientationFromBoard("diagonal");
    // Fixes bug that changed end of board alignment.
    this.#removeTagFromBoard("hr");
  };

  #removeSymbolFromBoard = (symbol) => {
    const playerSymbolClass = `player-symbol-${symbol.toLowerCase()}`;

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

  #removeTagFromBoard = (tagName) => {
    const element = document.getElementsByTagName(tagName);
    console.log(element);
    Array.from(element).forEach((child) => {
      this.gridContainer.removeChild(child);
    });
  };
}
