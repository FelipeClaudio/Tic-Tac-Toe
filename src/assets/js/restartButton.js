export default class RestartButton {
    constructor(handleRestartGameEvent){
        if(this.#IsFunction(handleRestartGameEvent)){
            this.restartGameButton = document.createElement('button')
            this.restartGameButton.innerHTML = "Restart Game"
            this.restartGameButton.classList.add('restart-button')
            this.restartGameButton.onclick = handleRestartGameEvent
        } 
    }

    getHtml = () => {
        return this.restartGameButton
    }

    #IsFunction = (argument) => {       
        if (!argument || {}.toString.call(argument) !== '[object Function]')
            throw new TypeError("Argument should be a function.")

        return true
    } 
}