var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var cannonHeight = 10;
var cannonWidth = 75;
var cannonX = canvas.width/2;
var cannonFired = false
var fireX = canvas.width/2;

document.addEventListener("mousemove", mouseMoveFunction, false);
document.addEventListener("click", mouseClickFunction, true)


function mouseClickFunction(event){
    cannonFired = true
    console.log(event.clientX)
    fireX = event.clientX - cannonWidth;
}

function mouseMoveFunction(event) {
  let relativeX = event.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    cannonX = relativeX - cannonWidth/2;
  }
}

function drawCannon() {
  ctx.beginPath();
  ctx.rect(cannonX, canvas.height-cannonHeight, cannonWidth, cannonHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


function fireCannon(){
  if(cannonFired){
    x = fireX 
    ctx.fillStyle = "#0095DD"
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
    ctx.fill()
    y -=5.5
    if ( y <= 0){
      cannonFired = false
      return
    }
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireCannon();
  drawCannon();

}

var interval = setInterval(draw, 10);
