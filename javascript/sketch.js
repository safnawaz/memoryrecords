let memories;
let cued;
let index = 0;
let frame = 0;
let playMode = 'sustain';
let song;
let button;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  soundFormats('wav');
  song = loadSound('sound/Cut_2011_1.wav');
 
  let buttonColor = color(255);
  
  // button = createButton('Explore Memories');
  // button.style('background-color',buttonColor);
  // button.style('border', 'none');
  // button.style('text-align','center');
  // button.style('font-size','16px');
  // button.style('border-radius','4px');
  // button.position(width/2 - 70,height/2 - 10);
  // button.mousePressed();

  //chosen memories setting up, getting memories
  fetch("./json/memories.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    memories = data.memories;
    
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

  fetch("./json/cued.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    cued = data.cued;
    
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}


function draw() {

  let xMap = map(mouseX,0,width,0,100);
  let yMap = map(mouseY,0,height,0,100);

  let temporarymemory = memories[index];
  let tmenergy = temporarymemory.energy;
  let tmvividness = temporarymemory.vivid;
  let tmsong = temporarymemory.songname;
  let tmartist = temporarymemory.artist;
  let tmmemory = temporarymemory.description;
  let size = map(tmvividness,1,5,0,400);
  let increment = map(tmenergy,1,5,0.003,0.01);


  let tmvalence = temporarymemory.valence;
  let color;
  color = map(tmvalence,1,5,0,255);

  if (tmvalence == 1){
    background(xMap,yMap,255);
  } else if (tmvalence == 2){
    background(xMap,yMap,200);
  } else if (tmvalence ==3) {
    background(xMap,yMap,50);
  } else if (tmvalence ==4){
    background(200,xMap,yMap)
  } else if (tmvalence ==5){
    background(255,xMap,yMap);
  }


  
  
  
// making a change if word 'love' is detected in memory description
// let love = 'love';
// let m = match(tmmemory,love);  
// if (m == 'love'){
  //   background(240,20,90);
  // } else {
  //   background(100,83,210,200);
  // }

  textSize(60);
  fill(255,255,255,40);
  text(tmmemory,20,70,width-40,600);
  
  if (tmvalence <=3){

    stroke(xMap,yMap,200);
  } else {
  
    stroke(200,xMap,yMap);
  }
  

  translate(width/2,height/2);


  fill(255,150);
  strokeWeight(20);
  pulse = sin(frame)*size;
  ellipse(0,0,pulse,pulse);
  noStroke();
  
  push();
  rotate(frame*5);
  makeSymbol(0,0,100,100);
  pop();
  
 translate(-width/2,-height/2);
 textSize(20);
 fill(255);
 text(tmsong,20,30);
 textSize(16);
 fill(255,255,255,100);
 text(tmartist,20,50);
 text(index+1 + " of " + str(memories.length),20,70);



  frame = frame + increment;
  
  push();
  makeSymbol(mouseX,mouseY,50,50);
  pop();

}

function makeSymbol(xPosition,yPosition,sizeX,sizeY){
  push();
  fill(255);
  strokeWeight(5);
  stroke(255);
  arc(xPosition,yPosition,sizeX,sizeY,0,PI);
  fill(0,0);
  arc(xPosition,yPosition,sizeX,sizeY,PI,0);
  pop();
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

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}

function mousePressed(){
  makeSymbol(mouseX,mouseY+100, 45, 45);
  // text("test",mouseX,mouseY);
  // ellipse(mouseX,mouseY,50,50);
  // song.play();
}




