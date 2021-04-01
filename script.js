var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')
var enemyWidth = 10
enemyXArray = [
  canvas.width / 2 - enemyWidth,
  canvas.width / 2 + enemyWidth,
  canvas.width / 2 - enemyWidth,
  canvas.width / 2 + enemyWidth,
  canvas.width / 2 - enemyWidth,
  canvas.width / 2 + enemyWidth,
  canvas.width / 2 - enemyWidth,
  canvas.width / 2 + enemyWidth
]
enemyYArray = [enemyWidth * 1.5, enemyWidth * 1.5]
enemyXArray2 = [
  (canvas.width * 4.5) / 9 - enemyWidth,
  (canvas.width * 4.5) / 9 + enemyWidth
]
enemyYArray2 = [75, 75, 75, 75, 75, 75, 75, 75]
var x = canvas.width / 2
var y = canvas.height - 30
var cannonHeight = 10
var cannonWidth = 75
var cannonX = canvas.width / 2
var cannonFired = false
var fireX = canvas.width / 2
var fireY = 0
var endGame = true

document.addEventListener('mousemove', mouseMoveFunction, false)
document.addEventListener('click', mouseClickFunction, true)

function mouseClickFunction (event) {
  cannonFired = true
  fireX = event.clientX
}

console.log(enemyXArray)

function mouseMoveFunction (event) {
  let relativeX = event.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    cannonX = relativeX - cannonWidth / 2
  }
}

function drawCannon () {
  ctx.beginPath()
  ctx.rect(cannonX, canvas.height - cannonHeight, cannonWidth, cannonHeight)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

function fireCannon () {
  if (cannonFired) {
    x = fireX
    ctx.fillStyle = '#edad3e'
    ctx.beginPath()
    fireY = y
    // console.log(fireY, "firey")
    ctx.arc(x, y, 3, 0, 2 * Math.PI, false)
    ctx.fill()
    y -= 10
    if (y <= 0) {
      cannonFired = false
      y = canvas.height - 30
      return
    }
    destroyEnemy(y)
  }
}

function drawEnemy (x, y) {
  ctx.fillStyle = '#0095DD'
  ctx.beginPath()
  ctx.arc(x, y, enemyWidth, 0, 2 * Math.PI, false)
  ctx.fill()
}

function draw () {
  beginGame()
  if (!endGame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    fireCannon()
    // destroyEnemy()
    drawCannon()
    for (enemy = 0; enemy < enemyYArray2.length; enemy++) {
      if (array1) {
        drawEnemy(enemyXArray[enemy], enemyYArray[enemy])
      }
      if (transition) {
        drawEnemy(enemyXArray[enemy], enemyYArray[enemy])
        drawEnemy(enemyXArray2[enemy], enemyYArray2[enemy])
      }
    }
  }
}
var transition = false
console.log(transition)
var counterY = 1.5
var counterX = 1
var array1 = true
var enemyEnter = true


setInterval(function () {
  if (enemyEnter && endGame == false) {
    console.log("begin")
    counterY = counterY + 2
    if (counterY == 9.5) {
      counterY = 3
      transition = true
    }
    if (array1) {
      enemyYArray.push(enemyWidth * counterY, enemyWidth * counterY)
    }
    if (transition) {
      enemyYArray.splice(0, 2)
      enemyXArray.splice(0, 2)
    }
    if (counterY >= 9.5 && counterY <= 15) {
      counterX = counterX + 2
      enemyXArray2.push(
        canvas.width / 2 - enemyWidth * counterX,
        canvas.width / 2 + enemyWidth * counterX
      )
    }
    if (counterY >= 17) {
      enemyEnter = false
      enemyXArray2 = [
        (canvas.width * 1.5) / 9,
        (canvas.width * 2.5) / 9,
        (canvas.width * 3.5) / 9,
        (canvas.width * 4.5) / 9,
        (canvas.width * 5.5) / 9,
        (canvas.width * 6.5) / 9,
        (canvas.width * 7.5) / 9
      ]
    }
  }
}, 500)

function destroyEnemy (y) {
  console.log(enemyXArray2, "enemyXArray2")
  console.log(enemyYArray2, "enemyYarray2")
  var shotTrajectoryX = fireX
  var shotTrajectoryY = y
  for (i = 0; i < enemyXArray2.length; i++) {
    var leftHitEdge = enemyXArray2[i] - enemyWidth
    var rightHitEdge = enemyXArray2[i] + enemyWidth
    var topHitEdge = enemyYArray2[i] - enemyWidth
    var bottomHitEdge = enemyYArray2[i] + enemyWidth
    if (shotTrajectoryX >= leftHitEdge && shotTrajectoryX <= rightHitEdge) {
      if (shotTrajectoryY < bottomHitEdge && shotTrajectoryY > topHitEdge) {
        if(enemyEnter == false){
          enemyXArray2.splice(i, 1)
          if(enemyXArray2.length == 0){
            document.location.reload() 
          }
        }
      }
    }
  }
}

function drawStars (x) {
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.arc(x, y, 3, 0, 2 * Math.PI, false)
  ctx.fill()
  y -= 10
  if (y <= 0) {
    cannonFired = false
    y = canvas.height - 30
    return
  }
}

function beginGame () {
  if (endGame) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
      ctx.font = '30px Comic Sans MS'
      ctx.fillStyle = 'Yello'
      ctx.textAlign = 'center'
      ctx.fillText('Space Invaders', canvas.width / 2, canvas.height / 2 -100)
      ctx.font = '15px Comic Sans MS'
      ctx.fillStyle = 'Yello'
      ctx.textAlign = 'center'
      ctx.fillText('Click anywhere to begin', canvas.width / 2, canvas.height / 2 + 50)
      ctx.font = '15px Comic Sans MS'
      ctx.fillStyle = 'Yello'
      ctx.textAlign = 'center'
      ctx.fillText('By Simon Colman', canvas.width / 2, canvas.height / 2 + 100)
      ctx.font = '15px Comic Sans MS'
      ctx.fillStyle = 'Yello'
      ctx.textAlign = 'center'
      ctx.fillText('Without copyright or propietary limitation 2021', canvas.width / 2, canvas.height / 2 + 200)
      
      drawStars(Math.floor(Math.random() * canvas.width) + 1)
    }
  }
}
function startGame(){
  if(endGame){
    // enemyEnter = true
    canvas.addEventListener("click", function(){
      endGame = false
    })
  }
}

startGame()

var interval = setInterval(draw, 10)
