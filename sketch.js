var mic;
let chocolates = [];


function preload(){
  //myFont = loadFont("./assets/Ubuntu.otf");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  mic.start();
}

function draw() {
  background(240,128,128);

  var myText = 'say ya!';
  textFont('Ubuntu');
  textAlign(CENTER);
  textSize(30);
  fill(50);

  text(myText,width/2,windowHeight/2+360);

  // Get the overall volume (between 0 and 1.0)

  let c = new chocolate();
  chocolates.push(c);
  for(let i = 0 ; i < chocolates.length; i++ ){
    chocolates[i].update();
    chocolates[i].appear();
    if (chocolates[i].destroy())
      chocolates.splice(i, 2);
  }
}

class chocolate {
  constructor() {
    var vol = mic.getLevel();
    this.x = windowWidth/2;
    this.y = windowHeight/2;
    this.vx = random(-vol,vol);
    this.vy = random(-vol*5,vol);
    this.alpha = 255;


  }
  destroy(){
    return this.alpha < 0;
  }
  update(){
    this.x += this.vx * 5;
    this.y += this.vy * 20;
    this.alpha -= 10;
  }
  appear(){
    noStroke();
    var from = color(218, 165, 32);
    var to = color(72, 61, 139);
    colorMode(RGB); // Try changing to HSB.
    var interA = lerpColor(from, to, 0.33);
    //var interB = lerpColor(from, to, 0.66);
    fill(interA);
    ellipse(this.x,this.y+300,this.vx*60);
    ellipse(windowWidth/2,windowHeight/2+320,60,20);

  }
}



function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
