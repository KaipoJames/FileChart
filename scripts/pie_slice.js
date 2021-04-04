export class PieSlice {
  constructor(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    this.ctx = ctx;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
    this.files = [];
    this.fileValues = [];
  }

  draw() {
    const context = this.ctx;
    const slice = new Path2D();
    this.path = slice;
    context.beginPath();
    this.path.moveTo(this.centerX, this.centerY);
    //prettier-ignore
    slice.arc(this.centerX, this.centerY, this.radius, this.startAngle, this.endAngle);
    this.path.closePath();
    context.fillStyle = this.color;
    context.fill(slice);
  }
}
