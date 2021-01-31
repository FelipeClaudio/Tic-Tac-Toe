export default class Element {
    constructor(id, handleElementOnClickEvent){
        this.element = document.createElement('div')
        this.element.classList.add('game-grid')
        this.element.id = id
        this.element.innerHTML = id
        this.element.onclick = this.onClickEvent
        this.handleElementOnClickEvent = handleElementOnClickEvent
    }

    getHtml = () => {
        return this.element
    }

    setPlayerMark = (mark) => {
        this.element.innerHTML = mark
    }
    
    onClickEvent = () => {
        this.handleElementOnClickEvent(this.element)
    }
}