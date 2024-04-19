let positiveMemories = [];
let negativeMemories = [];
let val1 = [];
let val2 = [];
let val3 = [];
let val4 = [];
let val5 = [];
let valslider;
let sliderFilter = [];
let isSliderFilter = false;

let filteredMemories = [];
let uniquememories = [];
let vividmemories = [];
let importantmemories = [];
let allmemories = [];
let allvinyls = [];
let index = 0;
// let index = Math.floor(Math.random() * 200);
let textOpacity = 100;
let button;
let isNegMem = false;
let isPosMem = false;
let isFiltered = false;
let phase = 0;
let noiseOffset = 0;
let curmemarray;
let myInput;
let search;
let test;

class guy {
  constructor(_x,_y,size,which,speed){
    this.xPos = _x;
    this.yPos = _y;
    this.startYPos = _y;
    this.size = size;
    this.xMovement = speed;
    this.yMovement = 0.5;
    this.freq = random(0.1,0.2);
    this.amp = random(0.2,2);

    if(which < .5){
      this.guyfacing = socialguy1;
    } else if(which >= .5 ){
      this.guyfacing = socialguy2;
    }
    
  }

  display(){
    push();
    // translate(centerX,centerY);
    // scale(-1,1);
    image(this.guyfacing,this.xPos,this.yPos,this.size, this.size);
    pop();
  }

  update(){
    if (this.guyfacing == socialguy2){
      if (this.xPos >=  this.size + width){
        this.xPos = 0 - this.size;
      } else {
        this.xPos += this.xMovement;
      }
        
    } else if (this.guyfacing == socialguy1){
      if (this.xPos <= 0 - this.size){
        this.xPos = width;
      } else {
        this.xPos -= this.xMovement;
      }

    }
    this.yPos = this.startYPos + sin(frameCount * this.freq) * this.amp; // Adjust the amplitude and frequency as needed

  }
}

class heart {
  constructor(_x,_y,speed,size){
    this.xPos = _x;
    this.yPos = _y;
    this.yMovement = speed;
    this.size = size;
  }
  display(){
    image(drawnheart,this.xPos,this.yPos, this.size,this.size);
  }

  update(){
    
    if (this.yPos <= 0 - this.size){
      this.yPos = height;
    } else {
      this.yPos += this.yMovement;
    }

  }
  }

class VinylRecord {
    constructor(x, y, radius, numGrooves, labelcolor) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.numGrooves = numGrooves;
      this.label = labelcolor;
      // this.rotationSpeed = 0.02; // Rotation speed in radians per frame
      // this.rotationAngle = 0; // Initial rotation angle
      this.maxSpeed = 5; // Maximum speed the record can move
    }
  
    display() {
    // Draw rotating record
        push();
            translate(this.x, this.y);
            noStroke();
            fill(0);
            ellipse(0, 0, this.radius * 2);
        pop();
  
    //shadow effect
    push();
      noStroke();
      fill(0,50);
      ellipse(this.x,this.y + 1,this.radius * 2 );
    pop();
    //makes lines for grooves
    for (let i = 1; i < 2; i+= this.numGrooves ){
      push();
      stroke(70);
      noFill();
      ellipse(this.x,this.y,this.radius * i );
      pop();
    }
    push();
      fill(80);
      ellipse(this.x,this.y, this.radius * 0.8)
      fill(this.label);
      ellipse(this.x,this.y, this.radius * 0.7)
    pop();
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
  
  //   update() {
  //     // Calculate distance between record and mouse cursor
  //     let d = dist(this.x, this.y, mouseX, mouseY);
  
  //     // If mouse is close, move the record
  //     if (d < 100) {
  //         // Calculate force direction based on record position relative to mouse cursor
  //         let angle = atan2(this.y - mouseY, this.x - mouseX);
  //         let dx = cos(angle) * this.maxSpeed * (100 / d); // Adjust speed based on distance
  //         let dy = sin(angle) * this.maxSpeed * (100 / d);
  
  //         // Update record position
  //         this.x += dx;
  //         this.y += dy;
  //     }
  // }
  
  }

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

