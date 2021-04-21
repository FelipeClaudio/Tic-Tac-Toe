import { validPlayerSymbols } from "../commons/constants/symbols";
import { validateString } from "../commons/utils/validators";

export default class Player {
  constructor(symbol) {
    const upperCaseSymbol = symbol?.toUpperCase();

    validateString(upperCaseSymbol, validPlayerSymbols);

    this.symbol = upperCaseSymbol;
  }

  getPlayerSymbol = () => {
    return this.symbol;
  };

  play = () => {};
}
