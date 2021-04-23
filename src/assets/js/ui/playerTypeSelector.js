import { validateFunction } from "../commons/utils/validators";

export default class PlayerTypeSelector {
  constructor(onClickEvent) {
    validateFunction(onClickEvent);

    this.input = document.createElement("input");
    this.input.type = "checkbox";

    this.upperText = document.createElement("p");
    this.upperText.innerHTML = "Select second player";
    this.upperText.classList.add("upper-text");

    this.humanTypeSpan = document.createElement("span");
    this.humanTypeSpan.classList.add("human-type");
    this.humanTypeSpan.innerHTML = "Human";

    this.aiTypeSpan = document.createElement("span");
    this.aiTypeSpan.classList.add("ai-type");
    this.aiTypeSpan.innerHTML = "AI";

    this.sliderDiv = document.createElement("div");
    this.sliderDiv.classList.add("slider");
    this.sliderDiv.classList.add("round");
    this.sliderDiv.appendChild(this.humanTypeSpan);
    this.sliderDiv.appendChild(this.aiTypeSpan);

    this.playerTypeSelector = document.createElement("label");
    this.playerTypeSelector.classList.add("player-type-selector");
    this.playerTypeSelector.append(this.upperText);
    this.playerTypeSelector.appendChild(this.input);
    this.playerTypeSelector.appendChild(this.sliderDiv);
    this.playerTypeSelector.onchange = onClickEvent;
  }

  getHtml = () => {
    return this.playerTypeSelector;
  };
}
