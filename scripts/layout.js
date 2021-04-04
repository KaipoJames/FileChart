// Wiz To Do General Styling Of Web Page
export class StyleWiz {
  constructor() {
    this.settings = document.querySelector(".settings");
    this.directoryPicker = document.querySelector("#directory-picker");
    this.body = document.getElementsByTagName("BODY")[0];
    this.drawingArea = document.querySelector("#drawing-area");
    this.canvas = this.drawingArea.children[0];
  }

  performStyling() {
    this.styleBody();
    this.styleDrawingArea(this.drawingArea);
  }

  styleBody() {
    this.body.style.height = "150vh";
    this.body.style.display = "flex";
    this.body.style.flexDirection = "column";
    this.body.style.alignItems = "center";
    this.body.style.justifyContent = "flex-start";
  }

  styleDrawingArea() {
    this.drawingArea.style.width = "80vw";
    this.drawingArea.style.display = "flex";
    this.drawingArea.style.alignItems = "center";
    this.drawingArea.style.justifyContent = "space-evenly";
    this.drawingArea.style.margin = "2rem";
    this.drawingArea.style.padding = "2rem";
    //this.styleCanvas(this.canvas);
  }
}

let boxesToAdd = [];
let x = 0;

// Helper functions to draw file name boxes.
export const createListOfFiles = (files, label, values) => {
  const body = document.getElementsByTagName("BODY")[0];
  const numberOfFiles = files.length;
  const box = document.createElement("div");
  box.classList = "box box" + x;
  x++;
  styleBox(box);
  addCloseBoxBtn(box);
  addText(box, label, files, numberOfFiles, values);

  body.appendChild(box);
};

const getBoxChild = (body) => {
  const children = body.children;
  for (let i = 0; i < children.length; i++) {
    if ((children[i].classList = "box")) {
      return children[i];
    } else {
      return null;
    }
  }
};

const boxAlreadyExists = (body) => {
  const children = body.children;
  for (let i = 0; i < children.length; i++) {
    if ((children[i].classList = "box")) {
      return true;
    } else {
      return false;
    }
  }
};

const styleBox = (box) => {
  box.classList = "box";
  box.style.width = "20rem";
  box.style.height = "auto";
  box.style.background = "#E8E4C9";
  box.style.padding = "1rem";
  box.style.border = "1px solid black";
  box.style.position = "absolute";
  box.style.right = "0";
  box.style.top = "0";
};

// Add close button
const addCloseBoxBtn = (box) => {
  const btn = document.createElement("div");
  btn.innerText = "X";
  btn.textAlign = "center";
  btn.style.color = "black";
  btn.style.width = "1.2rem";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "25px";
  btn.addEventListener("click", () => {
    box.remove();
  });
  box.appendChild(btn);
};

// Fill box with data
const addText = (box, label, files, numberOfFiles, values) => {
  addHeaderText(box, label);
  for (let i = 0; i < numberOfFiles; i++) {
    addFileText(box, files[i], values[i]);
  }
};

const addHeaderText = (box, label) => {
  const header = document.createElement("h2");
  header.innerHTML = "Showing Files for " + label;
  box.appendChild(header);
};

const addFileText = (box, file, value) => {
  const cont = document.createElement("div");

  const fileText = document.createElement("p");
  const fileValueText = document.createElement("p");

  fileText.innerHTML = file;
  fileValueText.innerHTML = value;

  fileText.style.fontSize = "14px";
  fileText.style.width = "70%";
  fileValueText.style.fontSize = "13px";
  fileValueText.style.width = "30%";
  fileValueText.style.marginRight = "1rem";
  cont.style.display = "flex";

  cont.appendChild(fileText);
  cont.appendChild(fileValueText);

  box.appendChild(cont);
};
