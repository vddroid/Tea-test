let playerOne = document.querySelector(".player1");
let playerTwo = document.querySelector(".player2");

//define canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//random no.
function random(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

//Ball constructor
function Ball(x, y, velX, velY, size, color, exist) {
     this.x = x;
     this.y = y;
     this.velX = velX;
     this.velY = velY;
     this.exist = exist;
     this.color = color;
     this.size = size;
}

//Ball methods
Ball.prototype.draw = function () {
     ctx.beginPath();
     ctx.fillStyle = this.color;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.fill();
};
Ball.prototype.update = function () {
     this.x += this.velX;
     this.y += this.velY;

     if (this.x + this.size >= width) {
          this.velX = -this.velX;
     }
     if (this.x - this.size <= 0) {
          this.velX = -this.velX;
     }
     if (this.y + this.size >= height) {
          this.velY = -this.velY;
     }
     if (this.y - this.size <= 0) {
          this.velY = -this.velY;
     }
};
Ball.prototype.collision = function () {
     for (let i = 0; i < balls.length; i++) {
          if (!(this === balls[i])) {
               const dx = this.x - balls[i].x;
               const dy = this.y - balls[i].y;
               const distance = Math.sqrt(dx * dx + dy * dy);

               if (distance < this.size + balls[i].size && balls[i].exist) {
                    balls[i].color = this.color = `rgb(${random(
                         0,
                         255
                    )},${random(0, 255)},${random(0, 255)})`;
               }
          }
     }
};

//Blackhole constructor
function Blackhole(x, y, velX, velY, size, color, exist) {
     Ball.call(this, x, y, velX, velY, exist);
     this.size = size;
     this.color = color;
}
Blackhole.prototype.draw = function () {
     ctx.beginPath();
     ctx.strokeStyle = this.color;
     ctx.lineWidth = 3;
     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
     ctx.stroke();
};
Blackhole.prototype.checkBound = function () {
     if (this.x + this.size >= width) {
          this.x -= this.size;
     }
     if (this.x - this.size <= 0) {
          this.x += this.size;
     }
     if (this.y + this.size >= height) {
          this.y -= this.size;
     }
     if (this.y - this.size <= 0) {
          this.y += this.size;
     }
};
Blackhole.prototype.collision = function () {
     for (let i = 0; i < balls.length; i++) {
          if (balls[i].exist) {
               const dx = this.x - balls[i].x;
               const dy = this.y - balls[i].y;
               const distance = Math.sqrt(dx * dx + dy * dy);

               if (distance < this.size + balls[i].size && balls[i].exist) {
                    balls[i].exist = false;
                    countOne++;
                    playerOne.textContent = "Player 1 ball count: " + countOne;
               }
          }
     }
};

Blackhole.prototype.control = function () {
     let _this = this;
     window.addEventListener("keydown", keyDownHandler);
     window.addEventListener("keyup", keyUpHandler, false);

     if (rightPressed) {
          _this.x += _this.velX;
     } else if (leftPressed) {
          _this.x -= _this.velX;
     }
     if (downPressed) {
          _this.y += _this.velY;
     } else if (upPressed) {
          _this.y -= _this.velY;
     }
};

//Redhole constructor
Redhole.prototype = Object.create(Blackhole.prototype); // copy Blackhole prototypes into Redhole prototypes
Redhole.prototype.constructor = Redhole; // define Redhole constructor to use its own, not Blackhole's

function Redhole(x, y, velX, velY, size, color, exist) {
     Ball.call(this, x, y, velX, velY, exist);
     this.size = size;
     this.color = color;
}

//define Redhole own prototype collision of second player
Redhole.prototype.collision = function () {
     for (let i = 0; i < balls.length; i++) {
          if (balls[i].exist) {
               const dx = this.x - balls[i].x;
               const dy = this.y - balls[i].y;
               const distance = Math.sqrt(dx * dx + dy * dy);

               if (distance < this.size + balls[i].size && balls[i].exist) {
                    balls[i].exist = false;
                    countTwo++;
                    playerTwo.textContent = "Player 2 ball count: " + countTwo;
               }
          }
     }
};
Redhole.prototype.control = function () {
     let _this = this;
     window.addEventListener("keydown", keyDownHandler);
     window.addEventListener("keyup", keyUpHandler, false);

     if (rightTwoPressed) {
          _this.x += _this.velX;
     } else if (leftTwoPressed) {
          _this.x -= _this.velX;
     }
     if (downTwoPressed) {
          _this.y += _this.velY;
     } else if (upTwoPressed) {
          _this.y -= _this.velY;
     }
};

let rightPressed = false;
let leftPressed = false;
let downPressed = false;
let upPressed = false;

let rightTwoPressed = false;
let leftTwoPressed = false;
let downTwoPressed = false;
let upTwoPressed = false;

function keyDownHandler(e) {
     if (e.keyCode === 65 /* a */) {
          leftPressed = true;
     } else if (e.keyCode === 68 /* d */) {
          rightPressed = true;
     }
     if (e.keyCode === 87 /* w */) {
          upPressed = true;
     } else if (e.keyCode === 83 /* s */) {
          downPressed = true;
     }

     //player 2 control
     if (e.keyCode === 37) {
          leftTwoPressed = true;
     } else if (e.keyCode === 39) {
          rightTwoPressed = true;
     }
     if (e.keyCode === 38) {
          upTwoPressed = true;
     } else if (e.keyCode === 40) {
          downTwoPressed = true;
     }
}

function keyUpHandler(e) {
     if (e.keyCode === 65 /* a */) {
          leftPressed = false;
     } else if (e.keyCode === 68 /* d */) {
          rightPressed = false;
     }
     if (e.keyCode === 87 /* w */) {
          upPressed = false;
     } else if (e.keyCode === 83 /* s */) {
          downPressed = false;
     }

     //player 2 control
     if (e.keyCode === 37) {
          leftTwoPressed = false;
     } else if (e.keyCode === 39) {
          rightTwoPressed = false;
     }
     if (e.keyCode === 38) {
          upTwoPressed = false;
     } else if (e.keyCode === 40) {
          downTwoPressed = false;
     }
}

//create Blackhole and Redhole
let countOne = 0;
let countTwo = 0;

let hole = new Blackhole(
     random(0, width),
     random(0, height),
     10,
     10,
     20,
     "white",
     true
);
let holeTwo = new Redhole(
     random(0, width),
     random(0, height),
     10,
     10,
     20,
     "red",
     true
);

// array to store balls
let balls = [];
while (balls.length < 20) {
     let size = random(10, 20);
     let ball = new Ball(
          random(0, width),
          random(0, height),
          random(1, 7),
          random(1, 7),
          size,
          `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
          true
     );
     balls.push(ball);
}

//draw balls, holes and controls
function loop() {
     ctx.fillStyle = "rgb(0,0,0, .5)";
     ctx.fillRect(0, 0, width, height);

     for (let i = 0; i < balls.length; i++) {
          if (balls[i].exist) {
               balls[i].draw();
               balls[i].update();
               balls[i].collision();
          }
     }
     hole.checkBound();
     hole.draw();
     hole.collision();
     hole.control();

     holeTwo.checkBound();
     holeTwo.draw();
     holeTwo.collision();
     holeTwo.control();

     requestAnimationFrame(loop);
}
loop();
