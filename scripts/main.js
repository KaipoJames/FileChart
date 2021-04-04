import { Node } from "./node.js";
import { nodemon } from "./node-helper.js";
import { StyleWiz } from "./layout.js";
import { DrawWiz } from "./drawing.js";

var canvas = document.querySelector("#canvas");
canvas.height = 400;
canvas.width = 400;
var ctx = canvas.getContext("2d");
const wiz = new DrawWiz();

//Initial Global Arrays
const nodes = [];
const types = [];
const sizeRanges = [];
const modifiedDates = [];

// GLobal Varibales
let selectedChartType = "";
let selectedFiles = "";
let firstColor = "";
let secondColor = "";
let fileNames = {};

let graphDrawn = false;

const app = {
  // Run app.init() to start
  init() {
    this.stylePage();
    this.addSelectOptionListener(this.getSelectElement());
    this.addBtnListener();
    this.listenForChange();
  },

  eraseCanvas(canvas, context) {
    graphDrawn = false;
    app.removeMouseEvents(canvas, ctx);
    context.clearRect(0, 0, canvas.width, canvas.height);
  },

  //Basic Page Styling
  stylePage() {
    const wiz = new StyleWiz();
    wiz.styleBody();
  },
  resetData() {
    modifiedDates.length = 0;
    sizeRanges.length = 0;
    nodes.length = 0;
    types.length = 0;
  },
  createNodes(files) {
    for (let i = 0; i < files.length; i++) {
      const node = new Node(files[i]);
      nodes.push(node);
    }
  },
  getSelectElement() {
    const selectedChartType = document.querySelector("#select-graph-type");
    return selectedChartType;
  },
  getChartType() {
    const selectedChartType = this.getSelectElement();
    return selectedChartType.value;
  },
  addSelectOptionListener(select) {
    if (select) {
      select.addEventListener("change", () => {
        //console.log("NEW SELECTED VALUE: " + select.value);
        app.eraseCanvas(canvas, ctx);
        this.execute(selectedFiles);
      });
    }
  },

  // Get Users' Chosen Colors
  addBtnListener() {
    const colorBtn = document.querySelector("#update-color-btn");
    const colorChoiceElement1 = document.querySelector("#color-theme1");
    const colorChoiceElement2 = document.querySelector("#color-theme2");
    colorChoiceElement1.addEventListener("change", () => {
      firstColor = colorChoiceElement1.value;
      secondColor = colorChoiceElement2.value;
    });
    colorChoiceElement2.addEventListener("change", () => {
      firstColor = colorChoiceElement1.value;
      secondColor = colorChoiceElement2.value;
    });
    colorBtn.addEventListener("click", () => {
      firstColor = colorChoiceElement1.value;
      secondColor = colorChoiceElement2.value;
      app.execute(selectedFiles);
    });
  },

  getColor1() {
    const colorChoiceElement1 = document.querySelector("#color-theme1");
    return colorChoiceElement1.value;
  },
  getColor2() {
    const colorChoiceElement2 = document.querySelector("#color-theme2");
    return colorChoiceElement2.value;
  },

  // Get User's Uploaded Files
  listenForChange() {
    document
      .querySelector("#directory-picker")
      .addEventListener("change", (e) => {
        app.eraseCanvas(canvas, ctx);
        selectedFiles = e.target.files;
        app.execute(selectedFiles);
      });
  },

  execute(selectedFiles) {
    //Reset Data and Canvas
    app.resetData();
    app.eraseCanvas(canvas, ctx);

    // Get User's chocie of Chart Type
    const chartType = app.getChartType();
    app.createNodes(selectedFiles);
    let countsObject = "";
    let fileValues = "";
    firstColor = app.getColor1();
    secondColor = app.getColor2();

    // Set Data To Pass To Chart Object
    if (chartType === "file-size") {
      countsObject = nodemon.getFileSizesCounts(nodes, sizeRanges);
      fileNames = nodemon.getFileNames(nodes, countsObject, "fileSize");
      fileValues = nodemon.getFileSizes(nodes, countsObject);
      //console.log("file-size filenames: " + JSON.stringify(fileNames));
    } else if (chartType === "file-type") {
      countsObject = nodemon.getFileTypesCounts(nodes, types);
      fileNames = nodemon.getFileNames(nodes, countsObject, "fileType");
      fileValues = nodemon.getFileTypes(nodes, countsObject);
    } else {
      countsObject = nodemon.getLastModifiedDatesCounts(nodes, modifiedDates);
      fileNames = nodemon.getFileNames(nodes, countsObject, "modifiedDate");
      fileValues = nodemon.getLastModifiedDates(nodes, countsObject);
    }
    //prettier-ignore
    wiz.renderChart(countsObject, firstColor, secondColor, fileNames, fileValues, graphDrawn);
  },

  removeMouseEvents(canvas, ctx, slices) {
    const body = document.getElementsByTagName("BODY")[0];
    body.removeEventListener("mousemove", (event) => {
      // for (const slice of slices) {
      //   // Check whether point is inside circle
      //   if (ctx.isPointInPath(slice.path, event.offsetX, event.offsetY)) {
      //     canvas.title = `${slice.label} : ${slice.value} Files`;
      //     body.style.cursor = "auto";
      //   }
      // }
    });
    body.removeEventListener("mousedown", (event) => {
      // for (const slice of slices) {
      //   if (ctx.isPointInPath(slice.path, event.offsetX, event.offsetY)) {
      //     createListOfFiles(slice.files, slice.label, slice.fileValues);
      //   }
      // }
    });
  },
};

app.init();