class sun {
    constructor() {
      this.movement = -10;
      this.gradientSize = 200; // Gradient size
      this.gradient = drawingContext.createLinearGradient(0,0,width,height*2);
    //   this.gradient.addColorStop(0, 'rgba(255, 204, 0, 0)'); // Start color (golden yellow, opaque)
        this.fluctuation = 0.2;   
        this.gradient.addColorStop(0, 'rgba(255, 204, 0, 1)'); // End color (transparent)
        this.gradient.addColorStop(this.fluctuation, 'rgba(255, 204, 0, 0)'); // End color (transparent)
    }
    
    display() {
      push();
      noStroke();
      drawingContext.fillStyle = this.gradient; // Apply the gradient
      rect(0,0,width,height);
      pop();
    }

    update() {  
        this.fluctuation += .001; // Adjust the fluctuation randomly
        this.fluctuation = constrain(this.fluctuation, 0.25, 0.75); // Constrain to ensure it stays within valid range
        this.gradient = drawingContext.createLinearGradient(0, 0, width, height * 2); // Create a new gradient
        this.gradient.addColorStop(0, 'rgba(255, 204, 0, 1)'); // Start color (golden yellow, opaque)
        this.gradient.addColorStop(this.fluctuation, 'rgba(255, 204, 0, 0)'); // End color (transparent)
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

class Memory {
    constructor(track_id, description, vivid, memvalence, memenergy,unique, important,social,emo) {
      this.song = track_id;
      this.description = description;
      this.descLength = textWidth(this.description);
      this.vividness = vivid;
      this.valence = memvalence;
      this.arousal = memenergy;
      this.uniqueness = unique;
      this.importance = important;
      this.socialcontent = social;
      this.emotions = emo;
      this.numGrooves = map(this.vividness, 1, 7, 0.4, 0.1);
     
      if (this.valence == 1){
        this.labelColor = color(78 ,139,212);
      } else if (this.valence == 2){
        this.labelColor = color(152,187,230);
      } else if (this.valence ==3) {
        this.labelColor = color(163,214,158);
      } else if (this.valence ==4){
        this.labelColor = color(237,145,145)
      } else if (this.valence ==5){
        this.labelColor = color(224,66,66);
      } 
      
      this.vinyl = new VinylRecord(width * 1/10,height*3/10,100,this.numGrooves,this.labelColor);
      

      // admiration,adoration,amusement,calmness, joy, nostalgia,anger,awkwardness,fear, excitement,pride,sadness,surprise
      // this.admiration = admiration;
      // this.amusement = amusement;
      // this.adoration = adoration;
      // this.calmness = calmness;
      // this.joy = joy;
      // this.nostalgia = nostalgia;
      // this.anger = anger;
      // this.awkwardness = awkwardness;
      // this.fear = fear;
      // this.excitement = excitement;
      // this.pride = pride;
      // this.sadness = sadness;
      // this.surprise = surprise;
    
      
      this.checksun = this.description.includes('summer') || this.description.includes('sun');
      this.checknight = this.description.includes('night') || this.description.includes('star ')|| this.description.includes('stars ') || this.description.includes('starry ') ;
      this.checkrain = this.description.includes(' rain');
      this.checkfriends = this.description.includes('friend');
      this.checklove = this.description.includes('boyfriend') || this.description.includes('girlfriend')||this.description.includes('love');
      
      this.myStars = [];
      this.drops = [];
      this.myHearts = [];
      this.noise = map(this.vividness,1,7,0.3,0.001);
      this.noiseOffset = map(this.vividness,1,7,0.1,0.03);
      this.myFriends = [];
      this.myConfetti = [];
      this.numConfetti = 100;
      this.swirlSpeed = .002;
      
      if (this.socialcontent == 1){
        this.numGuys = 0;
      } else if (this.socialcontent == 2){
        this.numGuys = 5;
      }
      else if (this.socialcontent == 3){
        this.numGuys = 15;
      }
      else if (this.socialcontent == 4){
        this.numGuys = 30;
      }
      else {
        this.numGuys = 50;
      }
      this.guySpeed = map(this.arousal,1,5,0.2,1);
      
      // this.numGuys = 20;
      // this.numGuys = map(this.socialcontent,1,5,1,5);
      this.myGuys = [];

      for (let i=0; i<30; i++) {
       this.myStars.push(new stars(random(0,width),random(0,height),random(10,30)));
      }

      for (let i = 0; i < 100; i++) {
        this.drops.push(new Raindrop());
      }

      for (let i=0; i<10; i++) {
        this.myFriends.push(new symbol(random(0,width),random(0,height),random(30,100),colorSelect()));
      }      

      for (let i = 0; i < this.numConfetti; i++) {
        this.myConfetti.push(new Particle());
      }

      for (let i = 0; i < 30; i++){
        this.myHearts.push(new heart(random(0,width),random(0,height),random(-0.5,-3),random(30,150)));
      }

      for (let i =0; i < this.numGuys; i++){
        this.myGuys.push(new guy(random(0,width),height * 8/10, random(40,150),random(0,1),this.guySpeed));
      }

      
    
      this.sun = new sun();
      

      this.size = map(this.vividness,1,7,50,200);
    }

    display(){
      
      background(this.color);

      if (this.checksun == true){
        this.sun.display();
        this.sun.update();
    }
      push();
      this.vinyl.display();
      pop();
      
      //will call the sun in top left corner if description has 'sun' or 'summer' in it
        

    //will call the starry night if the description has 'night' or star' in it
        if (this.checknight == true){
            background(0,200);
            for (let stars of this.myStars){
                stars.update();
                stars.display();
            }
           }  



    //calling confetti spinning
      // push();
      //   translate(width / 2, height / 2);
      //     for (let i = 0; i < this.numConfetti; i++) {
      //       this.myConfetti[i].update(this.swirlSpeed);
      //       this.myConfetti[i].display();
      // }
      // pop();
    
  
    if (this.checkfriends == true){
      for (let friend of this.myFriends){
        friend.display();
        
      }
    }
    
      push();
        noStroke();    
        fill(238,238,238);
            
            rect(width * 2/10 - 10, height * 1/10 - 10, 1000, 300, 10);
            textSize(24);
            if (textOpacity < 255){
            textOpacity += 0.25;
            }
            fill(38,38,38,textOpacity);
            // textAlign(CENTER);
            text(this.description,width * 2/10,height * 1/10,width-350,800);
        
              textSize(18);
              fill(255);
              textAlign(CENTER);
              
              text(this.song,width * 1/10,height * 5/10);
        pop();
      
        push();
        textSize(12);
        fill(255);
        text("record " + (index+1) + " of " + curmemarray.length,width * 1/20,height * 1/10);
        pop(0);

        if (this.checkrain == true){ 
          for (let drop of this.drops){
            drop.fall();
            drop.show();
        }
      }

      if (this.checklove == true){
        for (let heart of this.myHearts){
          heart.update();
          heart.display();
        }
      }

      push();
      drawSoundWave(width / 2, height * 5/8, 50, 0.5,.02, this.noise);
      pop();
      
      phase += map(this.arousal,1,5,0.01,0.03);
      noiseOffset += this.noiseOffset;
      
      for (let guy of this.myGuys){
        guy.update();
        guy.display();
      }
    }

    update(){
      this.xMap = map(mouseX,0,width,0,20);
      this.yMap = map(mouseY,0,height,0,20);

      if (this.valence == 1){
        this.color = color(78 + this.xMap,139 + this.yMap,212);
      } else if (this.valence == 2){
        this.color = color(152 + this.xMap,187 +this.yMap,230);
      } else if (this.valence ==3) {
        this.color = color(163 + this.xMap,214 + this.yMap,158);
      } else if (this.valence ==4){
        this.color = color(237,145 + this.xMap,145 + this.yMap)
      } else if (this.valence ==5){
        this.color = color(224,66 + this.xMap,66 +this.yMap);
      } 

    }

 
  }

class Particle {
    constructor() {
      this.angle = random(TWO_PI);
      this.radius = random(50, width);
      this.speed = random(0.005,0.01);
      this.color = color(random(200,247),random(150,200),random(30,60));
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

function colorSelect(){
      let myred = color(224, 66, 66);
      let myorange = color(236, 144, 16);
      let mygreen = color(103, 188, 95);
      let myblue = color(78, 139, 212)  ;
      let myColors = [];
      myColors.push(myred,myorange,mygreen,myblue);
      return myColors[Math.floor(Math.random() * myColors.length)]
    
    }

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    // Adjust canvas size based on window size
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){
    memoriesData = loadJSON("./json/selectedmems.json");
    drawnheart = loadImage('./images/heart.png');
    socialguy1 = loadImage('./images/guy1.png');
    socialguy2 = loadImage('./images/guy2.png');
  }

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

function negMem(){
  curmemarray = negativeMemories;
  isPosMem = false;
  isNegMem = true;
  textOpacity = 100;
  index = getRandomIndex(curmemarray);
  }

function posMem(){
  curmemarray = positiveMemories;
  isNegMem = false;
  isPosMem = true;
  textOpacity = 100;
  index = getRandomIndex(curmemarray);
  
}

function allMems(){
  curmemarray = allmemories;
  isPosMem = false;
  isNegMem = false;
  index = getRandomIndex(curmemarray);
  textOpacity = 100;
  phase = random(0,10);
}

function drawSoundWave(x, y, amplitude, frequency, speed, noiseStrength) {
  noFill();
  stroke(255, textOpacity);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i < width; i++) {
    let angle = map(i, 0, width, 0, TWO_PI * frequency);
    let yOffset = sin(angle + phase) * amplitude;
    let noiseValue = noise(i * noiseStrength, noiseOffset) * amplitude;
    let yPos = y + yOffset + noiseValue;
    vertex(i, yPos);
  }
  endShape();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  curmemarray = allmemories;
  button = createButton('sad records');
        button.mousePressed(negMem);
        button.position(width * 1/16,height*16/20);
        button.style('background-color', '#1B00FF');
        button.style('padding','16px 16px');
        button.style('text-align','center');
        button.style('font-size','12px');
        button.style('border-radius','2px');
  
    button = createButton('happy records');
        button.mousePressed(posMem);
        button.position(width * 1/16,height*18/20);
        button.style('background-color', '#ff3800');
        button.style('padding','16px 16px');
        button.style('text-align','center');
        button.style('font-size','12px');
        button.style('border-radius','2px');

        valslider = createSlider(0, 5, 3, 1);
        valslider.position(width/2,height/2);
        valslider.size(80);

        energyslider = createSlider(0, 5, 3, 1);
        energyslider.position(width/2,height/2 + 40);
        energyslider.size(80);

        importantslider = createSlider(0, 5, 3, 1);
        importantslider.position(width/2,height/2 + 80);
        importantslider.size(80);

        uniqueslider = createSlider(0, 5, 3, 1);
        uniqueslider.position(width/2,height/2 + 120);
        uniqueslider.size(80);

        valsearch = createButton("search valence");
        valsearch.position(width/2 + 80, height/2);
        valsearch.mousePressed(Filter);
      

    button = createButton('random record');
        button.mousePressed(allMems);
        button.position(width * 1/16,height*14/20);
        button.style('background-color', '#000000');
        button.style('padding','16px 16px');
        button.style('text-align','center');
        button.style('font-size','12px');
        button.style('border-radius','2px');

    myInput = createInput();
    myInput.position(width * 1/20, height * 11/20);

    search = createButton("search keyword");
    search.position(myInput.height + 10, height * 12/20);
    search.style('background-color','#000000');
    search.mousePressed(searchMemories);

    for (let i = 0; i < memoriesData.selectedmemories.length; i++) {
      let memData = memoriesData.selectedmemories[i];
      let mem = new Memory(memData.Title, memData.description, memData.vivid, memData.memvalence, memData.memenergy, memData.unique,memData.important,memData.social,memData.emo);
    
      allmemories.push(mem); // Add Memory object to array
      if (mem.valence <= 2) {
        negativeMemories.push(mem);
      } else if (mem.valence >=4) {
        positiveMemories.push(mem);
      }

      
      

    }

    for (let i = 0; i < allmemories.length; i++){
      allvinyls.push(new VinylRecord(100,100,100,allmemories[i].numGrooves,allmemories[i].color));
    }
}

function Filter(){
  let prevFilter = sliderFilter;
  sliderFilter = [];
  let valrating = valslider.value();
  let energyrating = energyslider.value();
  let importantrating = importantslider.value();
  let uniquerating = uniqueslider.value();
  isSliderFilter = true;
  

 filterLikert(valrating,energyrating,importantrating,uniquerating);

  if (sliderFilter.length > 0){
    curmemarray = sliderFilter;
    index = 0;
    test = '';
  }
  if (sliderFilter.length == 0){
    isSliderFilter = false;
    textSize(48);
    test = 'no results';
    // text('no results',width/2, height * 9/10);
    curmemarray = allmemories;
    index = 0;
  }

  // && allmemories[i].importance == importantrating && allmemories[i].uniqueness == uniquerating

}

function filterLikert(valence,arousal,importance,uniqueness){
  for (let i= 0; i < allmemories.length; i++){
    if(valence == 0 && arousal == 0 && importance ==0 && uniqueness == 0){
      sliderFilter = [];
    } else if (valence == 0 && arousal !== 0 && importance ==0 && uniqueness == 0){
      if(allmemories[i].arousal == arousal){
        sliderFilter.push(allmemories[i]);
      }
    } else if (valence !== 0 && arousal == 0 && importance == 0 && uniqueness == 0){
      if(allmemories[i].valence == valence){
        sliderFilter.push(allmemories[i]);
      }
    } else if (valence == 0 && arousal == 0 && importance !== 0 && uniqueness == 0){
      if(allmemories[i].importance == importance){
        sliderFilter.push(allmemories[i]);
      }
    }else if (valence == 0 && arousal == 0 && importance == 0 && uniqueness !== 0){
      if(allmemories[i].uniqueness == uniqueness){
        sliderFilter.push(allmemories[i]);
      } 
    }else if (valence !== 0 && arousal !== 0){
      if(allmemories[i].valence == valence && allmemories[i].arousal == arousal){
        sliderFilter.push(allmemories[i]);
      }
    }
    
  }  
}

function searchMemories(){
  curmemarray = allmemories;
  filteredMemories = [];
  index = 0;
  isFiltered = true;
  isSliderFilter = false;
  let keyword = myInput.value();

  test = keyword;
  filterMemories(keyword);

  if (filteredMemories.length > 0){
    curmemarray = filteredMemories;
    index = 0;
  } else {
    isFiltered = false;
    curmemarray = allmemories;
    index = 0;
    test = 'no results';
  }
}

function filterMemories(keyword){
  for (let i= 0; i < allmemories.length; i++){
    if(allmemories[i].description.toLowerCase().includes(keyword.toLowerCase())){
      filteredMemories.push(allmemories[i]);
    }
  }  
}


  function draw() {
    background(255,0,0);
    // if (isNegMem) {
    //   if (index < negativeMemories.length) {
    //     negativeMemories[index].update();
    //     negativeMemories[index].display();
    //   }
    // } else if(isPosMem) {
    //   if (index < positiveMemories.length) {
    //     positiveMemories[index].update();
    //     positiveMemories[index].display();
    //   }
    // } else if(isFiltered){
    //   filteredMemories[index].update();
    //   filteredMemories[index].display();
    // } 
    
    // else {
    //   allmemories[index].update();
    //   allmemories[index].display();
    // }

   if (isSliderFilter){
    sliderFilter[index].update();
    sliderFilter[index].display();
   } else {
    allmemories[index].update();
    allmemories[index].display();
   }
  
    
    text(test,width * 2/20, height* 2/20);

    // if (index < allvinyls.length){
    // allvinyls[index].display();
    // }
  
  }


  function keyPressed(){
    // if (keyCode == 32){
    //   index = getRandomIndex(allmemories);
    //   textOpacity = 100;
    // }

    if (keyCode === 80){
      posMem();
    }
    
    if (index == 0 ){
      if (keyCode == LEFT_ARROW){
        index = index;
      } else if (keyCode == RIGHT_ARROW){
        index++;
        textOpacity = 100;
      }
    } else if (index == curmemarray.length - 1){
      if (keyCode == RIGHT_ARROW){
        index = index;
      } else if (keyCode == LEFT_ARROW){
        index--;
        textOpacity = 100;
      }
    } else {
      if (keyCode == RIGHT_ARROW){
        index++;
        textOpacity = 100;
      } else if (keyCode == LEFT_ARROW){
        index--;
        textOpacity = 100;
      }
    }
    
  }