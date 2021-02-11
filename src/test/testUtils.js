const cleanDocument = () => {
  let child = document.body.firstChild;
  while (child) {
    document.body.removeChild(child);
    child = document.body.firstChild;
  }
};

const getBodyFromDocument = () => document.childNodes[1].children[1];

export { cleanDocument, getBodyFromDocument };
