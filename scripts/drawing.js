import { Chart } from "./chart.js";
import { PieSlice } from "./pie_slice.js";
import { colorThemes } from "./color.js";

export class DrawWiz {
  constructor() {
    this.drawingArea = document.querySelector("#drawing-area");
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.body = document.getElementsByTagName("BODY")[0];
    this.colors = [];
  }

  //prettier-ignore
  renderChart(countsObject, firstColor, secondColor, fileNames, fileValues, graphDrawn) {
    // for (const f of selectedFiles) {
    //   console.log(f.name);
    // }
    var myLegend = document.querySelector("#legend");
    this.setColors(Object.keys(countsObject).length, firstColor, secondColor);
    // Default Colors ["#fde23e", "#f16e23", "#57d9ff", "#937e88"]

    var myChart = new Chart({
      canvas: this.canvas,
      data: countsObject,
      colors: this.colors,
      doughnutHoleSize: 0.5,
      legend: myLegend,
      files: fileNames,
      values: fileValues,
      drawn: graphDrawn,
    });

    this.addChartMouseEvents(myChart);

    graphDrawn = true;
    myChart.draw();
    //this.printSliceInfo(myChart);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, 400, 400);
  }

  printSliceInfo(chart) {
    const slices = chart.pieSlices;
    for (const slice of slices) {
      console.log("Pie Slice\n " + slice.label);
    }
  }

  // Update Cursor If Outside or inside chart
  addChartMouseEvents(chart) {
    const body = document.getElementsByTagName("BODY")[0];
    this.drawingArea.addEventListener("mouseenter", (event) => {
      this.canvas.style.cursor = "pointer";
    });
    this.drawingArea.addEventListener("mouseleave", (event) => {
      this.body.style.cursor = "auto";
    });
  }

  // Set Colors For Graph
  setColors(count, firstColor, secondColor) {
    this.colors = [];
    if (firstColor === "Random" && secondColor === "Random") {
      for (let i = 0; i < count; i++) {
        this.colors.push(this.getRandomHexColor());
      }
    } else if (firstColor === "Random" && secondColor != "Random") {
      const half = Math.floor(count / 2);
      const remainder = count - half;
      for (let i = 0; i < half; i++) {
        this.colors.push(this.getRandomHexColor());
      }
      for (let i = 0; i < remainder; i++) {
        this.colors.push(colorThemes[secondColor][i]);
      }
    } else if (firstColor != "Random" && secondColor === "Random") {
      const half = Math.floor(count / 2);
      const remainder = count - half;
      for (let i = 0; i < half; i++) {
        this.colors.push(this.getRandomHexColor());
      }
      for (let i = 0; i < remainder; i++) {
        this.colors.push(colorThemes[secondColor][i]);
      }
    } else {
      const half = Math.floor(count / 2);
      const remainder = count - half;
      for (let i = 0; i < half; i++) {
        this.colors.push(colorThemes[firstColor][i]);
      }
      for (let i = 0; i < remainder; i++) {
        console.log(colorThemes[secondColor][i]);
        this.colors.push(colorThemes[secondColor][i]);
      }
    }
  }

  getRandomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
}
