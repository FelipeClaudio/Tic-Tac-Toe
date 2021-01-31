import Element from "../assets/js/element"

describe("Element creation", () => {  
    test.each(
        [1, 2, 9]
    )
    ("it should create valid element.", (playerId) => {
        const element = new Element(playerId, jest.fn())

        const elementHtml = element.getHtml()
        expect(elementHtml.classList).toContain('game-grid')
    })
    
    // Must add invalid cases
})

describe("On click even handling", () => {
    test("It should call passed function", () => {
        const onClickHandler = jest.fn()
        const element = new Element(1, onClickHandler)
        const elementHtml = element.getHtml();

        elementHtml.click()
        expect(onClickHandler.mock.calls.length).toBe(1)
    })
})

describe("Set player mark", () => {
    test.each(
        ["X", "O", "x", "o", "" ]
    )("It should call passed function", (mark) => {
        const onClickHandler = jest.fn()
        const element = new Element(1, onClickHandler)
        element.setPlayerMark(mark)
        const elementHtml = element.getHtml()

        expect(elementHtml.innerHTML).toBe(mark)
    })
})