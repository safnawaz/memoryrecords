let memories;
let index = 0;
let frame = 0;
let button;
let memTime = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);
    fetch("./json/memories.json").then(function(response) {
        return response.json();
      }).then(function(data) {
    
        console.log(data);
        memories = data.memories;
        
      }).catch(function(err) {
        console.log(`Something went wrong: ${err}`);
      });

        // button = createButton('Explore Memories');
        // button.style('background-color',buttonColor);
        // button.style('border', 'none');
        // button.style('text-align','center');
        // button.style('font-size','16px');
        // button.style('border-radius','4px');
        // button.position(width/2 - 70,height/2 - 10);
        // button.mousePressed(memoryStart);
        

      
  }

function memoryStart(){
    memTime = true;
    button.mousePressed(function(){button.remove()});
}

function makeChosenMem(memoryArray){
    let chosenMemory = memoryArray[index];
    let chosenVividness = chosenMemory.vivid;
    let chosenEnergy = chosenMemory.energy;
    let chosenValence = chosenMemory.valence;
    let chosenSong = chosenMemory.songname;
    let chosenArtist = chosenMemory.artist;
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
        // rotate(frame);
        makeSymbol(width/2,height/2,90,90);
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
    text(index+1 + " of " + str(memories.length),20,70);
    pop();

    frame = frame + growth;
  
    
}

function draw(){
    if (memTime == true){
        makeChosenMem(memories);
    }
  

}

function keyPressed(){

    if (index == 0){
      if (keyCode == RIGHT_ARROW){
        index++;
      }
    } else if (index == memories.length-1){
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

