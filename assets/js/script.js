//get our elements
const canvas= document.getElementById("draw");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
document.getElementById("colorPicker");
const ctx = canvas.getContext("2d");


//apply properties to the ctx
ctx.strokeStyle = "#BADA55";
ctx.lineJoin ="round";
ctx.lineCap="round";
ctx.lineWidth =10;
//init
let isDrawing = false;
let isErasing =false; 
let lastX=0;
let lastY=0;
let hue=0;
function draw(e) {
  if (!isDrawing) return; // Check for mouse click
  ctx.beginPath(); //Begin a new path

  // Start drawing the line
  ctx.moveTo(lastX, lastY);
  console.log(`LAST X - ${lastX}`);
  console.log(`LAST Y - ${lastY}`);

  // Go to current mouse location
  ctx.lineTo(e.offsetX, e.offsetY);
  console.log(`CURRENT X - ${e.offsetX}`);
  console.log(`CURRENT Y - ${e.offsetY}`);

  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
}
// color swatch
const colors = ["#1A4B84", "#BADA55", "#FF5733", "#8A2BE2", "#FFD700"];
const colorSwatchContainer = document.getElementById("colorSwatch");

colors.forEach(color => {
  const colorButton = document.createElement("div");
  colorButton.className = "colorButton";
  colorButton.style.backgroundColor = color;
  colorButton.addEventListener("click", () => setColor(color));
  colorSwatchContainer.appendChild(colorButton);
});

function setColor(color) {
  ctx.strokeStyle = color;
}

// function to clear canvas
function ClearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


canvas.addEventListener("mousedown",(e)=>{
    isDrawing=true;
    isErasing ? erase(e) : ([lastX, lastY] = [e.offsetX, e.offsetY]);
});
canvas.addEventListener("mousemove",(e)=>{
    draw(e);
    erase(e);
});
canvas.addEventListener("mouseup",()=>(isDrawing =false));
canvas.addEventListener("mouseout",()=>(isDrawing=false));

function erase(e) {
  if (!isDrawing || !isErasing) return;

  // Adjust the size of the area to clear as needed
  const eraseSize = 20;

  ctx.clearRect(
    e.offsetX - eraseSize / 2,
    e.offsetY - eraseSize / 2,
    eraseSize,
    eraseSize
  );
}


// Toggle between draw and erase modes
document.getElementById("toggleMode").addEventListener("click", () => {
    isErasing = !isErasing;
    document.getElementById("toggleMode").innerText = isErasing ? "Draw Mode" : "Erase Mode";
  });
  
  // Set theme
  function setTheme(theme) {
    document.documentElement.style.setProperty("--primary-color", theme);
    localStorage.setItem("movie-theme", theme);
  }
  setTheme(localStorage.getItem("movie-theme") || chathams_blue);
  
