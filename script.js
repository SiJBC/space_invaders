var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemyWidth = 10
enemyXArray = [canvas.width/2 - enemyWidth, canvas.width/2 + enemyWidth, canvas.width/2 - enemyWidth, canvas.width/2 + enemyWidth, canvas.width/2 - enemyWidth, canvas.width/2 + enemyWidth, canvas.width/2 - enemyWidth, canvas.width/2 + enemyWidth]
enemyYArray = [enemyWidth *1.5, enemyWidth *1.5]
enemyXArray2 =[canvas.width * 4.5/9 - enemyWidth, canvas.width * 4.5/9 + enemyWidth]
enemyYArray2 =[75, 75, 75, 75, 75, 75, 75, 75]
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
  destroyEnemy()
    cannonFired = true
   
    fireX = event.clientX - cannonWidth - (cannonWidth *5);
}

console.log(enemyXArray)

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
    ctx.fillStyle = "#edad3e"
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false)
    ctx.fill()
    y -=10
    if ( y <= 0){
      cannonFired = false
      y =canvas.height-30;
      return
    }
  }
}

function drawEnemy(x, y){

        ctx.fillStyle = "#0095DD"
        ctx.beginPath()
        ctx.arc(x, y, enemyWidth, 0, 2 * Math.PI, false)
        ctx.fill()
        
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireCannon();
  drawCannon();
  for(enemy = 0; enemy < enemyYArray2.length; enemy ++){
    if(array1){
      drawEnemy(enemyXArray[enemy], enemyYArray[enemy])
    } 
    if(transition){
      drawEnemy(enemyXArray[enemy], enemyYArray[enemy])
      drawEnemy(enemyXArray2[enemy], enemyYArray2[enemy])
    }
     
  }
}
var transition = false
console.log(transition)
var counterY = 1.5
var counterX = 1
var array1 = true 
var enemyEnter = true

setTimeout(function(){ enemyEnter = false }, 7000);


    setInterval(function(){ 
      if(enemyEnter){
        counterY = counterY + 2
        if(counterY == 9.5){
          counterY = 3
          transition = true
          console.log(enemyYArray)
        }
        if(array1){
          enemyYArray.push(enemyWidth * counterY, enemyWidth * counterY)
        }if(transition){
          enemyYArray.splice(0,2)
          enemyXArray.splice(0,2)
          // enemyXArray2.push(canvas.width/2  - (enemyWidth * counterY), canvas.width/2  + (enemyWidth * counterY))
        }
        if(counterY >= 9.5 && counterY <= 15){
          counterX = counterX +2
          enemyXArray2.push(canvas.width/2  - (enemyWidth * counterX), canvas.width/2  + (enemyWidth * counterX))
        console.log(enemyXArray2, enemyYArray2, "here")
        }  if(counterY >= 17){
          enemyEnter = false
          console.log(enemyEnter)
          enemyXArray2 = [canvas.width * 1.5/9, canvas.width * 2.5/9, canvas.width * 3.5/9, canvas.width * 4.5/9, canvas.width * 5.5/9, canvas.width * 6.5/9, canvas.width * 7.5/9]
        }
      }
        ; }, 500);
        

// destroyEnemy()
function destroyEnemy(){
  
  var shotTrajectory = Math.round(fireX)

  console.log(shotTrajectory, "fireX")

  for(i = 0; i <enemyXArray2.length; i++){
    var hit = enemyXArray2[i]

    if(shotTrajectory == hit){
      console.log("direct hit")
    }

    console.log(Math.round(enemyXArray2[i]))
    // console.log(shotTrajectory, "fireX")
    }

  


}





var interval = setInterval(draw, 10);
