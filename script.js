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

let isDrawing = false;
let lastX = 1;
let lastY = 1;
let hue = 0;

// 🖌️ Drawing function
function drawLine(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
  hue = (hue + 1) % 360;
}

// 🖱️ Mouse events
canva.addEventListener("mousemove", drawLine);
canva.addEventListener("mousedown", (e) => {
  saveDrawing(); // 💾 Save before starting a stroke
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canva.addEventListener("mouseup", () => (isDrawing = false));
canva.addEventListener("mouseout", () => (isDrawing = false));

// ♻️ Undo/Redo logic
const undoSteps = [];
const redoSteps = [];
const maxSteps = 50;

window.addEventListener("load", () => {
  saveDrawing(); // Save blank canvas on load
});

function saveDrawing() {
  if (undoSteps.length >= maxSteps) {
    undoSteps.shift(); // Remove oldest if over limit
  }
  undoSteps.push(ctx.getImageData(0, 0, canva.width, canva.height));
  redoSteps.length = 0; // Clear redo history
}

function useHistory(fromSteps, toSteps) {
  if (fromSteps.length === 0) return;
  toSteps.push(ctx.getImageData(0, 0, canva.width, canva.height));
  const lastImage = fromSteps.pop();
  ctx.putImageData(lastImage, 0, 0);
}

// 🔘 Undo, Redo, and Clear Buttons
const undoButton = document.querySelector("#undo");
const redoButton = document.querySelector("#redo");
const clearButton = document.querySelector("#clear");

undoButton.addEventListener("click", () => useHistory(undoSteps, redoSteps));
redoButton.addEventListener("click", () => useHistory(redoSteps, undoSteps));
clearButton.addEventListener("click", () => {
  saveDrawing(); // Save before clearing
  ctx.clearRect(0, 0, canva.width, canva.height);
});
