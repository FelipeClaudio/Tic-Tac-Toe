export default class Footer {
  constructor() {
    this.footer = document.createElement("div");
    this.footer.classList.add("footer");
    this.footer.innerHTML = `© ${new Date().getFullYear()} Felipe Santos. <a href="https://github.com/FelipeClaudio/Tic-Tac-Toe">See on github</a>`;
  }

  getHtml = () => {
    return this.footer;
  };
}
