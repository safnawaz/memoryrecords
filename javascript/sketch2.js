let selmemories;
let cuedmemories;
let memarray;
let index = 0;
let frame = 0;
let curmemtype = 0;
let button;
let memTime = true;


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
      
      
      this.xPos += this.xMotion;
      this.yPos += this.yMotion;
      }  
    
    }
let mySymbols = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // background(255,0,0);
    fetch("./json/selectedmems.json").then(function(response) {
        return response.json();
      }).then(function(data) {
    
        console.log(data);
        selmemories = data.selectedmemories;
        
      }).catch(function(err) {
        console.log(`Something went wrong: ${err}`);
      });

      fetch("./json/cuedmems.json").then(function(response) {
        return response.json();
      }).then(function(data) {
    
        console.log(data);
        cuedmemories = data.cuedmemories;
        
      }).catch(function(err) {
        console.log(`Something went wrong: ${err}`);
      });

      button = createButton('Switch Memories');
      button.mousePressed(memorySwitch);
      button.position(10.5*width/12,height/24);
        // button = createButton('Explore Memories');
        // button.style('background-color',buttonColor);
        button.style('border', 'none');
        button.style('text-align','center');
        button.style('font-size','16px');
        button.style('border-radius','4px');
        // button.position(width/2 - 70,height/2 - 10);
        // button.mousePressed(memoryStart);

        // textAlign(CENTER);
        
        sel = createSelect();
        sel.position(10.5*width/12,height*2/24);
        sel.style('border', 'none');
      
        sel.option('1');
        sel.option('2');
        sel.option('3');
        sel.selected('1');
        sel.changed(memorySelect);

        // for (let i=0; i<10; i++) {
        //     mySymbols.push(new symbol(random(0,width),random(0,height),random(30,100),color(255,random(0,255),random(0,255))));
        //   }
          
          
  }
  function memorySelect() {
    let item = sel.value();
    index = item-1;
    
  }

function memorySwitch(){
    if (curmemtype == 1){
        curmemtype = 0;
    } else if (curmemtype == 0){
        curmemtype = 1;
    }
}

function memoryStart(){
    memTime = true;
    button.mousePressed(function(){button.remove()});
}

function makeChosenMem(memoryArray){
  
    let chosenMemory = memoryArray[index];
    let chosenVividness = chosenMemory.vivid;
    let chosenEnergy = chosenMemory.memenergy;
    let chosenValence = chosenMemory.memvalence;
    let chosenSong = chosenMemory.Title;
    let chosenArtist = chosenMemory.Artist;
    let chosenDesc = chosenMemory.description;
    
    let size = map(chosenVividness,1,5,0,500)
    let growth = map(chosenEnergy,1,5,0.003,0.01)
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
    
    
    textSize(60);
    fill(255,255,255,30);
    text(chosenDesc,20,70,width-40,600);
    
    push();
        translate(width/2,height/2);
        rotate(frame*5);
        makeSymbol(0,0,90,90);
    pop();

    push();
        fill(255,110);
        noStroke();
        translate(width/2,height/2);
        ellipse(0,0,100+ abs(pulse),100+ abs(pulse));
        translate(-width/2,-height/2);
        ellipse(mouseX,mouseY,100+ abs(pulse),100+ abs(pulse));
    pop();
    
    push();
    textSize(20);
    fill(255);
    text(chosenSong,20,30);
    textSize(16);
    fill(255,255,255,100);
    text(chosenArtist,20,50);
    text(index+1 + " of " + str(memoryArray.length),20,70);
    pop();
    
    
    

    frame = frame + growth;
  
    
}

function draw(){
    background(220);
    
    if (curmemtype == 0){
        memarray = selmemories;

    } else {
        memarray = cuedmemories;
    }

    makeChosenMem(memarray);
      // for (let symbol of mySymbols){
      //   symbol.display();
      // }
    
 
   
    // frame++;
    
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

  function addGui(){
    if(curmemtype == 0)
    {
        button = createButton("Chosen Songs");
    }else if(curmemtype == 1){
        button = createButton("Billboard Songs");
    }

    button.addClass("button");
    button.mousePressed(handleButtonPress); 
  }


