let cnv;
let memories = [];
let gridSize = 10; // Number of rows and columns in the grid
let gridSpacing = 50; // Spacing between grid elements
let myVinyls = [];

let sorted = false;
let button;
let buttontext = 'Sort Records';


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
    centerCanvas();
  
    // for (let i = 0; i<10; i ++){
    //   myVinyls.push(new Vinyl(,colorSelect()));
    // }
      
      gridSpacing = width/6;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          // Calculate x and y position based on row and column index
          let x = j * gridSpacing + gridSpacing / 2; // Add half spacing to center objects
          let y = i * gridSpacing + gridSpacing / 2;

          // Calculate the index in memories array based on grid position
          let index = i * gridSize + j;

          if (index < 30) {
            // Create a new vinyl record with properties from the corresponding memory
            myVinyls.push(new Vinyl(x, y, colorSelect()));
          }
        }
      }
    

      button = createButton(buttontext);
        button.mousePressed(recordSorter);
        button.position(width * 1/16,height*16/20);
        button.style('background-color', '#1B00FF');
        button.style('padding','16px 16px');
        button.style('text-align','center');
        button.style('font-size','12px');
        button.style('border-radius','2px');
    }
  
    function recordSorter(){
      sorted = !sorted;
      buttontext = sorted ? 'Unsort Records' : 'Sort Records'; // Update button text based on sorting state
      button.html(buttontext); // Update button text

      if (sorted) {
        // Place records in a grid
        for (let i = 0; i < myVinyls.length; i++) {
          let col = i % gridSize;
          let row = floor(i / gridSize);
          let x = col * gridSpacing + gridSpacing / 2;
          let y = row * gridSpacing + gridSpacing / 2;
          myVinyls[i].x = x;
          myVinyls[i].y = y;
        }
      } else {
        // Place records randomly
        for (let i = 0; i < myVinyls.length; i++) {
          myVinyls[i].x = random(0, width);
          myVinyls[i].y = random(0, height);
        }
      }
    }
    
   
    
  function draw() {
    background(238,238,238);

    push();  
    textAlign(CENTER,CENTER);
    translate(width/2,height/2);
    noFill();
    strokeWeight(3);
    stroke(255,0,0);
    ellipse(-190,0,40);
    fill(255,0,0);
    noStroke();
    ellipse(-190 ,0,30);
    textSize(48);
    fill(38,38,38);
    text("record memory",0,0);
    pop(); 


      for (let i = 0; i < myVinyls.length; i ++){
        myVinyls[i].display();
        myVinyls[i].update();
      }

  }


     