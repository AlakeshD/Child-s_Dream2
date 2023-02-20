let startX;
let startY;
let endX;
let endY;

let deltaStartX;
let deltaStartY;
let deltaEndX;
let deltaEndY;
let dotArray = [];
let cap = 500;
let tempX;
let tempY;
let ready = true;
let r;
let g;
let b;
let timer = 20;
let k = 0;
let clr;

var images = [];
var darkImages = [];

function preload() {
  let darkcook = loadImage("Black\\cook_black.png");
  let darkdoctor = loadImage("Black\\doctor_black.png");
  let darkengineer = loadImage("Black\\engineer_black.png");
  let darknurse = loadImage("Black\\nurse_black.png");
  let darkpainter = loadImage("Black\\painter_black.png");
  let darkstudent = loadImage("Black\\student_black.png");

  let cook = loadImage("resources\\cook.png");
  let doctor = loadImage("resources\\doctor.png");
  let engineer = loadImage("resources\\engineer.png");
  let nurse = loadImage("resources\\nurse.png");
  let painter = loadImage("resources\\painter.png");
  let student = loadImage("resources\\student.png");

  images = [cook, doctor, engineer, nurse, painter, student];
  darkImages = [
    darkcook,
    darkdoctor,
    darkengineer,
    darknurse,
    darkpainter,
    darkstudent,
  ];
}

function setup() {
  createCanvas(400, 400);
  startX = random(width);
  startY = random(height);
  endX = random(width);
  endY = random(height);

  const range = 10;
  deltaStartX = random(-range, range);
  deltaStartY = random(-range, range);
  deltaEndX = random(-range, range);
  deltaEndY = random(-range, range);

  dotArray.push(new Dot(startX, startY, endX, endY));
  noFill();
  background(0);

  setInterval(() => {
    timer = 0;
  }, 20000);
}

const callDrawFunction = (array) => {
  array.forEach((element) => {
    element.showLine();
  });
};

function draw() {
  if (ready === true) {
    if (timer !== 0) {
      background(255);
      callDrawFunction(dotArray);

      if (startX < 0 || startX > width) {
        deltaStartX *= -1;
      }

      if (startY < 0 || startY > height) {
        deltaStartY *= -1;
      }

      if (endX < 0 || endX > width) {
        deltaEndX *= -1;
      }

      if (endY < 0 || endY > height) {
        deltaEndY *= -1;
      }
      startX += deltaStartX;
      startY += deltaStartY;
      endX += deltaEndX;
      endY += deltaEndY;
      dotArray.push(new Dot(startX, startY, endX, endY));

      if (dotArray.length > cap) {
        dotArray.splice(0, 1);
      }

      image(images[k], 80, 30);
    } else {
      dotArray = [];
      background(255);
      timer = 20;
      if (k < 5) {
        k++;
      } else {
        k = 0;
      }
    }
  }
}

function touchStarted() {
  background(255);
  timer = 0;
  image(darkImages[k], 80, 30);
  ready = false;
}

function mouseReleased() {
  image(images[k], 80, 30);
  timer = 20;
  ready = true;
}

class Dot {
  constructor(SX, SY, EX, EY) {
    this.startX = SX;
    this.startY = SX;
    this.endX = EX;
    this.endY = EY;
    //  this.clr = color(random(0, 200), random(0, 200), random(0, 200), 100);
  }

  clr = color(random(0, 200), random(0, 200), random(0, 200), 100);

  showLine() {
    push();

    stroke(this.clr);

    strokeWeight(3);
    line(this.startX, this.startY, this.endX, this.endY);
    //   curve(this.startX, this.startY, this.startX+100, this.startY+100, this.startX+200, this.startY+200 this.endX, this.endY)
    pop();
  }
}
