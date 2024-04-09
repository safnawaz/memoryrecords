let selmemories;
let memarray;
let index = 0;
let frame = 0;
let curmemtype = 0;
let button;
let carX = 100;
let cnv;
let textToType = "Hello, world! This is a typewriter effect in p5.js";
let typedText = "";
let textindex = 0;
let typingSpeed = 1;


function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
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
let mySymbols = [];


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
      
    

        // button = createButton('Random Memory');
        // button.mousePressed(randomMem);
        // button.position(windowWidth/48,height*12/24);
        // button.style('background-color', '#000000');
        // button.style('padding','16px 16px');
        // button.style('border', 'none');
        // button.style('text-align','center');
        // button.style('font-size','16px');
        // button.style('border-radius','2px');



        for (let i=0; i<10; i++) {
            mySymbols.push(new symbol(random(0,width),random(0,height),random(30,100),color(Math.round(random()))));
          }
      
          
  }

  function randomMem(){
    index = Math.round(random(0,selmemories.length));
  }

function makeChosenMem(memoryArray){
  
    let chosenMemory = memoryArray[index];
    let chosenVividness = chosenMemory.vivid;
    let chosenEnergy = chosenMemory.memenergy;
    let chosenValence = chosenMemory.memvalence;
    let chosenSong = chosenMemory.Title;
    let chosenArtist = chosenMemory.Artist;
    let chosenDesc = chosenMemory.description;
    let person = 'friend';
    let checkPerson = match(chosenDesc,person);


    let size = map(chosenVividness,1,5,0,300)
    let growth = map(chosenEnergy,1,5,0.005,0.015)
    let pulse = sin(frame)*size;

    let color = map(chosenValence,1,5,0,255);
    let xMap = map(mouseX,0,width,0,100);
    let yMap = map(mouseY,0,height,0,100);
    

   

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
    
    
    textSize(40);
    fill(255,255,255,100);
    text(chosenDesc,200,90,width-200,600);
    // fill(255,255,255,255);
    // text(typedText, 200,90,width-200,600);
    // if (textindex < chosenDesc.length) {
    //   // Add the next character to the typed text
    //   if (pauseCounter === 0 && chosenDesc.charAt(textindex) !== '.') {
    //     typedText += chosenDesc.charAt(textindex);
    //   }
    //   index += typingSpeed;
      
    //   // Check if the current character is a period
    //   if (chosenDesc.charAt(textindex - 1) === '.') {
    //     pauseCounter = pauseDuration;
    //   }
    // }
    
    // Pause after encountering a period
    // if (pauseCounter > 0) {
    //   pauseCounter--;
    // }

    // if (textindex < chosenDesc.length) {
    //   // Add the next character to the typed text
    //   typedText += chosenDesc.charAt(textindex);
    //   textindex += typingSpeed;
    // }
    
    push();
        translate(width/2,height/2);
        rotate(frame*5);
        makeSymbol(0,0,90,90);
    pop();

    push();
        fill(255,100);
        noStroke();
        translate(width/2,height/2);
        ellipse(0,0,100+ abs(pulse),100+ abs(pulse));
        translate(-width/2,-height/2);
        ellipse(mouseX,mouseY,40,40);
    pop();
    
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
    
    // if (checkCar == 'car'){
    //   theCar.display();
    // } 

    frame = frame + growth;
  
    
}

function draw(){
    background(220);
    memarray = selmemories;
    makeChosenMem(memarray);  
   
}

function keyPressed(){

    if (index == 0){
      if (keyCode == RIGHT_ARROW){
        index++;
      }
    } else if (index == memarray.length-1){
      if (keyCode == LEFT_ARROW){
        index--;
      }
    } else {
      if (keyCode == RIGHT_ARROW){
        index++;
      } else {
      if (keyCode == LEFT_ARROW){
        index--;
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
