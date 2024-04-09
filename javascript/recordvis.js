let cnv;
let memories = [];
let gridSize = 10; // Number of rows and columns in the grid
let gridSpacing = 50; // Spacing between grid elements
let vinyl;
let myVinyls = [];
let numVinyls = 50;
let hueAngle = 210;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  // Adjust canvas size based on window size
  resizeCanvas(windowWidth, windowHeight);
}

class Memory {
  constructor(Title, description, vivid, memvalence, memenergy,unique) {
    this.songName = Title;
    this.description = description;
    this.vividness = vivid;
    this.valence = memvalence;
    this.arousal = memenergy;
    this.uniqueness = unique;


    this.numGrooves = map(this.vividness, 1, 7, 0.4, 0.1); // Adjust the range as needed
    if (this.valence == 5){
      this.labelColor = color(237, 145, 145);
    } else if (this.valence == 4){
      this.labelColor = color(224, 66, 66);
    } else if (this.valence == 3){
      this.labelColor = color(103, 188, 95);
    } else if (this.valence == 2){
      this.labelColor = color(152, 187, 230);
    }else if (this.valence == 1){
      this.labelColor = color(78, 139, 212);
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


function preload(){
  memoriesData = loadJSON("./json/selectedmems.json");

}


function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();


      for (let i = 0; i < memoriesData.selectedmemories.length; i++) {
        let memData = memoriesData.selectedmemories[i];
        let mem = new Memory(memData.Title, memData.description, memData.vivid, memData.memvalence, memData.memenergy, memData.unique);
        memories.push(mem); // Add Memory object to array
      }
      
      gridSpacing = width/5;

      for (let i = 0;i < memories.length; i++){
        myVinyls.push(new VinylRecord(random(0,width),random(0,height), 100, memories[i].numGrooves, memories[i].labelColor));
      }

      // for (let i = 0; i < gridSize; i++) {
      //   for (let j = 0; j < gridSize; j++) {
      //     // Calculate x and y position based on row and column index
      //     let x = j * gridSpacing + gridSpacing / 2; // Add half spacing to center objects
      //     let y = i * gridSpacing + gridSpacing / 2;

      //     // Calculate the index in memories array based on grid position
      //     let index = i * gridSize + j;

      //     if (index < memories.length) {
      //       // Create a new vinyl record with properties from the corresponding memory
      //       myVinyls.push(new VinylRecord(x, y, 100, memories[index].numGrooves, memories[index].labelColor));
      //     }
      //   }
      // }
    }
  
  function draw() {
    // background(220,0,0);
    // push();
    // colorMode(HSB, 360, 100, 100);
    // hueAngle += 0.1;
    // if (hueAngle >= 270) {
    //   hueAngle = 210; // Reset angle when it reaches 360
    // }
    
    // // Calculate the color based on the current hue angle
    // let bgColor = color(hueAngle, 100, 100);
    // background(bgColor);
    // pop();

    push();  
    textAlign(CENTER,CENTER);
    translate(width/2,height/2);
    textSize(48);
    fill(255);
    text("Submit Memory",0,0);
    pop(); 

    // if (keyIsPressed && key === 'v') {
    //   // Display only memories with a vividness score of 5
    //   for (let memory of memories) {
    //     if (memory.vividness === 5) {
    //       fill(0);
    //       ellipse(width/2,height/2,100);
    //       // Display the memory
    //       // You can modify this part according to how you want to display the memory
    //       console.log(memory.Title, memory.description);
    //     }
    //   }
    // } 
    for (let i = 0; i < myVinyls.length; i++) {
      myVinyls[i].display();
      myVinyls[i].update();
      
      
  }   
    

  }