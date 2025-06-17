const canva = document.querySelector("#draw");
const ctx = canva.getContext("2d");
canva.height = window.innerHeight;
canva.width = window.innerWidth;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
let draw = false;
let lastX = 0;
let lasty = 0;

function drawing(e) {
  if (!draw) return;

  console.log(e);
}

canva.addEventListener("mousemove", drawing);
canva.addEventListener("mousedown", () => (draw = true));
canva.addEventListener("mouseup", () => (draw = false));
canva.addEventListener("mouseout", () => (draw = false));
