export default class RestartButton {
    constructor(handleRestartGameEvent){
        this.restartGameButton = document.createElement('button')
        this.restartGameButton.innerHTML = "Restart Game"
        this.restartGameButton.classList.add('restart-button')
        this.restartGameButton.onclick = handleRestartGameEvent
    }

    getHtml = () => {
        return this.restartGameButton
    }
}