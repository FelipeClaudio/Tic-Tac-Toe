import GameUI from "../assets/js/ui/gameUI";

const cleanDocument = () => {
  let child = document.body.firstChild;
  while (child) {
    document.body.removeChild(child);
    child = document.body.firstChild;
  }
};

const getBodyFromDocument = () => document.childNodes[1].children[1];

const getDefaultGameUI = () => new GameUI(jest.fn(), jest.fn(), jest.fn());

export { cleanDocument, getBodyFromDocument, getDefaultGameUI };
