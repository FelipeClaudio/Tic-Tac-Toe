export default class Player {
    constructor(symbol){
        const upperCaseSymbol = symbol?.toUpperCase()
        if (this.#IsValidSymbolInput(upperCaseSymbol))
            this.symbol = upperCaseSymbol
    }

    getPlayerSymbol = () => {
        return this.symbol
    }

    #IsValidSymbolInput = (upperCaseSymbol) => {       
        if (upperCaseSymbol !== "X" && upperCaseSymbol !== "O")
            throw new TypeError("Invalid player symbol. It should be either 'X' or 'O'.")

        return true
    } 
}