export default class RestartButton {
    constructor(handleRestartGameEvent){
        this.#validateIfArgumentIsFunction(handleRestartGameEvent)

        this.restartGameButton = document.createElement('button')
        this.restartGameButton.innerHTML = "Restart Game"
        this.restartGameButton.classList.add('restart-button')
        this.restartGameButton.onclick = handleRestartGameEvent
    }

    getHtml = () => {
        return this.restartGameButton
    }

    #validateIfArgumentIsFunction = (argument) => {       
        if (!argument || {}.toString.call(argument) !== '[object Function]')
            throw new TypeError("Argument should be a function.")

        return true
    } 
}