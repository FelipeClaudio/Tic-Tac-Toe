export default class Player {
    constructor(symbol){
        this.symbol = symbol
        this.markedPositions = []
    }

    getPlayerSymbol = () => {
        return this.symbol
    }

    setMarkedPosition = (position) => {
        this.markedPositions.push(position)
    }

    getMarkedPositions = () => {
        return this.markedPositions
    }
}