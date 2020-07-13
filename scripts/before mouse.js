window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    const wrapper = document.querySelector('.wrapper');
    wrapper.style.display = 'none';
    const canvasElement = document.getElementById('canvas');

    const game = new Game(canvasElement);

    game.loop();
  };
  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');

      this.background = new Background(this);
      this.mouse = new Mouse(this);
      this.mouseY = 0;
      this.mouseX = 0;
      this.player = new Player(this);
    }

    runLogic() {
      this.mouse.runLogic();
      console.log(this.mouseX, this.mouseX);
    }
    clean() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    paint() {
      this.background.paint();
      this.player.paint();
    }
    loop() {
      this.runLogic();
      this.clean();
      this.paint();

      setTimeout(() => {
        this.loop();
      }, 1000 / 20);
      // window.requestAnimationFrame(() => this.loop());
    }
  }

  class Background {
    constructor(game, canvas, height, width) {
      this.game = game;
      this.canvas = canvas;
      this.bgTitle = new Image();
      this.width = 1500;
      this.height = 700;
      this.bgTitle.src = '/images/background/forest.jpg';
    }
    paint() {
      const context = this.game.context;
      context.drawImage(this.bgTitle, 0, 0, this.width, this.height);
    }
  }

  class Mouse {
    constructor(game) {
      this.game = game;
      this.canvas = canvas;
      this.canvas.addEventListener('click', this.checkMouse);
    }
    checkMouse(event) {
      let x = 0;
      let y = 0;
      if (event) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;
      }
      console.log('x: ' + x + ' y: ' + y);
    }
    runLogic() {
      this.checkMouse();
    }
  }

  class Player {
    constructor(game) {
      this.game = game;
      this.idleImg = new Image();
      this.idleImg.src = '/images/idle.png';
      this.fly = '/images/player/jet.png';
      this.flying = false;
      this.x = 100;
      this.x_velocity = 0;
      this.y_velocity = 0;
      this.y = 580;
      this.control();
    }

    control() {
      window.addEventListener('keydown', event => {
        const key = event.key;
        switch (key) {
          case 'ArrowLeft':
            event.preventDefault();
            if (this.x > 0) {
              this.x -= 10;
            }
            if (this.y < 580) this.y -= 3;
            this.moveLeft();
            break;
          case 'ArrowRight':
            event.preventDefault();
            if (this.x < 1420) {
              this.x += 15;
            }
            if (this.y < 580) this.y -= 3;
            this.flying = true;

            this.moveRight();
            break;
          case 'ArrowUp':
            event.preventDefault();
            if (this.y > 0) this.y -= 10;
            break;
          case 'ArrowDown':
            event.preventDefault();
            if (this.y < 590) this.y += 10;
            break;
          case 'Space':
            this.jump();
            break;
        }

        this.flying = false;
        this.x += this.x_velocity;
        this.y += this.y_velocity;
        this.x_velocity *= 0.9;
        this.y_velocity *= 0.9;
      });
    }

    moveLeft() {
      this.x_velocity -= 0.5;
    }

    moveRight() {
      this.x_velocity += 0.5;
    }

    paint() {
      const context = this.game.context;

      console.log(this.y);
      if (this.flying === false && this.y < 550) {
        this.y += 4; //gravity
      }
      if (this.y < 550) {
        this.idleImg.src = '/images/player/jet.png';
      } else if (this.y > 550) {
        this.idleImg.src = '/images/idle.png';
      }

      context.drawImage(this.idleImg, this.x, this.y, 90, 90);
    }
  }
};
