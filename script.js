const canva = document.querySelector("#draw");
const lineWidth = document.querySelector(".linewidth");
const ctx = canva.getContext("2d");
canva.height = window.innerHeight;
canva.width = window.innerWidth;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = "1";

lineWidth.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

let draw = false;
let lastX = 1;
let lasty = 1;
let hue = 0;

function drawing(e) {
  if (!draw) return;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lasty); //start from
  ctx.lineTo(e.offsetX, e.offsetY); // goto
  ctx.stroke();
  [lastX, lasty] = [e.offsetX, e.offsetY];
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}

canva.addEventListener("mousemove", drawing);
canva.addEventListener("mousedown", (e) => {
  draw = true;
  [lastX, lasty] = [e.offsetX, e.offsetY];
});
canva.addEventListener("mouseup", () => (draw = false));
canva.addEventListener("mouseout", () => (draw = false));
