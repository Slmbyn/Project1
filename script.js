  /*----- constants -----*/
let snake = [
    {x: 300, y: 100, height: 40, width: 40, color: 'red'},
    {x: 300, y: 60, height: 40, width: 40, color: 'red'},
    {x: 300, y: 20, height: 40, width: 40, color: 'red'},
];

let direction = null;
let autoMoveInterval = setInterval(autoMoveSnake, 100);
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

// ctx.fillStyle = 'purple';
// ctx.fillRect(0, 0, 40, 40); //top left corner
// ctx.fillStyle = 'orange';
// ctx.fillRect(600, 600, 40, 40); //bottom right corner
// ctx.fillRect(0, 600, 40, 40); //bottom left corner
// ctx.fillRect(600, 0, 40, 40); //top right corner
// ctx.strokeStyle = 'black';
// ctx.strokeRect(300, 300, 40, 40); //middle

/* ----- CLASSES ------ */

class Food {
    constructor(x,y,width,height,color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alive = true;
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.border;
        ctx.fillRect(this.x, this.y, this.width, this.height, this.color);
    }
}

/* ----- BOARD OBJECTS ------ */

// const mySnake = new Subject(300,100,40,40,'black');
// mySnake.render();



const snakeFood = new Food(400,300,40,40,'orange')
snakeFood.render();

  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
// canvas.addEventListener('click', e => {      //making sure it works. this one gives click coordinates
//     console.log(`x: ${e.offsetX}, y:${e.offsetY}`)
// })

document.addEventListener('keydown', moveSnake);
//button.addEventListener('click', reset);


  /*----------------------------------- functions --------------------------------------*/


//function reset () {
    //console.log('reset button clicked');
//render snake to default
//     drawSnake(snake, ctx);
//set 'direction' to null
//      direction = null;
// randomly generate food
//      snakeFood.render();
// }



function reset() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Reset the snake to its initial state
    snake = [
        { x: 300, y: 100, height: 40, width: 40, color: 'red' },
        { x: 300, y: 60, height: 40, width: 40, color: 'red' },
        { x: 300, y: 20, height: 40, width: 40, color: 'red' },
    ];
    // Reset the direction
    direction = null;
    // Reset the score
    points = 0;
    score.innerHTML = `Score: 0`;
    // Randomly re-generate food
    snakeFood.x = Math.floor(Math.random() * (canvas.width - snakeFood.width));
    snakeFood.y = Math.floor(Math.random() * (canvas.height - snakeFood.height));
    // Clear game over message
    message.innerText = '';
    // Clear interval for automove snake
            //clearInterval(autoMoveInterval);
    // start auto move again
    autoMoveInterval = setInterval(autoMoveSnake, 100);
    document.addEventListener('keydown', moveSnake);
            //gameloop();
    // Render the initial state
            // drawSnake(snake, ctx);
            // snakeFood.render();
}

button.addEventListener('click', reset);



const gameInterval = setInterval(gameloop, 50);
function gameloop () {
    //clear canvas to re-render
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // render all game objects
    drawSnake(snake, ctx);
    snakeFood.render();
    // start the movement
    //do game logic
    collisionDetect(snake[0].x ,snake[0].y, snakeFood);

}


function drawSnake (snake, ctx){
    snake.forEach(segment => {
    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
});
}
//drawSnake(snake, ctx);


