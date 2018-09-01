var CanvasWidth = 1200
var CanvasHight = 600
var platforms = []
var amoutOfPlatforms = 30
//jumping
var jumpGap = false
var jumpKeyDown = false

var gravity = 8
var momentumCutoff = -1
var LateralMovemetSpeed = 5
var aerialSpeedchangeD = 0.1
var jumpPower = 15
var doubleJumpsTotal = 1
var doubleJumpsPower = 5
var doubleJumpsCount = 1
// level stats
var level = 7
var timerSeconds
var levelPlatNumber = amoutOfPlatforms
var MaxPlatSize
var MinPlatSize
//timer
var timerLastUpdate = 0
var CurrentTimer
//game
var state = "menu"
var highScore = 0

function setup() {
  createCanvas(CanvasWidth, CanvasHight);
  fill(0)

  player = new playerObject()
  
  for (var i = 0; i < amoutOfPlatforms; i++) {
    platforms.push(new platformObject())
  }
  aerialSpeedchange = aerialSpeedchangeD

  generateLevel()
}
function draw() {
  background(230)
  
  if(state == "menu"){
    textAlign(CENTER)
    textSize(100)
    text("ARC PLAT",CanvasWidth / 2,CanvasHight /2 - 100)
    textSize(30)
    text("HAYDEN SHUKER",CanvasWidth / 2,CanvasHight /2 -50)
    textSize(25)
    text("HIGH SCORE:",CanvasWidth / 2,CanvasHight /2 +50)
    textSize(80)
    text(highScore,CanvasWidth / 2,CanvasHight /2 + 130)
    textSize(15)
    text("START WITH J, QUICKSTART WITH S",CanvasWidth / 2,CanvasHight /2 + 230)
    
    if(keyIsDown(74)){
      level = 0
      state = "game"
      generateLevel()
    }
    if(keyIsDown(83)){
      level = 10
      state = "game"
      generateLevel()
    }
  }
  else if(state == "game"){
    CurrentTimer = timerSeconds * 1000 - (millis() - timerLastUpdate) 

    if(level == 0){
      textAlign(CENTER)
      textSize(100)
      fill(200)
      text("W,A,S,D AND J",CanvasWidth / 2,CanvasHight/2)
      fill(0)
    }
    if(level == 1){
      textAlign(CENTER)
      textSize(70)
      fill(200)
      text("JUMP IN AIR TO DOUBLE JUMP",CanvasWidth / 2,CanvasHight/2-60)
      text("ONCE PER LEVEL",CanvasWidth / 2,CanvasHight/2+60)
      fill(0)
    }
    if(level == 2){
      textAlign(CENTER)
      textSize(100)
      fill(200)
      text("S TO FAST FALL",CanvasWidth / 2,CanvasHight/2)
      fill(0)
    }

    player.move()
    player.updatePull()
    player.display()
    game()

    for (var i = 0; i < amoutOfPlatforms; i++) {
      platforms[i].draw()
    }
  }
}
function game() {
  var DeveloperHudActive = false
  if(level > highScore){
    highScore = level
  }
  
  if(player.x >= CanvasWidth){
    level = level + 1
    generateLevel()
  }

  function DeveloperHud() {
    textSize(20)
    textAlign(LEFT)
    text("X pull: " + player.Xpull, 200, 40)
    text("Y pull: " + player.Ypull, 200, 60)
    text("grounded " + player.grounded, 200, 80)
  }
  function hud() {
    textAlign(LEFT)
    textSize(40)
    text(level, 50, 80)
    textSize(20)
    text(Math.round((CurrentTimer /1000) * 100) / 100,50,130)
    if(doubleJumpsCount > 0){
      text("■",50,170)
    }
    textSize(15)
    text(highScore,120,80)
  } 
  function testFailure() {
    if(CurrentTimer < 0 || player.y > CanvasHight)
    {
      state = "menu"
    }
  }
  if (DeveloperHudActive) {
    DeveloperHud()
  }  
  hud()
  testFailure()
}
function generateLevel(){
  for(C = 0; C < amoutOfPlatforms; C ++){
    platforms[C].active = false
    platforms[C].x = floor(random(100,CanvasWidth))
    platforms[C].y = floor(random(300,CanvasHight-10))
  }
  function levelDifficultySet () {
    if(level >= 10){
      levelPlatNumber = 10
      MaxPlatSize = 75
      MinPlatSize = 25
      timerSeconds = 10
    }
    else if(level >= 5){
      levelPlatNumber = 15
      MaxPlatSize = 150
      MinPlatSize = 50
      timerSeconds = 15
    }
    else if(level >= 1){
      levelPlatNumber = 20
      MaxPlatSize = 150
      MinPlatSize = 100
      timerSeconds = 30
    }
    else{
      levelPlatNumber = 25
      MaxPlatSize = 150
      MinPlatSize = 100
      timerSeconds = 600
    }
  }
  
  levelDifficultySet()
  for(C = 0; C < amoutOfPlatforms; C ++){
    platforms[C].width = random(MinPlatSize,MaxPlatSize)
  }
  //toggle plats
  for(C = 1;C < levelPlatNumber;C ++){
    platforms[C].active = true
  }
  
  timerLastUpdate = millis() 

  platforms[0].x = -150
  platforms[0].y = CanvasHight-30
  platforms[0].width = 400
  platforms[0].active = true
  player.x = 80
  player.y = CanvasHight-40

  doubleJumpsCount = doubleJumpsTotal
}
function playerObject() {

  this.x = 100
  this.y = 100
  this.XS = 10
  this.YS = 10

  this.doubleJumpsCurrent = 1
  this.movingLeft = false
  this.movingRight = false
  this.jump = false
  this.down = false

  this.grounded = false

  this.Xpull = 0
  this.Ypull = 0

  this.display = function () {
    rect(this.x, this.y, this.XS, this.YS)
  }
  this.updatePull = function () {
    //this.Ypull = gravity
    if (this.Ypull < momentumCutoff) {
      this.Ypull = this.Ypull * (1 - aerialSpeedchange)}

    else if (this.Ypull > momentumCutoff && this.Ypull < 0) {
      this.Ypull = -momentumCutoff}

    else if (
      this.Ypull >= -momentumCutoff && this.Ypull < gravity) {
      this.Ypull = this.Ypull * (1 + aerialSpeedchange)}

    else {
      this.Ypull = gravity + this.down * 10}

    if (this.movingLeft) {
      this.Xpull = -LateralMovemetSpeed}
    
    if (this.movingRight) {
      this.Xpull = LateralMovemetSpeed}
    //jump
    if (this.jump && this.grounded) {
      this.Ypull = -jumpPower}
    //double jump
    else if (this.jump && !this.grounded && doubleJumpsCount > 0) {
    this.Ypull = -doubleJumpsPower
    doubleJumpsCount = doubleJumpsCount - 1}
    
    if (!this.movingLeft && !this.movingRight) {
      this.Xpull = 0}

    if (this.down && !this.grounded) {
      aerialSpeedchange = 1}

    else {
      aerialSpeedchange = aerialSpeedchangeD
    }
  }
  //detect movement
  this.detectMovement = function () {
    if (keyIsDown(65)) {
      this.movingLeft = true
    }
    else {
      this.movingLeft = false
    }
    if (keyIsDown(68)) {
      this.movingRight = true
    }
    else {
      this.movingRight = false
    }
    if (keyIsDown(83)) {
      this.down = true
    }
    else {
      this.down = false
    }
    
    if(keyIsDown(74)|| keyIsDown(87)){
      jumpKeyDown = true
    }
    else {
      jumpKeyDown = false
      jumpGap = true
    }

    if(jumpGap && jumpKeyDown){
      this.jump = true
      jumpGap = false
    }
    else{
      this.jump = false
    }
  }
  this.move = function () {

    this.detectMovement()

    //down
    if (this.Ypull > 0) {
      for (U = 0; U < this.Ypull; U++) {
        if (this.collideDown()) {
          this.grounded = true
          break
        }
        else {
          this.y++
          this.grounded = false
        }
      }
    }
    if (this.Ypull < 0) {
      for (C = 0; C < Math.abs(this.Ypull); C++) {
        this.y--
        this.grounded = false
      }
    }

    //sideways movement
    for (C = 0; C < Math.abs(this.Xpull); C++) {
      if (this.Xpull < 0) {
        this.x--
      }
      else {
        this.x++
      }
    }
  }
  this.collideDown = function () {
    for (C = 0; C < amoutOfPlatforms; C++) {

      if (
        player.y == platforms[C].y - this.YS&&
        this.x + this.XS >= platforms[C].x &&
        this.x <= platforms[C].x + platforms[C].width &&
        platforms[C].active
      ) {
        return true
      }
    }
    return false
  }
}
function platformObject() {
  this.x = 100
  this.y = 300
  this.width = 100
  this.hight = 5

  this.active = true

  this.draw = function () {
    if (this.active) {
      rect(this.x, this.y, this.width, this.hight)
    }
  }
}