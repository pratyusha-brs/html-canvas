//get our elements
const canvas= document.getElementById("draw");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const ctx = canvas.getContext("2d");

let chathamas_blue="#1A4B84";
//apply properties to the ctx
ctx.strokeStyle = "#BADA84";
ctx.lineJoin ="round";
ctx.lineCap="round";
ctx.lineWidth =10;
//init
let isDrawing = false;
let isErasing =false;
let lastX=0;
let lastY=0;
let hue=0;
function draw(e){
    if(!isDrawing||isErasing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%.50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX,lastY]=[e.offsetX,e.offsetY];
    hue++;
    if(hue>=360){
        hue=0;
    }

}
function erase(e){
    if(!isDrawing||isErasing) return;
    ctx.clearRect(e.offsetX-5,e.offsetY -5,10,10);  

}
//event listeners 
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
  
