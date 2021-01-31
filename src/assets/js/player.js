export default class Player {
    constructor(symbol){
        const upperCaseSymbol = symbol?.toUpperCase()
        
        this.#ValidateSymbolInput(upperCaseSymbol)

        this.symbol = upperCaseSymbol
    }

    getPlayerSymbol = () => {
        return this.symbol
    }

    #ValidateSymbolInput = (upperCaseSymbol) => {       
        if (upperCaseSymbol !== "X" && upperCaseSymbol !== "O")
            throw new TypeError("Invalid player symbol. It should be either 'X' or 'O'.")

        return true
    } 
}