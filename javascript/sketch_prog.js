let selmemories;
let memarray;
let index = 0;
let frame = 0;
let curmemtype = 0;
let button;
let carX = 100;
let cnv;
let mySun;
let drops = [];
let particles = [];
let numParticles = 100;
let sparkles = [];
let textOpacity = 20;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

class Sparkle {
  constructor(x, y, speed, angle) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(angle).mult(speed);
    this.size = random(5, 15);
    this.color = color(random(255), random(255), random(255), random(200, 255));
  }

  update() {
    // Apply gravity
    this.vel.add(0, 0.1);

    // Update position
    this.pos.add(this.vel);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  offScreen() {
    // Check if the sparkle is off the screen
    return (this.pos.y > height + this.size);
  }
}

class Waveform {
  constructor(x, y, amplitude, frequency) {
    this.x = x;
    this.y = y;
    this.amplitude = amplitude;
    this.frequency = frequency;
    this.phase = 0;
    this.xSpacing = 5;
  }

  update() {
    // Update phase based on frequency
    this.phase += this.frequency * 0.1;
  }

  display() {
    beginShape();
    noFill();
    stroke(0);
    for (let i = 0; i < width; i += this.xSpacing) {
      let angle = map(i, 0, width, 0, TWO_PI);
      let y = this.y + sin(angle + this.phase) * this.amplitude;
      vertex(i, y);
    }
    endShape();
  }
}

//creating class of symbols so they can be called when 'friend' is in description
class symbol{
    constructor(_x, _y, diam, colour) {
        this.xPos = _x;
        this.yPos = _y;
        this.size = diam;
        this.backgroundColour = colour;
        this.xMotion = random(-3,3);
        this.yMotion = random(-3,3);
      }

      display() {    
        push();
        strokeWeight(this.size*0.03);
        stroke(this.backgroundColour);
          translate(this.xPos,this.yPos);
          fill(this.backgroundColour);
          arc(0,0,this.size, this.size,0,PI);
          fill(0,0);
          arc(0,0,this.size, this.size,PI,0);
        pop();
      
        if ((this.xPos > width) || (this.xPos < 0)) {
          this.xMotion = this.xMotion * -1;
        }
        if ((this.yPos > height) || (this.yPos < 0)) {
          this.yMotion = this.yMotion * -1; 
        
        }
      this.xPos += this.xMotion;
      this.yPos += this.yMotion;
      }  
    
    }
let mySymbols = [];

//creating class of stars so that they can be called when 'night' is in description
class stars{
  constructor(_x, _y, diam) {
    this.xPos = _x;
    this.yPos = _y;
    this.size = diam;
    this.opacity = random(50, 255); // Initial opacity
    this.sizeChange = random(-0.5, 0.5); // Change in size over time
    this.opacityChange = random(-2, 2); // Change in opacity over time
  }
  
  update() {
    // Update size and opacity
    this.size += this.sizeChange;
    this.opacity += this.opacityChange;

    // Constrain size and opacity within limits
    this.size = constrain(this.size, 1, 10);
    this.opacity = constrain(this.opacity, 50, 255);

    // Wrap around if size or opacity reaches limits
    if (this.size <= 1 || this.size >= 10) {
      this.sizeChange *= -1;
    }
    if (this.opacity <= 50 || this.opacity >= 255) {
      this.opacityChange *= -1;
    }
  }
  display() {    
    push();
    noStroke();
    fill(255,this.opacity);
    ellipse(this.xPos,this.yPos,this.size);
    pop();
  }  
}
let myStars = [];

//Next: create sun that moves across top
class squaresun {
  constructor(_x,_y,_x2,_y2){
    this.xPos = _x;
    this.yPos = _y;
    this.color1 = color(255,204,0,255);
    this.color2 = color(255,204,0,0);
    this.width = _x2;
    this.height = _y2;
  }

  display(){
    beginShape();
    beginGradientFill(AXIS_VERTICAL,this.color1,this.xPos,this.yPos,this.color2,this.xPos,this.height);
    vertex(this.xPos,this.yPos);
    vertex(this.xPos,this.yPos + 200);
    vertex(this.width,this.yPos + 300);
    vertex(this.width,this.height);
    
    
    endShape(CLOSE);
    endGradientFill();
    // fill(this.color1); 
    // rect(this.xPos,this.yPos,this.width,this.height);
  }
}

