import Player from "../assets/js/player"

describe("Player creation", () => {  
    test.each(["X", "O", "x", "o"])
    ("it should return previously set symbol.", (playerSymbol) => {
        const player = new Player(playerSymbol)

        expect(player.getPlayerSymbol()).toBe(playerSymbol.toUpperCase())
    })
    
    test.each(["F", "3", "K", "J", null, undefined, "", []])
    ("it should not allow symbols different from 'X' and 'O'.", (playerSymbol) => {
        expect(() => {new Player(playerSymbol)}).toThrow(TypeError)
    })
})