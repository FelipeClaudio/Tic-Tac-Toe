import GameUi from "./gameUI";
import Player from "./player";
import { sequenceOrientationEnum } from "./sequenceOrientationEnum";

export default class Game {
    constructor(){
        this.gameUi = new GameUi(this.handleElementOnClickEvent)
        
        this.players = [new Player("X"), new Player("O")]

        this.isGameFinished = false

        this.round = 1

        this.currentPlayerIndex = Math.round(Math.random())

        this.gameUi.setGameInfo(`It is player "${this.players[this.currentPlayerIndex].getPlayerSymbol()}" turn`)

        this.winningCombinantions = [
            {sequence: [1, 2, 3], orientation: sequenceOrientationEnum.horizontal},
            {sequence: [4, 5, 6], orientation: sequenceOrientationEnum.horizontal},
            {sequence: [7, 8, 9], orientation: sequenceOrientationEnum.horizontal},
            {sequence: [1, 4, 7], orientation: sequenceOrientationEnum.vertical},
            {sequence: [2, 5, 8], orientation: sequenceOrientationEnum.vertical},
            {sequence: [3, 6, 9], orientation: sequenceOrientationEnum.vertical},
            {sequence: [1, 5, 9], orientation: sequenceOrientationEnum.diagonal},
            {sequence: [3, 5, 7], orientation: sequenceOrientationEnum.diagonal},
        ]

        this.winnerCombination = []
    }

    updateStatus = (symbol, position) => {
        const lastPlayer = this.players.filter(player => player.getPlayerSymbol() == symbol)[0]
        
        lastPlayer.setMarkedPosition(Number(position))
        const gameHasAWinner = this.verifyVictoryCondition(lastPlayer.getMarkedPositions())
        if (gameHasAWinner){
            this.gameUi.drawEndGameLine(this.winnerCombination)
            this.gameUi.setGameInfo(`Game over! Player "${symbol}" won!`)
        }
        else if (this.round == 9){
            this.gameUi.setGameInfo("Draw!")
        }
        else{
            this.updateCurrentPlayer()
            this.gameUi.setGameInfo(`It is player "${this.players[this.currentPlayerIndex].getPlayerSymbol()}" turn`)
            this.round++
        }
    }

    verifyVictoryCondition = (markedPositions) => {
        let gameHasAWinner = false

        this.winningCombinantions.forEach(combination => {
            const matchedVictoryCondition = markedPositions.filter(position => combination.sequence.includes(position))
            
            // It needs to have all three element to consider a victory
            if (matchedVictoryCondition.length === 3){
                this.winnerCombination = combination
                gameHasAWinner = true
            }
        }); 
   
        return gameHasAWinner
    }

    updateCurrentPlayer = () => {
        if (this.round >= 1){
            this.currentPlayerIndex = Math.abs(1 - this.currentPlayerIndex)
            this.players[this.currentPlayerIndex]
        }
    }

    getCurrentPlayer = () => {
        return this.players[this.currentPlayerIndex]
    }

    handleElementOnClickEvent = (element) => {
        const currentPlayer = this.getCurrentPlayer()
        const symbol = currentPlayer.getPlayerSymbol()

        element.innerHTML = symbol
        element.classList.add(`player-symbol-${symbol.toLowerCase()}`)

        this.updateStatus(symbol, element.id)  
    }
}