import Game from "../../assets/js/domain/game";
import { cleanDocument, getBodyFromDocument } from "../testUtils";

beforeEach(() => {
  cleanDocument();
  new Game();
});

describe("Game play", () => {
  test("It should set one player mark correctly.", () => {
    // Arrange
    const body = getBodyFromDocument();
    const element = body.querySelectorAll(".game-grid")[0];

    // Act
    element.click();
    const symbol = element.innerHTML;

    // Assert
    expect(element.className).toContain(
      `player-symbol-${symbol.toLowerCase()}`
    );
  });

  test("It should set player mark for both players correctly.", () => {
    // Arrange
    const body = getBodyFromDocument();
    const elements = body.querySelectorAll(".game-grid");

    let firstSymbol = "";
    let firstSymbolCount = 0;
    let secondSymbol = "";
    let secondSymbolCount = 0;

    /*
        | O | X | O |
        | O | X | O |
        | X |   |   |
    */
    const positionsPlayed = [0, 1, 2, 4, 3, 6, 5];

    // Act
    for (let index = 0; index < positionsPlayed.length; index++) {
      elements[positionsPlayed[index]].click();

      if (!(index % 2)) {
        firstSymbol = firstSymbol || elements[index].innerHTML;
        firstSymbolCount++;
      } else {
        secondSymbol = secondSymbol || elements[index].innerHTML;
        secondSymbolCount++;
      }
    }

    const firstSymbolClass = `player-symbol-${firstSymbol.toLowerCase()}`;
    const firstSymbolDrawnCount = getElementCountByClassName(
      elements,
      firstSymbolClass
    );

    const secondSymbolClass = `player-symbol-${secondSymbol.toLowerCase()}`;
    const secondSymbolDrawnCount = getElementCountByClassName(
      elements,
      secondSymbolClass
    );

    // Assert
    expect(firstSymbolDrawnCount).toBe(firstSymbolCount);
    expect(secondSymbolDrawnCount).toBe(secondSymbolCount);
  });

  test("It should display draw when no player wins the game.", () => {
    // Arrange
    const body = getBodyFromDocument();
    const elements = body.querySelectorAll(".game-grid");
    /*
        | O | X | O |
        | O | X | O |
        | X | O | X |
    */
    const positionsPlayed = [0, 1, 2, 4, 3, 6, 5, 8, 7];

    // Act
    for (let index = 0; index < positionsPlayed.length; index++) {
      elements[positionsPlayed[index]].click();
    }

    // Assert
    const expectedText = "X Victories: 0 | O Victories: 0 | Draws: 1";
    expect(body.querySelectorAll(".game-history-display")[0].innerHTML).toBe(
      expectedText
    );
  });

  test.each([
    /*
        | O | X | O |
        | O | X | X |
        | O |   |   |
    */
    { array: [0, 1, 2, 4, 3, 5, 6] },

    /*
        | O | X | O |
        | X | X | X |
        | O | O |   |
    */
    { array: [0, 1, 2, 3, 6, 4, 7, 5] },
  ])(
    "It should display player victory when player wins the game.",
    (positionsPlayedObject) => {
      // Arrange
      const positionsPlayed = positionsPlayedObject.array;
      const body = getBodyFromDocument();
      const elements = body.querySelectorAll(".game-grid");

      // Act
      for (let index = 0; index < positionsPlayed.length; index++) {
        elements[positionsPlayed[index]].click();
      }

      // Assert
      // Gets drawn played symbol
      const expectedText = `${
        elements[positionsPlayed[positionsPlayed.length - 1]].innerHTML
      } Victories: 1`;
      expect(
        body.querySelectorAll(".game-history-display")[0].innerHTML
      ).toContain(expectedText);
    }
  );

  test.each([
    /*
        | O | X | O |
        | O | X | X |
        | O |   |   |
    */
    { array: [0, 1, 2, 4, 3, 5, 6] },

    /*
        | O | X | O |
        | X | X | X |
        | O | O |   |
    */
    { array: [0, 1, 2, 3, 6, 4, 7, 5] },
  ])(
    "It should not add more symbols after the game is finished.",
    (positionsPlayedObject) => {
      // Arrange
      const positionsPlayed = positionsPlayedObject.array;
      const body = getBodyFromDocument();
      const elements = body.querySelectorAll(".game-grid");

      // Act
      for (let index = 0; index < positionsPlayed.length; index++) {
        elements[positionsPlayed[index]].click();
      }

      elements[8].click();

      // Assert
      const xSymbolCount = getElementCountByClassName(
        elements,
        "player-symbol-x"
      );
      const oSymbolCount = getElementCountByClassName(
        elements,
        "player-symbol-o"
      );

      expect(xSymbolCount + oSymbolCount).toBe(positionsPlayed.length);
    }
  );

  test("It should not change symbol when element is clicked twice.", () => {
    // Arrange
    const body = getBodyFromDocument();
    const element = body.querySelectorAll(".game-grid")[0];

    // Act
    element.click();
    const symbol = element.innerHTML;

    element.click();
    const newSymbol = element.innerHTML;

    // Assert
    expect(newSymbol).toBe(symbol);
  });

  test("It should clean game board when restart button is pressed but must keep game history.", () => {
    // Arrange
    const body = getBodyFromDocument();
    const elements = body.querySelectorAll(".game-grid");

    const positionsPlayed = [0, 1, 2, 4, 3, 6, 5, 8, 7];
    for (let index = 0; index < positionsPlayed.length; index++) {
      elements[positionsPlayed[index]].click();
    }

    const restartGameButton = body.querySelectorAll(".restart-button")[0];

    // Act
    restartGameButton.click();

    const xSymbolCount = getElementCountByClassName(
      elements,
      "player-symbol-x"
    );
    const oSymbolCount = getElementCountByClassName(
      elements,
      "player-symbol-o"
    );

    // Assert
    const expectedText = "X Victories: 0 | O Victories: 0 | Draws: 1";
    expect(body.querySelectorAll(".game-history-display")[0].innerHTML).toBe(
      expectedText
    );
    expect(xSymbolCount).toBe(0);
    expect(oSymbolCount).toBe(0);
  });
});

const getElementCountByClassName = (elements, firstSymbolClass) => {
  return Array.from(elements).filter((x) =>
    x.className.includes(firstSymbolClass)
  ).length;
};
