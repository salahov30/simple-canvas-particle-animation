(() => {
  const TWO_PI = 2 * Math.PI;

  const canvas = document.querySelector(`canvas`);
  const ctx = canvas.getContext(`2d`);

  const width = (canvas.width = innerWidth);
  const heigth = (canvas.height = innerHeight);
  const dots = [];

  class Dot {
    constructor() {
      this.position = { x: Math.floor(width / 2), y: Math.floor(heigth / 2) };
      this.velocity = { x: 1, y: 1 };
      this.radius = random(0.1, 1.3);
      this.mass = this.radius * 0.009;
      this.color = `rgba(255, 255, 255, 0.7)`;
    }

    draw() {
      this.position.x = this.position.x + this.velocity.x;
      this.position.y = this.position.y + this.velocity.y;

      createDot(
        this.position.x,
        this.position.y,
        this.radius,
        true,
        this.color
      );
      createDot(
        this.position.x,
        this.position.y,
        this.radius,
        false,
        this.color
      );
    }
  }

  const updateDots = () => {
    for (let i = 1; i < dots.length; i++) {
      const acc = { x: 0, y: 0 };

      for (let j = 0; j < dots.length; j++) {
        if (i === j) continue;
        let [firstDot, secondDot] = [dots[i], dots[j]];

        let delta = {
          x: secondDot.position.x - firstDot.position.x + 1,
          y: secondDot.position.y - firstDot.position.y + 2
        };
        let dist = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
        let force = ((dist - 1500) / dist) * 0.01;

        if (j === 0) {
          let alpha = 120 / dist;
          firstDotcolor = `rgba(255, 255, 255,  ${
            alpha > 0.8 ? (alpha = 0.8) : alpha < 0.2 ? (alpha = 0.3) : alpha
          })`;

          dist < 120
            ? (force = (dist - 120) * secondDot.mass)
            : (force = firstDot.mass);
        }

        acc.x += delta.x * force;
        acc.y += delta.y * force;
      }

      dots[i].velocity.x = dots[i].velocity.x * 0.5 + acc.x * dots[i].mass;
      dots[i].velocity.y = dots[i].velocity.y * 0.5 + acc.y * dots[i].mass;

      //   dots[i].velocity.x = dots[i].velocity.x  + acc.x * dots[i].mass;
      //   dots[i].velocity.y = dots[i].velocity.y  + acc.y * dots[i].mass;
    }

    dots.map(e => e.draw());
  };

  const createDot = (x, y, rad, fill, color) => {
    ctx.fillStyle = ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, TWO_PI);
    ctx.closePath();
    fill ? ctx.fill() : ctx.stroke();
  };

  const random = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const loop = () => {
    ctx.clearRect(0, 0, width, heigth);

    if (dots.length !== 500) {
      dots.push(new Dot());
    } else {
      dots.splice(1, 1);
    }
    updateDots();

    requestAnimationFrame(loop);
  };

  loop();
})();