class sun {
  constructor(_x, _y, _radius) {
    this.xPos = _x;
    this.yPos = _y;
    this.radius = _radius;
    this.movement = 10;
    this.gradientSize = 200; // Gradient size
    this.gradient = drawingContext.createRadialGradient(_x, _y, 0, _x, _y, _radius);
    this.gradient.addColorStop(0, 'rgba(255, 204, 0, 1)'); // Start color (golden yellow, opaque)
    this.gradient.addColorStop(1, 'rgba(255, 204, 0, 0)'); // End color (transparent)
    drawingContext.fillStyle = this.gradient;
  }
  // update() {
  //   // Update size and opacity
    
  //   if ((this.xPos > width) || (this.xPos < 0)) {
  //     this.movement = this.movement * -1;
  //   }

  //   this.xPos += this.movement;
  // }
  display() {
    push();
    noStroke();
    ellipseMode(RADIUS);
    drawingContext.fillStyle = this.gradient; // Apply the gradient
    ellipse(this.xPos, this.yPos, this.radius);
    pop();
  }
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20); // Length of the raindrop
    this.yspeed = map(this.z, 0, 20, 4, 10); // Speed of the raindrop
  }

  fall() {
    this.y += this.yspeed;
    if (this.y > height) {
      this.y = random(-200, -100);
    }
  }
  show() {
    let len = map(this.z, 0, 20, 10, 20); // Adjust length based on z
    let thick = map(this.z, 0, 20, 1, 3); // Adjust thickness based on z
    let shapeSize = map(this.z, 0, 20, 2, 5); // Adjust size of droplet shape based on z
    noStroke();
    fill(255, random(50,200)); 
    beginShape(); 
    vertex(this.x - shapeSize / 2, this.y);
    vertex(this.x + shapeSize / 2, this.y);
    vertex(this.x + shapeSize / 4, this.y + len);
    vertex(this.x - shapeSize / 4, this.y + len);
    endShape(CLOSE); // Draw droplet-shaped raindrop
  }
}
class Particle {
  constructor() {
    this.angle = random(TWO_PI);
    this.radius = random(50, width);
    this.speed = random(0.005,0.01);
    this.color = color(random(150,255),random(150,255),random(150,255),random(50,200));
  }

  update(swirlSpeed) {
    this.angle += this.speed + swirlSpeed;
    let x = cos(this.angle) * this.radius;
    let y = sin(this.angle) * this.radius;
    this.position = createVector(x, y);
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, 10, 10);
  }
}

function setup() {
  cnv = createCanvas(windowWidth,windowHeight);
  centerCanvas();
    fetch("./json/selectedmems.json").then(function(response) {
        return response.json();
      }).then(function(data) {
    
        console.log(data);
        selmemories = data.selectedmemories;
        
      }).catch(function(err) {
        console.log(`Something went wrong: ${err}`);
      });

      noCursor();
    

        for (let i=0; i<10; i++) {
            mySymbols.push(new symbol(random(0,width),random(0,height),random(30,100),color(255,100)));
          }


          for (let i=0; i<30; i++) {
            myStars.push(new stars(random(0,width),random(0,height),random(10,30)));
          }

          mySun = new sun(0,0,width*0.8);

          for (let i = 0; i < 100; i++) {
            drops.push(new Raindrop());
          }
           
          for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
          }
          
      mySquareSun = new squaresun(0,0,100,100);

      rSlider = createSlider(0, 255, 100);
      rSlider.position(20, 20);
      
  }

  function randomMem(){
    index = Math.round(random(0,selmemories.length));
  }

