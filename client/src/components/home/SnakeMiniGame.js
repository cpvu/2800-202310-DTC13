//Easter snake game logic and functionality
export default function SnakeMiniGame() {
    const canvasStyles = {
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        border: '1px solid black',
    };

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.getElementById("root").appendChild(canvas);

    const SCREEN_WIDTH = 700;
    const SCREEN_HEIGHT = 700;
    const UNIT_SIZE = 25;
    const GAME_UNITS = (SCREEN_WIDTH * SCREEN_HEIGHT) / UNIT_SIZE;
    const FRAME_RATE = 8; // Adjust this value to control the snake's speed
    let frameCount = 0;
    let bodyparts = 6;
    let direction = 'R';
    let running = false;
    const x = new Array(GAME_UNITS);
    const y = new Array(GAME_UNITS);
    let applex;
    let appley;
    let applesEaten;
    let animationFrameId;

    function startGame() {
        for (let i = 0; i < bodyparts; i++) {
            x[i] = UNIT_SIZE * (bodyparts - i);
            y[i] = 0;
        }
        newApple();
        running = true;
        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function checkApple() {
        if (x[0] === applex && y[0] === appley) {
            bodyparts++;
            applesEaten++;
            newApple();
        }
    }

    function checkCollision() {
        for (let i = bodyparts; i > 0; i--) {
            if (x[0] === x[i] && y[0] === y[i]) {
                running = false;
            }
        }

        if (x[0] < 0) {
            running = false;
        }

        if (x[0] > SCREEN_WIDTH) {
            running = false;
        }

        if (y[0] < 0) {
            running = false;
        }

        if (y[0] > SCREEN_HEIGHT) {
            running = false;
        }

        if (!running) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    function newApple() {
        applex = Math.floor(Math.random() * (SCREEN_WIDTH / UNIT_SIZE)) * UNIT_SIZE;
        appley = Math.floor(Math.random() * (SCREEN_HEIGHT / UNIT_SIZE)) * UNIT_SIZE;
    }

    function move() {
        for (let i = bodyparts; i > 0; i--) {
            x[i] = x[i - 1];
            y[i] = y[i - 1];
        }

        switch (direction) {
            case 'U':
                y[0] = y[0] - UNIT_SIZE;
                break;
            case 'D':
                y[0] = y[0] + UNIT_SIZE;
                break;
            case 'L':
                x[0] = x[0] - UNIT_SIZE;
                break;
            case 'R':
                x[0] = x[0] + UNIT_SIZE;
                break;
        }
    }

    function draw() {
        context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        for (let i = 0; i < bodyparts; i++) {
            console.log(x[i], y[i]);
            context.fillStyle = i === 0 ? 'green' : 'white';
            context.fillRect(x[i], y[i], UNIT_SIZE, UNIT_SIZE);
            context.strokeStyle = 'black';
            context.strokeRect(x[i], y[i], UNIT_SIZE, UNIT_SIZE);
        }

        context.fillStyle = 'red';
        context.fillRect(applex, appley, UNIT_SIZE, UNIT_SIZE);
    }

    function gameOver() { }

    function keyPressed(e) {
        switch (e.keyCode) {
            case 37: // Left arrow key
                if (direction !== 'R') {
                    direction = 'L';
                }
                break;
            case 39: // Right arrow key
                if (direction !== 'L') {
                    direction = 'R';
                }
                break;
            case 38: // Up arrow key
                if (direction !== 'D') {
                    direction = 'U';
                }
                break;
            case 40: // Down arrow key
                if (direction !== 'U') {
                    direction = 'D';
                }
                break;
            case 87: // W key
                if (direction !== 'D') {
                    direction = 'U';
                }
                break;
            case 83: // S key
                if (direction !== 'U') {
                    direction = 'D';
                }
                break;
            case 65: // A key
                if (direction !== 'R') {
                    direction = 'L';
                }
                break;
            case 68: // D key
                if (direction !== 'L') {
                    direction = 'R';
                }
                break;
        }
    }

    function gameLoop() {
        animationFrameId = requestAnimationFrame(gameLoop);

        if (++frameCount < FRAME_RATE) {
            return;
        }

        frameCount = 0;
        checkApple();
        checkCollision();
        move();
        draw();


    }

    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    canvas.style.border = '10px solid gray';
    canvas.style.backgroundColor = 'black';
    canvas.style.display = 'block';
    canvas.style.justifyContent = 'center';
    document.addEventListener('keydown', keyPressed);
    startGame();

    return (
        <div>
            <canvas ></canvas>
        </div>
    );

}