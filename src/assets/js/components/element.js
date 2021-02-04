import { validPlayerSymbols } from "../constants/symbols";
import {
  validateInteger,
  validateFunction,
  validateString,
} from "../utils/validators";

export default class Element {
  constructor(id, handleElementOnClickEvent) {
    validateInteger(id, 0, 9);
    validateFunction(handleElementOnClickEvent);

    this.element = document.createElement("div");
    this.element.classList.add("game-grid");
    this.element.id = id;
    this.element.innerHTML = id;
    this.element.onclick = this.onClickEvent;
    this.handleElementOnClickEvent = handleElementOnClickEvent;
  }

  getHtml = () => {
    return this.element;
  };

  setPlayerMark = (mark) => {
    validateString(mark, validPlayerSymbols, true);

    this.element.innerHTML = mark;
  };

  onClickEvent = () => {
    this.handleElementOnClickEvent(this.element);
  };
}
