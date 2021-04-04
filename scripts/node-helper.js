// Object to help get node properties to match chart format
export const nodemon = {
  getFileSizesCounts(nodes, sizeRanges) {
    for (const n of nodes) {
      const size = n.size;
      sizeRanges.push(size);
    }
    let counts = {
      smallest: 0,
      smaller: 0,
      small: 0,
      big: 0,
      bigger: 0,
      biggest: 0,
    };
    for (const n of nodes) {
      const size = n.size;
      if (size >= 0 && size < 500) {
        n.sizeLabel = "smallest";
        counts.smallest++;
      } else if (size >= 500 && size < 5000) {
        n.sizeLabel = "smaller";
        counts.smaller++;
      } else if (size >= 5000 && size < 7500) {
        n.sizeLabel = "small";
        counts.small++;
      } else if (size >= 7500 && size < 10000) {
        n.sizeLabel = "big";
        counts.big++;
      } else if (size >= 10000 && size < 100000) {
        n.sizeLabel = "bigger";
        counts.bigger++;
      } else {
        n.sizeLabel = "biggest";
        counts.biggest++;
      }
    }
    //console.log("/nFILE SIZES" + JSON.stringify(counts));
    return counts;
  },
  getFileSizes(nodes, input) {
    let fileSizes = {};
    for (let i = 0; i < Object.keys(input).length; i++) {
      fileSizes[Object.keys(input)[i]] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (Object.keys(input)[i] === nodes[j].sizeLabel) {
          fileSizes[Object.keys(input)[i]].push(nodes[j].size);
        }
      }
    }
    return fileSizes;
  },

  getFileTypesCounts(nodes, types) {
    for (const n of nodes) {
      const type = n.fileType;
      types.push(type);
      var counts = {};
      for (var i = 0; i < types.length; i++) {
        counts[types[i]] = 1 + (counts[types[i]] || 0);
      }
    }
    return counts;
  },
  getFileTypes(nodes, input) {
    let fileTypes = {};
    for (let i = 0; i < Object.keys(input).length; i++) {
      fileTypes[Object.keys(input)[i]] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (Object.keys(input)[i] === nodes[j].fileType) {
          fileTypes[Object.keys(input)[i]].push(nodes[j].fileType);
        }
      }
    }
    //console.log(JSON.stringify(fileTypes));
    return fileTypes;
  },

  getLastModifiedDatesCounts(nodes, modifiedDates) {
    const currentDate = new Date();
    const yesterday = new Date();
    const oneWeekAgo = new Date();
    const twoWeekAgo = new Date();
    const oneMonthAgo = new Date();
    const sixMonthAgo = new Date();
    const oneYearAgo = new Date();

    yesterday.setDate(currentDate.getDate() - 1);
    oneWeekAgo.setDate(currentDate.getDate() - 7);
    twoWeekAgo.setDate(currentDate.getDate() - 14);
    oneMonthAgo.setDate(currentDate.getDate() - 31);
    sixMonthAgo.setDate(currentDate.getDate() - 183);
    oneYearAgo.setDate(currentDate.getDate() - 365);

    let counts = {
      PastDay: 0,
      PastWeek: 0,
      PastTwoWeeks: 0,
      PastMonth: 0,
      PastSixMonths: 0,
      PastYear: 0,
      PastYears: 0,
    };

    let i,
      l = nodes.length;
    for (i = 0; i < l; i++) {
      const mDate = new Date(nodes[i].lastModified);
      //console.log("Date: " + mDate);
      modifiedDates.push(mDate);
      //console.log("Date for " + nodes[i].name + " = " + modifiedDates[i]);
    }

    //prettier-ignore
    for (i = 0; i < l; i++) {
      const date = modifiedDates[i].getTime();
      if (date <= currentDate.getTime() && date > yesterday.getTime()) {
        nodes[i].modifiedLabel = "PastDay";
        counts.PastDay++;
      } else if (date <= yesterday.getTime() && date > oneWeekAgo.getTime()) {
        nodes[i].modifiedLabel = "PastWeek";
        counts.PastWeek++;
      } else if (date <= oneWeekAgo.getTime() && date > twoWeekAgo.getTime()) {
        nodes[i].modifiedLabel = "PastTwoWeeks";
        counts.PastTwoWeeks++;
      } else if (date <= twoWeekAgo.getTime() && date > oneMonthAgo.getTime()) {
        nodes[i].modifiedLabel = "PastMonth";
        counts.PastMonth++;
      } else if (date <= oneMonthAgo.getTime() && date > sixMonthAgo.getTime()) {
        nodes[i].modifiedLabel = "PastSixMonths";
        counts.PastSixMonths++;
      } else if (date <= sixMonthAgo .getTime() && date > oneYearAgo .getTime()) {
        nodes[i].modifiedLabel = "PastYears";
        counts.PastYear++;
      } else if (date <= oneYearAgo.getTime()) {
        nodes[i].modifiedLabel = "PastYears";
        counts.PastYears++;
      }
    }
    //console.log("Counts: \n" + JSON.stringify(counts));
    return counts;
  },
  getLastModifiedDates(nodes, input) {
    let modifiedDates = {};
    for (let i = 0; i < Object.keys(input).length; i++) {
      modifiedDates[Object.keys(input)[i]] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (Object.keys(input)[i] === nodes[j].modifiedLabel) {
          const date = new Date(nodes[j].lastModified);
          const day =
            date.getMonth() +
            1 +
            "-" +
            date.getDay() +
            "-" +
            date.getFullYear() +
            " @" +
            date.getHours() +
            ":" +
            date.getMinutes();
          modifiedDates[Object.keys(input)[i]].push(day);
        }
      }
    }
    //console.log(JSON.stringify(modifiedDates));
    return modifiedDates;
  },

  getFileNames(nodes, input, inputType) {
    let fileNames = {};
    for (let i = 0; i < Object.keys(input).length; i++) {
      fileNames[Object.keys(input)[i]] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (inputType === "fileType") {
          if (Object.keys(input)[i] === nodes[j].fileType) {
            fileNames[Object.keys(input)[i]].push(nodes[j].name);
          }
        } else if (inputType === "fileSize") {
          if (Object.keys(input)[i] === nodes[j].sizeLabel) {
            fileNames[Object.keys(input)[i]].push(nodes[j].name);
          }
        } else {
          if (Object.keys(input)[i] === nodes[j].modifiedLabel) {
            fileNames[Object.keys(input)[i]].push(nodes[j].name);
          }
        }
      }
    }
    return fileNames;
  },
};
