import RestartButton from "../assets/js/restartButton"

describe("Restart button creation creation", () => {
    test("It should create correct button", () => {
        const restartButton = new RestartButton(jest.fn())

        const restartButtonHtml = restartButton.getHtml()
        expect(restartButtonHtml.classList).toContain("restart-button")
    })

    test.each(["abc",null, undefined, []])
    ("it should only allow functions as parameter'.", (invalidOnclickHandler) => {
        expect(() => {new RestartButton(invalidOnclickHandler)}).toThrow(TypeError)
    })
})

describe("OnClick even handling", () => {
    test("It should call passed function", () => {
        const onClickHandler = jest.fn()
        const restartButton = new RestartButton(onClickHandler)
        const restartButtonHtml = restartButton.getHtml();

        restartButtonHtml.click()
        expect(onClickHandler.mock.calls.length).toBe(1)
    })
})