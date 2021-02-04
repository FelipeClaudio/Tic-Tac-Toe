import { validPlayerSymbols } from "../constants/symbols";
import { validateString } from "../utils/validators";

export default class Player {
  constructor(symbol) {
    const upperCaseSymbol = symbol?.toUpperCase();

    validateString(upperCaseSymbol, validPlayerSymbols);

    this.symbol = upperCaseSymbol;
  }

  getPlayerSymbol = () => {
    return this.symbol;
  };
}
