let snake;
let food;
let gridSize = 20;

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  snake = new Snake();
  spawnFood();
}

function draw() {
  background(220);
  snake.update();
  snake.show();
  if (snake.eat(food)) {
    spawnFood();
  }
  drawFood(food);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.setDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDirection(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.setDirection(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDirection(1, 0);
  }
}

function spawnFood() {
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);
  let foodX = floor(random(cols)) * gridSize;
  let foodY = floor(random(rows)) * gridSize;
  food = createVector(foodX, foodY);
}

function drawFood(pos) {
  fill(255, 0, 0); // Red color for the food
  noStroke();
  ellipse(pos.x + gridSize / 2, pos.y + gridSize / 2, gridSize, gridSize);
}

class Snake {
  constructor() {
    this.body = [];
    this.body.push(createVector(width / 2, height / 2));
    this.xdir = 0;
    this.ydir = 0;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.push(head);
    this.body.shift();
    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    this.body[this.body.length - 1] = head;

    // Check if the snake's head is outside the canvas bounds
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      this.endGame();
    }
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }

  setDirection(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  grow() {
    let tail = this.body[0].copy();
    this.body.unshift(tail);
  }

  endGame() {
    // You can add your code here to handle the game ending, for example:
    noLoop(); // Stop the draw loop to freeze the game
    console.log("Game Over!");
  }
}
