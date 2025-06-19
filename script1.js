const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
const clear = document.querySelector("#clear");
const line = document.querySelector(".linewidth");
console.log(ctx);

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
ctx.strokeStyle = "#BADA55";
ctx.lineWidth = 1;
ctx.lineJoin = "round";
ctx.lineCap = "round";

let drawing = false;
let lastX = 1;
let lastY = 1;

line.addEventListener("change", () => {
  ctx.lineWidth = line.value;
});
function notdraw() {
  drawing = false;
}
function draw(e) {
  if (!drawing) return;
  console.log(e);

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);

  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
clear.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", notdraw);
canvas.addEventListener("mouseout", notdraw);