function makeChosenMem(memoryArray){
    // twinkler(memoryArray);
    let chosenMemory = memoryArray[index];
    let chosenVividness = chosenMemory.vivid;
    let chosenEnergy = chosenMemory.memenergy;
    let chosenValence = chosenMemory.memvalence;
    let chosenSong = chosenMemory.Title;
    let chosenArtist = chosenMemory.Artist;
    let chosenDesc = chosenMemory.description;
    let checkPerson = match(chosenDesc,'friend');
    let checkNight = match(chosenDesc,'night');
    let checkSun = chosenDesc.includes('summer') || chosenDesc.includes('sun');
    let checkRain = match(chosenDesc,'rain');
    
    let amplitude = map(chosenVividness, 1,5,30,100); 
    myWave = new Waveform(width/2,height,amplitude,0.2);



    let size = map(chosenVividness,1,5,0,300)
    let growth = map(chosenEnergy,1,5,0.005,0.015)
    let pulse = sin(frame)*size;

    let color = map(chosenValence,1,5,0,255);
    let xMap = map(mouseX,0,width,0,100);
    let yMap = map(mouseY,0,height,0,100);
    
    let swirlSpeed = map(chosenEnergy, 1,5,0.001,0.01);

   

    if (chosenValence == 1){
        background(xMap,yMap,255);
      } else if (chosenValence == 2){
        background(xMap,yMap,200);
      } else if (chosenValence ==3) {
        background(xMap,yMap,50);
      } else if (chosenValence ==4){
        background(200,xMap,yMap)
      } else if (chosenValence ==5){
        background(255,xMap,yMap);
      }
    
      if (checkNight == 'night'){
        background(0,200);
        for (let stars of myStars){
          stars.update();
          stars.display();
        }
       }  
       
       if (checkSun == true){
        mySun.display();
        // mySun.update(); 
      } 
    
      //from friday 15mar, not sure if want to do the below but the particle system is created
      push();
      translate(width / 2, height / 2);
      for (let i = 0; i < numParticles; i++) {
        particles[i].update(swirlSpeed);
        particles[i].display();
      }
      pop();

    //displaying the memory, it fades in slowly
    push();
    textSize(32);
    if (textOpacity < 255){
      textOpacity += 0.5;
    }
    fill(255,textOpacity);
    translate(150,height/2-150);
    textAlign(CENTER);
    text(chosenDesc,0,0,width-250,600);
    pop();

  
    
    // push();
    //     translate(width/2,height/2);
    //     rotate(frame*5);
    //     makeSymbol(0,0,90,90);
    // pop();

    // push();
    //     fill(255,100);
    //     noStroke();
    //     translate(width/2,height/2);
    //     ellipse(0,0,100+ abs(pulse),100+ abs(pulse));
    //     translate(-width/2,-height/2);
    //     ellipse(mouseX,mouseY,40,40);
    // pop();
    
    push();
    textSize(20);
    fill(255);
    text(chosenSong,200,30);
    textSize(16);
    fill(255,255,255,100);
    text(chosenArtist,200,50);
    text(index+1 + " of " + str(memoryArray.length),200,70);
    pop();
    
    
    if (checkPerson == 'friend'){
      for (let symbol of mySymbols){
        symbol.display();
      }
    } 

    if (checkRain == 'rain'){
    for (let drop of drops) {
      drop.fall();
      drop.show();
     }
    }


    // if (checkCar == 'car'){
    //   theCar.display();
    // } 

    frame = frame + growth;

    // if (random() < 0.1) {
    //   sparkles.push(new Sparkle(mouseX, mouseY, random(1, 4), random(PI / 4, PI / 2)));
    // }
  
    // // Update and display all sparkles
    // for (let i = sparkles.length - 1; i >= 0; i--) {
    //   sparkles[i].update();
    //   sparkles[i].display();
    //   // Remove sparkles if they fall off the screen
    //   if (sparkles[i].offScreen()) {
    //     sparkles.splice(i, 1);
    //   }
    // }
    
}



function draw(){
    background(220,0,0);   
    // mySquareSun.display();
    memarray = selmemories;
    makeChosenMem(memarray);  

    
}

function keyPressed(){
    if (keyCode == 32){
      randomMem();
      textOpacity = 0;
    }

    if (index == 0){
      if (keyCode == RIGHT_ARROW){
        index++;
        textOpacity = 0;
      }
    } else if (index == memarray.length-1){
      if (keyCode == LEFT_ARROW){
        index--;
        textOpacity = 0;
      }
    } else {
      if (keyCode == RIGHT_ARROW){
        index++;
        textOpacity = 0;
      } else {
      if (keyCode == LEFT_ARROW){
        index--;
        textOpacity = 0;
      }
      } 
    } 

    
  
  }

  function makeSymbol(xPosition,yPosition,sizeX,sizeY){
    push();
    fill(255);
    strokeWeight(3);
    stroke(255);
    arc(xPosition,yPosition,sizeX,sizeY,0,PI);
    fill(0,0);
    arc(xPosition,yPosition,sizeX,sizeY,PI,0);
    pop();
  }

function windowResized(){
  centerCanvas();
}
