import Game from "../../assets/js/domain/game";
import { getBodyFromDocument } from "../testUtils";
import PlayerTypeSelector from "../../assets/js/ui/playerTypeSelector";

describe("Player selector creation", () => {
  test("It should create correct player selector.", () => {
    // Arrange
    const playerTypeSelector = new PlayerTypeSelector(jest.fn());

    // Act
    const playerTypeSelectorHtml = playerTypeSelector.getHtml();

    // Assert
    expect(playerTypeSelectorHtml.classList).toContain("player-type-selector");
  });

  test.each(["abc", null, undefined, []])(
    "It should only allow functions as parameter.",
    (invalidOnclickHandler) => {
      // Arrange & Act
      const act = () => new PlayerTypeSelector(invalidOnclickHandler);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("Player selector use", () => {
  test("It should change to another player type.", () => {
    // Arrange
    new Game();
    const body = getBodyFromDocument();
    const playerSelector = body.querySelectorAll(".slider")[0];
    const initialPlayerSelectorState = body.querySelectorAll("input")[0]
      .checked;

    // Act
    playerSelector.click();

    // Assert
    const currentPlayerSelectorState = body.querySelectorAll("input")[0]
      .checked;
    expect(currentPlayerSelectorState).not.toBe(initialPlayerSelectorState);
  });
});
