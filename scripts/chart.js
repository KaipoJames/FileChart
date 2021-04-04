import { PieSlice } from "./pie_slice.js";
import { createListOfFiles } from "./layout.js";

export var Chart = function (options) {
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  this.files = options.files;
  this.values = options.values;
  this.pieSlices = [];
  this.numberOfBoxes = 0;

  this.drawn = options.drawn;
  console.log("graphDrawn: " + this.drawn);

  //console.log(Object.values(this.values));

  this.draw = function () {
    var total_value = 0;
    var color_index = 0;
    let count = 0;
    for (var categ in this.options.data) {
      var val = this.options.data[categ];
      console.log(val);
      total_value += val;
    }

    // Get Data passed into here when chart object was created
    var start_angle = 0;
    for (categ in this.options.data) {
      const key = Object.keys(this.options.data)[count];
      const keyValue = Object.values(this.options.data)[count];
      const filesToAdd = Object.values(this.files)[count];
      const valuesToAdd = Object.values(this.values)[count];
      count++;

      val = this.options.data[categ];
      var slice_angle = (2 * Math.PI * val) / total_value;

      // Create a slice for every property of options
      const slice = new PieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );
      slice.color = this.colors[color_index % this.colors.length];
      slice.label = returnSliceLabel(key);
      slice.key = key;
      slice.value = keyValue;
      for (let i = 0; i < filesToAdd.length; i++) {
        slice.files.push(filesToAdd[i]);
      }
      for (let i = 0; i < valuesToAdd.length; i++) {
        slice.fileValues.push(valuesToAdd[i]);
      }
      this.pieSlices.push(slice);
      slice.draw();

      start_angle += slice_angle;
      color_index++;
    }

    addMouseEvents(this.canvas, this.ctx, this.pieSlices);

    //drawing a white circle over the chart
    //to create the doughnut chart
    if (this.options.doughnutHoleSize) {
      const whiteCircle = new PieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize *
          Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "#ffffff"
      );
      whiteCircle.draw();
    }

    //Create Legend
    if (this.options.legend) {
      color_index = 0;
      var legendHTML = "";
      for (categ in this.options.data) {
        //prettier-ignore
        legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
      }
      this.options.legend.innerHTML = legendHTML;
    }
  };
};

// Get Mouse Hover and Mouse CLick Events
const addMouseEvents = (canvas, ctx, slices) => {
  const body = document.getElementsByTagName("BODY")[0];
  canvas.addEventListener("mousemove", (event) => {
    for (const slice of slices) {
      // Check whether point is inside circle
      if (ctx.isPointInPath(slice.path, event.offsetX, event.offsetY)) {
        canvas.title = `${slice.label} : ${slice.value} Files`;
        body.style.cursor = "auto";
      }
    }
  });
  canvas.addEventListener("mousedown", (event) => {
    for (const slice of slices) {
      if (ctx.isPointInPath(slice.path, event.offsetX, event.offsetY)) {
        createListOfFiles(slice.files, slice.label, slice.fileValues);
      }
    }
  });
};

// Get label To Show In File Name Box
const returnSliceLabel = (key) => {
  if (key === "smallest") {
    return "0 - 500 bytes";
  } else if (key === "smaller") {
    return "500 - 5000 bytes";
  } else if (key === "small") {
    return "5000 - 7500 bytes";
  } else if (key === "big") {
    return "7500 - 10000 bytes";
  } else if (key === "bigger") {
    return "10000 - 100000 bytes";
  } else if (key === "biggest") {
    return "more than 100000 bytes";
  } else if (key === "none") {
    return "no extension";
  } else if (key === "PastYears") {
    return "More Than 1 Year";
  } else {
    return key;
  }
};
