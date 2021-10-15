

class Snowflake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;

    this.reset();
  }

  reset() {
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-3, 3);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 4);
    this.alpha = this.randBetween(0.1, 0.9);
  }

  randBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}


////////////////////////////////////////////////////////////

// Simple CountDown Clock

const comingdate = new Date("Jan 1, 2030 00:00:00"); // 此处修改倒计时截止时间

const y = document.getElementById("y");
const d = document.getElementById("d");
const h = document.getElementById("h");
const m = document.getElementById("m");
const s = document.getElementById("s");

const countdown = setInterval(() => {
  const now   = new Date();
  const des   = comingdate.getTime() - now.getTime();
  const years  = Math.floor(des / (1000 * 60 * 60 *24 *365));
  const days  = Math.floor(des % (1000 * 60 * 60 *24 *365)/ (1000 * 60 * 60 * 24));
  const hours = Math.floor((des % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((des % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((des % (1000 * 60)) / 1000);

  y.innerHTML = getTrueNumber(years);
  d.innerHTML = getTrueNumber(days);
  h.innerHTML = getTrueNumber(hours);
  m.innerHTML = getTrueNumber(mins);
  s.innerHTML = getTrueNumber(secs);

  if (x <= 0) clearInterval(x);
}, 1000);

const getTrueNumber = x => (x < 10 ? "0" + x : x);