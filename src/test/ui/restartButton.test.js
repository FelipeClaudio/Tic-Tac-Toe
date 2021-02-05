import RestartButton from "../../assets/js/ui/restartButton";

describe("Restart button creation creation", () => {
  test("It should create correct button", () => {
    // Arrange
    const restartButton = new RestartButton(jest.fn());

    // Act
    const restartButtonHtml = restartButton.getHtml();

    // Assert
    expect(restartButtonHtml.classList).toContain("restart-button");
  });

  test.each(["abc", null, undefined, []])(
    "it should only allow functions as parameter'.",
    (invalidOnclickHandler) => {
      // Arrange & Act
      const act = () => new RestartButton(invalidOnclickHandler);

      // Assert
      expect(act).toThrow(TypeError);
    }
  );
});

describe("On click even handling", () => {
  test("It should call passed function", () => {
    // Arrange
    const onClickHandler = jest.fn();
    const restartButton = new RestartButton(onClickHandler);
    const restartButtonHtml = restartButton.getHtml();

    // Act
    restartButtonHtml.click();

    // Assert
    expect(onClickHandler.mock.calls.length).toBe(1);
  });
});
