let cnv;
let memories = [];
let gridSize = 10; // Grid dimensions
let gridSpacing = 50; // Space between grid elements
let myVinyls = [];
let record = false;
let sorted = false;
let button;
let buttonText = 'Sort Records';

function setupContainers() {
    // Root container for responsive layout
    const root = document.getElementById("root");
    root.style.display = "flex";
    root.style.flexDirection = "column";
    root.style.alignItems = "center";
    root.style.padding = "10px"; // Padding on sides for spacing

    // Canvas container
    const canvasContainer = document.createElement("div");
    canvasContainer.id = "canvasContainer";
    canvasContainer.style.position = "relative";
    canvasContainer.style.padding = "20px";
    canvasContainer.style.boxSizing = "border-box";
    canvasContainer.style.maxWidth = "90%";
    root.appendChild(canvasContainer);

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.marginTop = "20px";
    root.appendChild(buttonContainer);

    // Create the canvas
    cnv = createCanvas(windowWidth * 0.9, windowHeight * 0.8);
    cnv.parent("canvasContainer");

    // Create the button
    button = createButton(buttonText);
    button.mousePressed(toggleRecordSort);
    button.style("padding", "12px 12px");
    button.style("background-color", "#262626");
    button.style("color", "#eee");
    button.style("font-family", "Sometype Mono");
    button.style("border", "2px solid rgb(238,238,238)");
    button.style("border-radius", "10px");
    button.parent(buttonContainer);
}

// Function to update canvas dimensions responsively
function resizeCanvasOnResize() {
    resizeCanvas(windowWidth * 0.9, windowHeight * 0.8);
    for (let vinyl of myVinyls) {
        vinyl.updatePosition();
    }
}

// Setup function
function setup() {
    setupContainers();
    centerCanvas();
    initializeVinyls();
    setInterval(recording, 500);
}

// Vinyl class and grid setup
class Vinyl {
    constructor(x_, y_, labelcolor) {
        this.x = sorted ? x_ : random(0, width);
        this.y = sorted ? y_ : random(0, height);
        this.radius = 100;
        this.label = labelcolor;
        this.maxSpeed = 5;
    }

    display() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(28, 28, 28);
        ellipse(0, 0, this.radius * 2);
        fill(this.label);
        ellipse(0, 0, this.radius * 0.7);
        fill(0);
        ellipse(0, 0, this.radius * 0.1);
        pop();
    }

    update() {
        let d = dist(this.x, this.y, mouseX, mouseY);
        if (d < 100) {
            let angle = atan2(this.y - mouseY, this.x - mouseX);
            this.x += cos(angle) * this.maxSpeed * (100 / d);
            this.y += sin(angle) * this.maxSpeed * (100 / d);
        }
    }

    updatePosition() {
        this.x = sorted ? this.x : random(0, width);
        this.y = sorted ? this.y : random(0, height);
    }
}

// Initialize vinyl records in a grid layout
function initializeVinyls() {
    gridSpacing = width / 6;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let x = j * gridSpacing + gridSpacing / 2;
            let y = i * gridSpacing + gridSpacing / 2;
            let index = i * gridSize + j;
            if (index < 30) {
                myVinyls.push(new Vinyl(x, y, colorSelect()));
            }
        }
    }
}

// Record sorting function
function toggleRecordSort() {
    sorted = !sorted;
    buttonText = sorted ? "Unsort Records" : "Sort Records";
    button.html(buttonText);

    if (sorted) {
        for (let i = 0; i < myVinyls.length; i++) {
            let col = i % gridSize;
            let row = floor(i / gridSize);
            myVinyls[i].x = col * gridSpacing + gridSpacing / 2;
            myVinyls[i].y = row * gridSpacing + gridSpacing / 2;
        }
    } else {
        myVinyls.forEach(vinyl => {
            vinyl.x = random(0, width);
            vinyl.y = random(0, height);
        });
    }
}

function colorSelect() {
    let colors = [color(224, 66, 66), color(236, 144, 16), color(103, 188, 95), color(78, 139, 212)];
    return colors[Math.floor(Math.random() * colors.length)];
}

function recording() {
    record = !record;
}

function draw() {
    background("#98BBE6");
    if (record) {
        fill(255, 0, 0);
        noStroke();
        ellipse(width / 2 - 210, height / 2, 30);
    }
    myVinyls.forEach(vinyl => {
        vinyl.display();
        vinyl.update();
    });
}

// Handle resizing for responsive design
function windowResized() {
    resizeCanvasOnResize();
}
