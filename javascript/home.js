let button;
let blueness = 255;
let word = "I REMEMBER...";
let a = 100;
let frame = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
  
  }

function draw(){
    
    let redness = map(mouseX,0,width,0,255);
    let greenness = map(mouseY,0,height,0,255);
    let xPos = mouseX;
    let yPos = mouseY;
    background(redness,greenness,blueness); 
    

    fill(255,255,255,a);
    textSize(20);  
    textAlign(CENTER); 
    text(word, xPos,yPos);

    makeWhite();
    wordDrop();


    frame++;
}

function makeWhite (){
    if (mouseIsPressed == true){
        a = 255;
    } else {
        a = 100;
    }
}

function wordDrop(){
    text("i remember...",random(0,width),random(0,height));
}



function colorChange(){
    if (blueness == 255){
        blueness = 0;
    } else {
        blueness = 255;
    }
}