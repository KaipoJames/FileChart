export class Node {
  constructor(file) {
    this.name = file.name;
    this.size = file.size;
    this.lastModified = file.lastModified;
    this.isDirectory = false;
    this.fileType = this.getFileType();
    this.children = [];
    this.childRelativeSizes = [];

    this.color = "";
    this.colorOption = "";
  }

  // Return file type(everything after last ".")
  getFileType() {
    let n = this.name;
    if (n.lastIndexOf(".") != -1 && n.lastIndexOf(".") != 0) {
      return n.substring(n.lastIndexOf(".") + 1);
    } else {
      return "none";
    }
  }
}
