let cnv;
let myVinyls = [];
// let numVinyls = 50;
let hueAngle = 210;
let avinyl;

let myColors = [];
let currentColorIndex = 0; 
let canvasWidth;
let canvasHeight;

let rings = 32;
let dim_init = 40;
let dim_delta = 8;

let chaos_init = .2;
let chaos_delta = 0.12;
let chaos_mag = 30;

let ox;
let oy;
let oz;

let colorChangeInterval = 60; // Change color every 60 frames
let colorCounter = 0;


function colorSelect(){
  
    // Get the current color from the array
    let selectedColor = myColors[currentColorIndex];
  
    // Increment the index and loop back to the beginning if it exceeds the array length
    currentColorIndex = (currentColorIndex + 1) % myColors.length;
  
    return selectedColor;
  
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  // Adjust canvas size based on window size
  resizeCanvas(windowWidth, windowHeight);
}

class Vinyl {
  constructor(x_,y_,labelcolor) {
    if(sorted == false){
      this.x = random(0,width);
      this.y = random(0,height);
    } else if (sorted == true){
      this.x = x_;
      this.y = y_;
    }
    this.radius = 100;
    this.numGrooves = random(0.4,0.1);
    this.label = labelcolor;
    this.maxSpeed = 5; // Maximum speed the record can move
  }

  display() {
    // Draw rotating record
        push();
            translate(this.x, this.y);
            noStroke();
            fill(28,28,28);
            ellipse(0, 0, this.radius * 2);
        pop();
  
    //shadow effect
    push();
    noStroke();
    fill(0,50);
    ellipse(this.x,this.y + 1,this.radius * 2 );
  
    //makes lines for grooves
    for (let i = 1; i < 2; i+= this.numGrooves ){
      push();
      stroke(70);
      noFill();
      ellipse(this.x,this.y,this.radius * i )
    }
  
      fill(80);
      ellipse(this.x,this.y, this.radius * 0.8)
      fill(this.label);
      ellipse(this.x,this.y, this.radius * 0.7)
    push();
        stroke(0);
        strokeWeight(0.1);
        noFill(0);
        ellipse(this.x,this.y, this.radius * 0.25);
        fill(0);
        noStroke();
      ellipse(this.x,this.y, this.radius * 0.1)
    pop();
      //here I may want to upload png of 'memory records' with logo/styling
    }

    update() {
      // Calculate distance between record and mouse cursor
      let d = dist(this.x, this.y, mouseX, mouseY);
  
      // If mouse is close, move the record
      if (d < 100) {
          // Calculate force direction based on record position relative to mouse cursor
          let angle = atan2(this.y - mouseY, this.x - mouseX);
          let dx = cos(angle) * this.maxSpeed * (100 / d); // Adjust speed based on distance
          let dy = sin(angle) * this.maxSpeed * (100 / d);
  
          // Update record position
          this.x += dx;
          this.y += dy;
      }

    }
    

}


function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    canvasWidth = width;
    canvasHeight = height;
    centerCanvas();
    
    let myred = color(224, 66, 66);
    let myorange = color(236, 144, 16);
    let mygreen = color(103, 188, 95);
    let myblue = color(78, 139, 212);
    myColors.push(myred, myorange, mygreen, myblue);

    ox = random(10000);
    oy = random(10000);
    oz = random(10000);
    }
  
    
   
    
  function draw() {
    background(28,28,28);
  
    push();
    stroke(238,238,238,100);
    strokeWeight(2);
    noFill();
    textAlign(CENTER);
    textSize(110);
    text("MEMORY RECORDS",width/2,height/2);
    pop();

    wiggleRecord();

    push();
    stroke(238,238,238);
    strokeWeight(2);
    noFill();
    textAlign(CENTER);
    textSize(110);
    text("MEMORY RECORDS",width/2,height/2);
    pop();
     
  }

  function wiggleRecord(){
    ox+=0.04;
    oy-=0.02;
    oz+=0.01;
    push();
    if (mouseY >= 0 && mouseY <= canvasHeight / 6) {
      // Map mouseX in the first region (0 - height/4)
      rings = map(mouseY,0, canvasWidth/8,10,32);
      // Use the mapped value
      // ...
  } else if (mouseY >= canvasHeight * 5/6 && mouseY <= canvasHeight) {
      // Map mouseX in the second region (height*3/4 - height)
      rings = map(mouseY,canvasWidth * 7/8, canvasWidth, 32, 10);
      // Use the mapped value
      // ...
  }

  if (mouseX >= 0 && mouseX <= canvasWidth/8){
    
    chaos_mag = map(mouseX, 0, canvasHeight/6, 0,30);
  } else if (mouseX >= canvasWidth * 7/8 && mouseX <= canvasWidth){
    
    chaos_mag = map(mouseX, canvasHeight  * 5/6, canvasHeight, 30,50);
  }


    // rings = map(mouseY, 0,height/4, 10,32);
    // chaos_mag = map(mouseX, width/2 - width/4, width/2 + width/4, 40,100);
    translate(width/2,height/2);
    noFill();
    strokeWeight(3);

    

    for (let i = 0; i < rings; i ++){
        if (colorCounter % colorChangeInterval === 0) {
            stroke(colorSelect());
        }
        beginShape();
        for(let angle = 0; angle < 360; angle++){
            let radian = radians(angle);
            let radius =  (chaos_mag * getNoiseWithTime(radian,chaos_delta * i + chaos_init, oz)) + (dim_delta * i + dim_init);
            vertex(radius * cos(radian), radius * sin(radian));
        }
        endShape(CLOSE);
        
    }
    pop();
  }

  function getNoiseWithTime (radian, dim, time){
    let r = radian % TWO_PI;
    if(r < 0.0){r += TWO_PI;}
    return noise(ox + cos(r) * dim , oy + sin(r) * dim, oz + time);
  }
     