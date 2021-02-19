import Footer from "../../assets/js/ui/footer";

describe("Footer creation", () => {
  test("It should create footer.", () => {
    // Arrange
    const footer = new Footer();

    // Act
    const footerHtml = footer.getHtml();

    // Assert
    expect(footerHtml.classList).toContain("footer");
  });
});
