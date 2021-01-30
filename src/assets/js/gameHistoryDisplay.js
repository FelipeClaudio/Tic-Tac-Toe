export default class GameHistoryDisplay {
    constructor(handleRestartGameEvent){
        this.gameHistoryDisplay = document.createElement('div')
        this.gameHistoryDisplay.classList.add('game-history-display')
    }

    setGameHistory = (newGameHistory) => {
        this.gameHistoryDisplay.innerHTML = `X Victories: ${newGameHistory.playerXVictories} | O Victories: ${newGameHistory.playerOVictories} | Draws: ${newGameHistory.draws}`
    }

    getHtml = () => {
        return this.gameHistoryDisplay
    }
}