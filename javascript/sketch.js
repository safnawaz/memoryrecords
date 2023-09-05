//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let memories;
let index = 1;
let frame = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  //no animation / interaction chart
  

  fetch("./json/memories.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    memories = data.memories;

    //using no Loop? you can just call your function once the data is loaded
    
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(100,83,210,200);
  let temporarymemory = memories[index];
  let tmenergy = temporarymemory.energy;
  let tmvalence = temporarymemory.valence;
  let tmvividness = temporarymemory.vivid;
  let color = map(tmvalence,1,5,0,175);
  let size = map(tmvividness,1,5,0,400);
  let increment = map(tmenergy,1,5,0.005,0.03);
  let tmsong = temporarymemory.songname;
  let tmartist = temporarymemory.artist;
  let tmmemory = temporarymemory.description;

  textSize(60);
  fill(255,255,255,30);
  text(tmmemory,20,70,width-40,600);
  

  translate(width/2,height/2);
  noStroke();
  fill(255,color,0);
  pulse = sin(frame)*size;
  ellipse(0,0,pulse,pulse);
  
 translate(-width/2,-height/2);
 textSize(20);
 fill(255);
 text(tmsong,20,30);
 textSize(16);
 fill(255,255,255,100);
 text(tmartist,20,50);
 text(index,20,70);




  frame = frame + increment;
  
  if(index == 26){
    index = 0;
  }
}

function keyPressed(){
  if (keyCode == RIGHT_ARROW){
    index++;
  } else if (keyCode == LEFT_ARROW){
    index--;
  }

}

function drawChart(){
  
 
  
  
  // let total = 0; 
  // for (let i= 0 ; i<breakfast.length; i++) {
  //   total += breakfast[i].amount;
  // }

  // let centreX = width/2;
  // let centreY = height/2; 
  // let diam = 300;
  // let angleStart = TWO_PI*0.75; 

  // for (let i=0; i<breakfast.length; i++) {

  //   let item = breakfast[i];

  //   let itemFraction = item.amount/total;
  //   let itemAngle = itemFraction * TWO_PI; 
  //   let angleEnd = angleStart + itemAngle;

  //   //normal pie
  //   fill(item.color);
  //   stroke(0, 0, 0); 
  //   strokeWeight(1); 
  //   strokeJoin(ROUND); 
  //   arc(centreX, centreY, diam, diam, angleStart, angleEnd, PIE); //PIE creates closed slices the the center


  //   noStroke();
  //   fill(0); 
  //   push();
  //   translate(centreX, centreY); 
  //   rotate(angleEnd); 
  //   textAlign(RIGHT, BOTTOM); 
  //   //normal pie
  //   text(item.ingredient, diam/2 - 20, -8); 

  //   pop();

  //   //update the angle start before the next iteration
  //   angleStart += itemAngle;
  // }

}
