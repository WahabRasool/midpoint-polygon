//#mathober2024

const bgCol = "#447abd";
const gCol = "#a2c2e8";
const nGrid = 20;
let players;
let gSpace;
let polygon1;
let isE = true;

function setup() {
  w = max(400, min(windowWidth, windowHeight) * 0.9);
  describe(" ");
  players = [];
  createCanvas(w, w);
  describe(
    "A polygon with midpoint polygons iteratively drawn inside with alternating colors in a blueprint design."
  );
  rectMode(CENTER);
  polygon1 = [];
  n = int(random(3, 9));
  gSpace = (w / nGrid) * 0.95;
  angleMode(DEGREES);
  for (let i = 0; i < n; i++) {
    tmpR = random(3, 9);
    polygon1[i] = {
      x: tmpR * gSpace * cos((360 / n) * i),
      y: tmpR * gSpace * sin((360 / n) * i)
    };
  }
  r = (w * 0.82) / 2;
  d = w;
  textSize(16);
}

function draw() {
  isE = true;
  background(bgCol);
  translate(w / 2, w / 2);
  t = frameCount;
  rd = 10;
  let polygon2 = [];
  for (let i = 0; i < polygon1.length; i++) {
    polygon2[i] = {
      x: polygon1[i].x + (i / 2 + gSpace) * cos(t - i * 50),
      y: polygon1[i].y + (i / 2 + gSpace) * sin(t - i * 50)
    };
  }
  stroke(255, 255, 255);
  strokeWeight(0.5);
  plotPolygon(polygon2);
  makeMidPointPolygon(polygon2, gSpace);
  noStroke();
  fill(gCol);
  text("midpoint polygon", -w / 2 + 10, w / 2 - 5);
  drawGrid();
}
function plotPolygon(poly1) {
  if (isE) {
    fill(255, 255, 255, 150);
  } else {
    c = color(gCol);
    c.setAlpha(150);
    fill(c);
  }
  isE = !isE;
  beginShape();
  for (let i = 0; i < poly1.length; i++) {
    vertex(poly1[i].x, poly1[i].y);
    push();
    fill(gCol);
    circle(poly1[i].x, poly1[i].y, rd);
    pop();
  }
  endShape(CLOSE);
}
function makeMidPointPolygon(poly1, len) {
  leng = dist(poly1[0].x, poly1[0].y, 0, 0);
  cnt = 0;
  while (leng > len && cnt < 20) {
    tmpP = mp(poly1);
    plotPolygon(tmpP);
    poly1 = [];
    poly1 = tmpP;
    tmpL = leng;
    leng = dist(
      poly1[0].x,
      poly1[0].y,
      poly1[int(poly1.length / 2)].x,
      poly1[int(poly1.length / 2)].y
    );

    // console.log(leng)
    cnt++;
  }
}
function mp(poly3) {
  let poly2 = [];
  for (let i = 0; i < poly3.length - 1; i++) {
    poly2[i] = {
      x: (poly3[i].x + poly3[i + 1].x) / 2,
      y: (poly3[i].y + poly3[i + 1].y) / 2
    };
    poly2[poly3.length - 1] = {
      x: (poly3[0].x + poly3[poly3.length - 1].x) / 2,
      y: (poly3[0].y + poly3[poly3.length - 1].y) / 2
    };
  }

  return poly2;
}

function drawGrid() {
  gSpace = (w / nGrid) * 0.95;
  stroke(gCol);
  strokeWeight(0.3);
  for (let i = 1; i <= nGrid; i++) {
    for (let j = 1; j <= nGrid; j++) {
      line(
        -w / 2 + gSpace * i,
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace
      );
      line(
        -w / 2 + gSpace,
        -w / 2 + gSpace * i,
        w / 2 - gSpace,
        -w / 2 + gSpace * i
      );
    }
  }
  noFill();
  strokeWeight(3);
  rect(0, 0, w - 2 * gSpace);
}

function mousePressed() {
  setup();
  draw();
}
function windowResized() {
  setup();
  draw();
}
