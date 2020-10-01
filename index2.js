// console.log(Math.floor(Math.random() * 100))

const numBalls = 13;
const spring = 0.05;
const gravity = 0;
const friction = -0.9;
const balls = [];
const lineColor = [0, 0, 0];
const backgroundColor = [230,220,190];
const activeLineColor = [190, 20, 110];
const lineWidth = 3;
const init_impulse = 10;


function setup() {
  createCanvas(900, 900);
  background(backgroundColor);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls,
      [random(255),random(255),random(255)]
    );
  }
  noStroke();
  fill(255, 204);
}

function draw() {
  background(backgroundColor);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
  drawLine(leftEdge);
  drawLine(rightEdge);
//   drawLine(topEdge_2);
//   drawLine(topEdge_1);
//   drawLine(topEdge);
//   drawLine(bottomEdge);
  drawLine(bottomEdge);

}
const leftEdge = {
    x1: 200,
    y1: 200,
    x2: 200,
    y2: 800,
    color: lineColor,
    width: lineWidth,

}

const rightEdge = {
    x1: 800,
    y1: 200,
    x2: 800,
    y2: 800,
    color: lineColor,
    width: lineWidth,
}

const topEdge_1 = {
    x1: 200,
    y1: 200,
    x2: 500,
    y2: 200,
    color: lineColor,
    width: lineWidth,
}
const topEdge_2 = {
    x1: 600,
    y1: 200,
    x2: 800,
    y2: 200,
    color: lineColor,
    width: lineWidth,
}
const topEdge = {
    x1: 200,
    y1: 200,
    x2: 800,
    y2: 200,
    color: lineColor,
    width: lineWidth,
}


const bottomEdge = {
    x1: 200,
    y1: 800,
    x2: 800,
    y2: 800,
    color: lineColor,
    width: lineWidth,
}

class Ball {
  constructor(xin, yin, din, idin, oin, color) {
    this.x = xin;
    this.y = yin;
    this.vx = (Math.random()-0.5) * init_impulse;
    this.vy = (Math.random()-0.5) * init_impulse;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.color = color;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

//   move() {
//     // this.vy += gravity;
//     this.x += this.vx;
//     this.y += this.vy;
//     if (this.x + this.diameter / 2 > width) {
//       this.x = width - this.diameter / 2;
//       this.vx *= friction;
//     } else if (this.x - this.diameter / 2 < 0) {
//       this.x = this.diameter / 2;
//       this.vx *= friction;
//     }
//     if (this.y + this.diameter / 2 > height) {
//       this.y = height - this.diameter / 2;
//       this.vy *= friction;
//     } else if (this.y - this.diameter / 2 < 0) {
//       this.y = this.diameter / 2;
//       this.vy *= friction;
//     }
//     if ( this.x > leftEdge.x1 && this.x < rightEdge.x1 && this.y > topEdge_1.y1 && this.y < bottomEdge.y1){
//         if (this.x + this.diameter / 2 > rightEdge.x1 ) {
//             this.x = rightEdge.x1  - this.diameter / 2;
//             this.vx *= friction;
//           } else if (this.x - this.diameter / 2 < leftEdge.x1 ) {
//             this.x = leftEdge.x1+this.diameter / 2;
//             this.vx *= friction;
//           }
//           if (this.y + this.diameter / 2 > bottomEdge.y1) {
//             this.y = bottomEdge.y1 - this.diameter / 2;
//             this.vy *= friction;
//           } else if (this.y - this.diameter / 2 < topEdge_1.y1 && this.x > topEdge_2.x_1 && this.x > topEdge_1.x_2 ) {
//             this.y = topEdge_1.y1 + this.diameter / 2;
//             this.vy *= friction;
//           }
//     }else{
//         if (!(this.x + this.diameter / 2 > rightEdge.x1 )) {
//             this.x = rightEdge.x1  - this.diameter / 2;
//             this.vx *= friction;
//           } else if (!(this.x - this.diameter / 2 < leftEdge.x1 )) {
//             this.x = leftEdge.x1+this.diameter / 2;
//             this.vx *= friction;
//           }
//           if (!(this.y + this.diameter / 2 > bottomEdge.y1)) {
//             this.y = bottomEdge.y1 - this.diameter / 2;
//             this.vy *= friction;
//           } else if (!(this.y - this.diameter / 2 < topEdge_1.y1 && this.x > topEdge_2.x_1 && this.x > topEdge_1.x_2 )) {
//             this.y = topEdge_1.y1 + this.diameter / 2;
//             this.vy *= friction;
//           }
//     }
//   }
    move() {
        // this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
        this.x = width - this.diameter / 2;
        this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
        this.x = this.diameter / 2;
        this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
        this.y = height - this.diameter / 2;
        this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
        this.y = this.diameter / 2;
        this.vy *= friction;
        }
        if ( this.x > leftEdge.x1 && this.x < rightEdge.x1 && this.y > topEdge_1.y1 && this.y < bottomEdge.y1){
            if (this.x + this.diameter / 2 > rightEdge.x1 ) {
                this.x = rightEdge.x1  - this.diameter / 2;
                this.vx *= friction;
            } else if (this.x - this.diameter / 2 < leftEdge.x1 ) {
                this.x = leftEdge.x1+this.diameter / 2;
                this.vx *= friction;
            }
            if (this.y + this.diameter / 2 > bottomEdge.y1) {
                this.y = bottomEdge.y1 - this.diameter / 2;
                this.vy *= friction;
            } else if (this.y - this.diameter / 2 < topEdge_1.y1 && this.x > topEdge_2.x_1 && this.x > topEdge_1.x_2 ) {
                this.y = topEdge_1.y1 + this.diameter / 2;
                this.vy *= friction;
            }
        }
        else{
            if (!(this.x + this.diameter / 2 > rightEdge.x1 )) {
                this.x = rightEdge.x1  - this.diameter / 2;
                this.vx *= friction;
            } else if (!(this.x - this.diameter / 2 < leftEdge.x1 )) {
                this.x = leftEdge.x1+this.diameter / 2;
                this.vx *= friction;
            }
            if (!(this.y + this.diameter / 2 > bottomEdge.y1)) {
                this.y = bottomEdge.y1 - this.diameter / 2;
                this.vy *= friction;
            } else if (!(this.y - this.diameter / 2 < topEdge_1.y1 && this.x > topEdge_2.x_1 && this.x > topEdge_1.x_2 )) {
                this.y = topEdge_1.y1 + this.diameter / 2;
                this.vy *= friction;
            }
        }

    }
    

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }
  

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.diameter);
  }
}

function drawLine({x1, y1, x2, y2, color, width}){
    stroke(color);
    strokeWeight(width);
    line(x1, y1, x2, y2);
}