  /*----- constants -----*/
let snake = [
    {x: 300, y: 100, height: 20, width: 20, color: 'red'},
    {x: 300, y: 70, height: 20, width: 20, color: 'red'},
    {x: 300, y: 40, height: 20, width: 20, color: 'red'},
];

let direction = null;
let autoMoveInterval = setInterval(autoMoveSnake, 100);
let gameInterval = setInterval(gameloop, 50);
let points = 0;
let highPoints = 0;

/* ----- DOM SELECTORS ------ */
const canvas = document.querySelector('canvas');
const message = document.querySelector('.gameover')
const button = document.querySelector('button')
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');


/* ----- CANVAS SETUP ------- */ 
const ctx = canvas.getContext('2d')
console.log(ctx);
canvas.setAttribute('height', getComputedStyle(canvas).height);
canvas.setAttribute('width', getComputedStyle(canvas).width);

/* ----- CLASSES ------ */

// class Food {
//     constructor(x,y,width,height,color) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//         this.alive = true;
//         this.className = 'food'
//     }
//     render() {
//         ctx.fillStyle = this.color;
//         ctx.strokeStyle = this.border;
//         ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
//     }
// }
class Mouse {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.img = new Image()
        this.img.src = '—Pngtree—mouse running away vector material_5756793.png'
        // this.img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0YaszmpYHwqvOFYRMnfaZKEhlgCLm5P46g&usqp=CAU'
    }
    on_image_loaded(f) {
        this.img.onload = f;
    }
    render(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}



/* ----- BOARD OBJECTS ------ */

const jerry = new Mouse (100,300,100,100)
jerry.on_image_loaded(function() {
    jerry.render()
});


// const snakeFood = new Food(200,300,20,20,'orange')
// snakeFood.render();


  /*----- event listeners -----*/
document.addEventListener('keydown', moveSnake);

button.addEventListener('click', reset);

  /*----------------------------------- functions --------------------------------------*/


function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake = [
        {x: 300, y: 100, height: 20, width: 20, color: 'red'},
        {x: 300, y: 70, height: 20, width: 20, color: 'red'},
        {x: 300, y: 40, height: 20, width: 20, color: 'red'},
    ];
    direction = null;
    points = 0;
    score.innerHTML = `Score: 0`;
    jerry.x = Math.floor(Math.random() * (canvas.width - jerry.width));
    jerry.y = Math.floor(Math.random() * (canvas.height - jerry.height));
    message.innerText = '';
    autoMoveInterval = setInterval(autoMoveSnake, 100);
    gameInterval = setInterval(gameloop, 50);
    document.addEventListener('keydown', moveSnake);
}


function gameloop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake(snake, ctx);
    // jerry.render();
    jerry.render();
    collisionDetect(snake[0].x ,snake[0].y, jerry);
}


function drawSnake (snake, ctx){
    snake.forEach(segment => {
    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
});
}


function moveSnake (e){
    switch(e.key.toLowerCase()) {
        case 'w':
            if (direction === 'down' || direction === null){
                return;
            } else { 
                    direction = 'up';
            }
            break;
        case 's':
            if (direction === 'up'){
                return;
            } else { 
                    direction = 'down';
            }
            break;
        case 'd':
            if (direction === 'left'){
                return;
            } else {
                    direction ='right';
            }
            break;
        case 'a':
            if (direction === 'right'){
                return;
            } else { 
                    direction = 'left';
            }
            break;
        default: console.log(`${e.key} not recognized`)
    }
}




function autoMoveSnake(){
    const speed = 30;
    let snakeHeadx = snake[0].x;
    let snakeHeady = snake[0].y;
    const snakeTail = snake[snake.length];
            if (direction === 'null') {
                return;
            } else if (direction === 'up'){
                let newHeadup = {x: snakeHeadx, y: snakeHeady -= speed, height: 20, width: 20, color: 'red'};
                snake.unshift(newHeadup);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'down'){
                let newHeaddown = {x: snakeHeadx, y: snakeHeady += speed, height: 20, width: 20, color: 'red'};
                snake.unshift(newHeaddown);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'right'){
                let newHeadright = {x: snakeHeadx += speed, y: snakeHeady, height: 20, width: 20, color: 'red'};
                snake.unshift(newHeadright);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'left') {
                let newHeadleft = {x: snakeHeadx -= speed, y: snakeHeady, height: 20, width: 20, color: 'red'};
                snake.unshift(newHeadleft);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            }
}


function collisionDetect (snakeHeadx,snakeHeady, jerry) {
    snakeHeadx = snake[0].x;
    snakeHeady = snake[0].y;
    let snakeHeadHeight = snake[0].height;
    let snakeHeadWidth = snake[0].width;
    //detect when snake(x,y) = food(x,y)
    const foodTop = snakeHeady + snakeHeadHeight > jerry.y;
    const foodBottom = snakeHeady < jerry.y + jerry.height;
    const foodLeft = snakeHeadx + snakeHeadWidth > jerry.x;
    const foodRight = snakeHeadx < jerry.x + jerry.width;
        //console.log(`foodTop is ${foodTop}, foodBottom is ${foodBottom}, foodLeft is ${foodLeft}, foodRight is ${foodLeft}`);
    if (foodBottom && foodLeft && foodRight && foodTop) {
        //console.log('hit detected');
        //if that happens, redraw the food somewhere random on the canvas
        jerry.x= Math.floor(Math.random() * (canvas.width - jerry.width));
        jerry.y = Math.floor(Math.random() * (canvas.height - jerry.height));
        jerry.render();
        //add to the snake
        const lastSegment = snake[snake.length - 1]
        const newSegment = {x:lastSegment.x, y: lastSegment.y, height: 20, width: 20, color:'red'}
        snake.push(newSegment);
        drawSnake(snake, ctx);
        //add to the score
        points++;
        score.innerHTML = `Score: ${points}`;
        // check for high score
        if (points > highPoints){
            highPoints = points;
            highScore.innerHTML= `High Score: ${highPoints}`;
        } else if (points < highPoints) {
            highScore.innerHTML= `High Score: ${highPoints}`;
        }
        return true;

    }
    //detect if the wall is hit
    if (snakeHeady <= 0 || snakeHeadx <= 0 ||snakeHeadx + snakeHeadWidth >= canvas.width ||snakeHeady + snakeHeadHeight >= canvas.height) {
        //console.log('wall hit');
        // if it is, end the game (disable all movement and show game over message)
        document.removeEventListener('keydown', moveSnake);
        message.innerText = 'GAME OVER!!';
        clearInterval(autoMoveInterval);
    }
    // Detect if snake hits itself. If it does, end the game (disable all movement and show game over message)
    for (let i = 1; i < snake.length; i++) {
        const segment = snake[i];
        if (snakeHeadx === segment.x && snakeHeady === segment.y) {
        document.removeEventListener('keydown', moveSnake);
        message.innerText = 'GAME OVER!!';
        clearInterval(autoMoveInterval);
        return; // Exit the function once a collision is detected
        }
    }
    return false;
}