function moveSnake (e){
    //console.log(e)
    // const speed = 40;
    // let snakeHeadx = snake[0].x;
    // let snakeHeady = snake[0].y;
    // const snakeTail = snake[snake.length];
    switch(e.key) {
        case 'ArrowUp':
            if (direction === 'down'){
                return;
            } else { 
                    direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction === 'up'){
                return;
            } else { 
                    direction = 'down';
            }
            break;
        case 'ArrowRight':
            if (direction === 'left'){
                return;
            } else {
                    direction ='right';
            }
            break;
        case 'ArrowLeft':
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
    const speed = 40;
    let snakeHeadx = snake[0].x;
    let snakeHeady = snake[0].y;
    const snakeTail = snake[snake.length];
            if (direction === 'null') {
                return;
            //  } else if (collisionDetect === true){
            //      clearInterval(autoMoveInterval);
            } else if (direction === 'up'){
                let newHeadup = {x: snakeHeadx, y: snakeHeady -= speed, height: 40, width: 40, color: 'red'};
                snake.unshift(newHeadup);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'down'){
                let newHeaddown = {x: snakeHeadx, y: snakeHeady += speed, height: 40, width: 40, color: 'red'};
                snake.unshift(newHeaddown);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'right'){
                let newHeadright = {x: snakeHeadx += speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
                snake.unshift(newHeadright);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            } else if (direction === 'left') {
                let newHeadleft = {x: snakeHeadx -= speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
                snake.unshift(newHeadleft);
                snake.pop(snakeTail);
                drawSnake(snake, ctx);
            }
}
// function moveSnake (e){
//     //console.log(e)
//     const speed = 40;
//     let snakeHeadx = snake[0].x;
//     let snakeHeady = snake[0].y;
//     const snakeTail = snake[snake.length];
//     switch(e.key) {
//         case 'ArrowUp':
//             if (direction === 'down'){
//                 return;
//             } else { 
                
//                     let newHeadup = {x: snakeHeadx, y: snakeHeady -= speed, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadup);
//                     snake.pop(snakeTail);
//                     direction = 'up';
//                     drawSnake(snake, ctx);
                
//             }
//             break;
//         case 'ArrowDown':
//             if (direction === 'up'){
//                 return;
//             } else { 
//                     let newHeaddown = {x: snakeHeadx, y: snakeHeady += speed, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeaddown);
//                     snake.pop(snakeTail);
//                     direction = 'down';
//                     drawSnake(snake, ctx);
//             }
//             break;
//         case 'ArrowRight':
//             if (direction === 'left'){
//                 return;
//             } else {
                
//                     let newHeadright = {x: snakeHeadx += speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadright);
//                     snake.pop(snakeTail);
//                     direction ='right';
//                     drawSnake(snake, ctx);
                
//             }
//             break;
//         case 'ArrowLeft':
//             if (direction === 'right'){
//                 return;
//             } else { 
                
//                     let newHeadleft = {x: snakeHeadx -= speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadleft);
//                     snake.pop(snakeTail);
//                     direction = 'left';
//                     drawSnake(snake, ctx);
                
//             }
//             break;
//         default: console.log(`${e.key} not recognized`)
//     }
// }

// function moveSnake (e){
//     //console.log(e)
//     const speed = 40;
//     let snakeHeadx = snake[0].x;
//     let snakeHeady = snake[0].y;
//     const snakeTail = snake[snake.length];
//     switch(e.key) {
//         case 'ArrowUp':
//             if (direction === 'down'){
//                 return;
//             } else { 
//                 const continueUp = setInterval(() => {
//                     let newHeadup = {x: snakeHeadx, y: snakeHeady -= speed, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadup);
//                     snake.pop(snakeTail);
//                     direction = 'up';
//                     drawSnake(snake, ctx);
//                 }, 500);
//             }
//             break;
//         case 'ArrowDown':
//             if (direction === 'up'){
//                 return;
//             } else { 
//                 const continueDown = setInterval(() => {
//                     let newHeaddown = {x: snakeHeadx, y: snakeHeady += speed, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeaddown);
//                     snake.pop(snakeTail);
//                     direction = 'down';
//                     drawSnake(snake, ctx);
//                 }, 500);
//             }
//             break;
//         case 'ArrowRight':
//             if (direction === 'left'){
//                 return;
//             } else {
//                 const continueRight = setInterval(() => {
//                     let newHeadright = {x: snakeHeadx += speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadright);
//                     snake.pop(snakeTail);
//                     direction ='right';
//                     drawSnake(snake, ctx);
//                 }, 500)
//             }
//             break;
//         case 'ArrowLeft':
//             if (direction === 'right'){
//                 return;
//             } else { 
//                 const continueDown = setInterval(() => {
//                     let newHeadleft = {x: snakeHeadx -= speed, y: snakeHeady, height: 40, width: 40, color: 'red'};
//                     snake.unshift(newHeadleft);
//                     snake.pop(snakeTail);
//                     direction = 'left';
//                     drawSnake(snake, ctx);
//                 }, 500);
//             }
//             break;
//         default: console.log(`${e.key} not recognized`)
//     }
// }

function collisionDetect (snakeHeadx,snakeHeady, snakeFood) {
    snakeHeadx = snake[0].x;
    snakeHeady = snake[0].y;
    let snakeHeadHeight = snake[0].height;
    let snakeHeadWidth = snake[0].width;
    //detect when snake(x,y) = food(x,y)
    const foodTop = snakeHeady + snakeHeadHeight > snakeFood.y;
    const foodBottom = snakeHeady < snakeFood.y + snakeFood.height;
    const foodLeft = snakeHeadx + snakeHeadWidth > snakeFood.x;
    const foodRight = snakeHeadx < snakeFood.x + snakeFood.width;
        //console.log(`foodTop is ${foodTop}, foodBottom is ${foodBottom}, foodLeft is ${foodLeft}, foodRight is ${foodLeft}`);
    if (foodBottom && foodLeft && foodRight && foodTop) {
        //console.log('hit detected');
        //if that happens, redraw the food somewhere random on the canvas
        snakeFood.x= Math.floor(Math.random() * (canvas.width - snakeFood.width));
        snakeFood.y = Math.floor(Math.random() * (canvas.width - snakeFood.height));
        snakeFood.render();
        //add to the snake
        const lastSegment = snake[snake.length - 1]
        const newSegment = {x:lastSegment.x, y: lastSegment.y, height: 40, width: 40, color:'red'}
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



// {highScore.innerHTML= `High Score: ${highPoints}`;}


























































// 1. Define global variables
//    - ...
//    - Initialize snake length to 1 (snake.length = 1)

// 2. Function to initialize the game (initGame):
//    - ...
//    - Reset snake length to 1 (snake.length = 1)

// 3. Function to check for collisions (checkCollisions):
//    - Check if the snake's head collides with the food:
//      - If yes, increment the score
//      - Generate new food
//      - Increase the snake's length by adding a new segment to the tail

// 4. Function to move the snake (moveSnake):
//    - Calculate the new head position based on the current direction
//    - Add the new head to the beginning of the snake array
//    - If the snake didn't eat the food, remove the tail (snake.pop())

// 5. Function to generate and render food (generateFood):
//    - Randomly generate a new food position within the canvas

// 6. Function to render the game (renderGame):
//    - Clear the canvas
//    - Draw the snake on the canvas
//    - Draw the food on the canvas
//    - Display the current score and high score on the screen
//    - If gameOver is true, display the game over screen

// 7. Function to handle game over (handleGameOver):
//    - Set gameOver to true
//    - Update the high score if the current score is higher
//    - Display the game over screen with the final score and high score
//    - Remove the event listener for key input

// 8. Function to restart the game (restartGame):
//    - Reset all game variables using initGame()

// 9. Function to control the game loop (gameLoop):
//    - If gameOver is true, return and do not continue the game loop
//    - Move the snake
//    - Check for collisions
//    - Render the game
//    - Call requestAnimationFrame to continue the game loop

// 10. Initialize the game when the page loads (window.addEventListener("load", initGame))

// 11. Handle user clicks on the start and restart buttons:
//     - Start button (document.getElementById("start-button").addEventListener("click", initGame))
//     - Restart button (document.getElementById("restart-button").addEventListener("click", restartGame))
