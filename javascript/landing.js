let cnv;
let myVinyls = [];
// let numVinyls = 50;
let hueAngle = 210;
let avinyl;
let interactivity = true;

let myColors = [];
let currentColorIndex = 0; 
let canvasWidth;
let canvasHeight;
let submit;

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

    submit = createButton('submit memory');    
    submit.position(canvasWidth/2 - submit.width /2,canvasHeight * 18/20);
    submit.style('background-color', '#262626');
    submit.style('padding', '10px 10px');
    submit.style('font-family','Sometype Mono');
    submit.style('border', '2px solid rgb(238,238,238)');
    submit.style('border-radius', '10px');
    }
  
    
   
    
  function draw() {
    background(28,28,28);
  
    push();
    stroke(238,238,238,100);
    strokeWeight(8);
    noFill();
    textAlign(CENTER);
    textSize(110);
    textFont('Chillax');
    text("memory records",width/2,height/2);
    pop();

    wiggleRecord();

    push();
    stroke(238,238,238);
    strokeWeight(2);
    fill(238,238,238);
    textAlign(CENTER);
    textFont('Chillax');
    textSize(110);
    text("memory records",width/2,height/2);
    pop(); 
  }

  function wiggleRecord(){
    ox+=0.04;
    oy-=0.02;
    oz+=0.01;
    push();

    if (interactivity){
      chaos_mag = map(mouseX, 0, canvasWidth, -200,200);
      chaos_delta = map(mouseY,0,canvasHeight,0.00,0.25);
    } else {
      chaos_mag = 30;
    }

 
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

  function keyPressed(){
    if (keyCode == 32){
      interactivity = !interactivity;
    }

    if (keyCode == RIGHT_ARROW){
      
    }
  }



     