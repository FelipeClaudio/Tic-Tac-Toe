import { validPlayerSymbols } from "../commons/constants/symbols";
import {
  validateInteger,
  validateFunction,
  validateString,
} from "../commons/utils/validators";

export default class GameGrid {
  constructor(id, handleElementOnClickEvent) {
    validateInteger(id, 0, 9);
    validateFunction(handleElementOnClickEvent);

    this.gameGrid = document.createElement("div");
    this.gameGrid.classList.add("game-grid");
    this.gameGrid.id = id;
    this.gameGrid.onclick = this.onClickEvent;
    this.handleElementOnClickEvent = handleElementOnClickEvent;
  }

  getHtml = () => {
    return this.gameGrid;
  };

  setPlayerMark = (mark) => {
    validateString(mark, validPlayerSymbols, true);

    this.gameGrid.innerHTML = mark;
  };

  onClickEvent = () => {
    this.handleElementOnClickEvent(this.gameGrid);
  };
}
