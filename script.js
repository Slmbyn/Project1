  /*----- constants -----*/
let snake = [
    {x: 300, y: 100, height: 40, width: 40, color: 'red'},
    {x: 300, y: 60, height: 40, width: 40, color: 'blue'},
    {x: 300, y: 20, height: 40, width: 40, color: 'white'},
];

let direction = 'down';

/* ----- DOM SELECTORS ------ */
const canvas = document.querySelector('canvas');



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



const snakeFood = new Food(450,300,40,40,'orange')
snakeFood.render();

  /*----- state variables -----*/


  /*----- cached elements  -----*/


  /*----- event listeners -----*/
// canvas.addEventListener('click', e => {      //making sure it works. this one gives click coordinates
//     console.log(`x: ${e.offsetX}, y:${e.offsetY}`)
// })


// canvas.setAttribute('tabindex', 0);
// canvas.focus();
document.addEventListener('keydown', moveSnake);


  /*----- functions -----*/
function drawSnake (snakeArray, ctx){
    snakeArray.forEach(segment => {
    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.x, segment.y, segment.width, segment.height);
});
}
drawSnake(snake, ctx);

//const keyPressed = {};
// function moveSnake (e) {
//     const speed = 20;
//     if (e.key === 'd'){
//         snake[0].x + speed;
//         snake[1].y + speed;
//         snake[2].y + speed;
//     }
// }


function moveSnake (e){
    //console.log(e)
    const speed = 40;
    const snakeHead = snake[0];
    switch(e.key) {
        case 'w':
            snakeHead.y -= speed;
            drawSnake(snake, ctx);
            //console.log('move snake up');
            break;
        case 's':
            snakeHead.y += speed;
            drawSnake(snake, ctx);
            //console.log('move snake down');
            break;
        case 'd':
            // snake.forEach(segment => {
            //     segment.x += speed;
            // });
            snakeHead.x += speed;
            // if (e.key==='d' && direction === 'down'){
            //     snake[0].x += speed;
            //     snake[1].y += speed;
            //     snake[2].y += speed;}
            // if (e.key==='d' && direction === 'right'){
            //     return;
            // }
            drawSnake(snake, ctx);
            //console.log('move snake right');
            break;
        case 'a':
            snakeHead.x -= speed;
            drawSnake(snake, ctx);
            //console.log('move snake left');
            break;
        default: console.log(`${e.key} not recognized`)
    }
}



// function redrawBoard () {
//     ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
//     drawSnake(); // Call the drawSnake function to draw the snake
//     snakeFood.render();
// }
// redrawBoard();








// Variables
// DOM Selectors

// Canvas Setup
//     const ctx = canvas.getContext("2d");
//     console.log(ctx);
//     // set the canvas's resolution to be the same as the windows (weird but okay)
//     // set the canvas to be the render size it appears on the page
//     // (how you make a responsive canves) 48:50min
//     canvas.setAttribute("height", getComputedStyle(canvas).height);
//     canvas.setAttribute("width", getComputedStyle(canvas).width);
// Classes
// // create game objects (snake & food) (just make them colored boxes using ctx.fill)
// // console.log to make sure they show up 
// Functions
// // movement handler
// //detect hit                <--- goal is to get to this point today
// // game interval/game loop
//     // clear the canvas, render the snake, render the food (get that working then, generate food randomly, then increase snake length), add "if collision, game over message and disable event listeners"



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
