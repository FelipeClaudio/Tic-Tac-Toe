const sequenceOrientationEnum = Object.freeze({"horizontal":1, "vertical":2, "diagonal":3})

class Game {
    constructor(){
        this.gameUi = new GameUi()
        
        this.players = [new Player("X"), new Player("O")]

        this.isGameFinished = false

        this.round = 1

        this.currentPlayerIndex = Math.round(Math.random())

        this.gameUi.setGameInfo(`É a vez do player "${this.players[this.currentPlayerIndex].getPlayerSymbol()}"`)

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
        // this.gameUi.createVerticalLine(1)
        // this.gameUi.createVerticalLine(2)
        // this.gameUi.createVerticalLine(3)

        // this.gameUi.createHorizontalLine(1)
        // this.gameUi.createHorizontalLine(4)
        // this.gameUi.createHorizontalLine(7)

        // this.gameUi.createDiagonalLine(1)
        // this.gameUi.createDiagonalLine(3)
    }

    updateStatus = (symbol, position) =>{
        const lastPlayer = this.players.filter(player => player.getPlayerSymbol() == symbol)[0]
        
        lastPlayer.setMarkedPosition(Number(position))
        const gameHasAWinner = this.verifyVictoryCondition(lastPlayer.getMarkedPositions())
        if (gameHasAWinner){
            this.gameUi.drawEndGameLine(this.winnerCombination)
            this.gameUi.setGameInfo(`Fim de Jogo! O player "${symbol}" é o vencedor`)
        }
        else if (this.round == 9){
            this.gameUi.setGameInfo("Empate!")
        }
        else{
            this.updateCurrentPlayer()
            this.gameUi.setGameInfo(`É a vez do player "${this.players[this.currentPlayerIndex].getPlayerSymbol()}"`)
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

    updateCurrentPlayer = () =>{
        if (this.round >= 1){
            this.currentPlayerIndex = Math.abs(1 - this.currentPlayerIndex)
            this.players[this.currentPlayerIndex]
        }
    }

    getCurrentPlayer = () => {
        return this.players[this.currentPlayerIndex]
    }
}

class Player {
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

class Element {
    constructor(id){
        this.element = document.createElement('div')
        this.element.classList.add('game-grid')
        this.element.id = id
        this.element.innerHTML = id
        this.element.onclick = this.onClickEvent
    }

    getHTML = () => {
        return this.element
    }

    setPlayerMark = (mark) => {
        this.element.innerHTML = mark
    }
    
    onClickEvent = () => {
        const currentPlayer = game.getCurrentPlayer()
        const symbol = currentPlayer.getPlayerSymbol()

        this.element.innerHTML = symbol
        this.element.classList.add(`player-symbol-${symbol.toLowerCase()}`)

        game.updateStatus(symbol, this.element.id)  
    }
}

class GameUi {
    constructor(){
        this.gameInfo = document.createElement('div')
        this.gameInfo.classList.add('game-info')
        
        this.gridContainer = document.createElement('div')
        this.gridContainer.classList.add('game-grid-container')

        for (let index = 0; index < 9; index++) {
            const element = new Element(index + 1)

            element.setPlayerMark("")
            this.gridContainer.appendChild(element.getHTML())
        }

        document.body.appendChild(this.gameInfo)
        document.body.appendChild(this.gridContainer)
    }

    drawEndGameLine = (winningCombination) => {
        const firstElement = winningCombination.sequence[0]

        switch (winningCombination.orientation) {
            case sequenceOrientationEnum.horizontal:
                this.createHorizontalLine(firstElement)
                break;          
            case sequenceOrientationEnum.vertical:
                this.createVerticalLine(firstElement)
            case sequenceOrientationEnum.diagonal:
                this.createDiagonalLine(firstElement)
            default:
                break;
        }
    }

    createVerticalLine = (columnId) =>{
        const line = document.createElement('div')
        line.classList.add('vertical-end-game-line')
        line.style.left = `${(columnId - 1) * 200 + 110}px`

        this.gridContainer.appendChild(line)
    }

    createHorizontalLine = (rowId) => {
        // Row first elements can be 1, 4 and 7
        const newRowId = 1 + Math.floor(rowId / 3)

        const line = document.createElement('hr')
        line.classList.add('horizontal-end-game-line')
        line.style.top = `${(newRowId - 1) * 200 + 135}px`

        this.gridContainer.appendChild(line)
    }

    createDiagonalLine = (firstElement) => {
        const line = document.createElement('div')
        line.classList.add('diagonal-end-game-line')

        // doesn't starts in left top corner
        if (firstElement !== 1){
            line.style.transform = 'rotate(-45deg)'
            line.style.transformOrigin = '715px 300px'
        }

        this.gridContainer.appendChild(line)
    }

    setGameInfo = (text) => {
        this.gameInfo.innerHTML = text
    }
}

const game = new Game()