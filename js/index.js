// Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const musicSound = new Audio('../Audios/Keep Going.mp3');
const moveSound = new Audio('move.mp3');
let initialSpeed = 4;
let speed = initialSpeed;
let highScoreVar;   
let score = 0;
let level = 0;
let lastPaintTime = 0;
let rotation = 0;
let snakeArray =  [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//Functions
/* In this function declaration we take currentTime as a parameter
    window.requestAnimationFrame(main); this method runs in each successful loop 
    */
function main(currentTime) {
    //This line of code helps to change or transition smoothly the properties of object
    window.requestAnimationFrame(main); 
  
    /*In this statement if the time between current time and lastPaintTime
    is smaller than 1/speed than that frame is skipped for slower refresh rate
    */ 
    const elapsedTime = currentTime - lastPaintTime;
    if (elapsedTime/1000 < 1/speed){
        return;
    } 
    /* If the time between  current time and lastPaintTime more than
    1/speed than the frame is runned and currentTime value is assigned
    to last time to again check if again current  time is smaller or 
    greater than 1/speed */
    lastPaintTime = currentTime;
    gameEngine(); 
}



function isCollide(snake) {
    //if collided with snake
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
        
}

// this function runs the game 
function gameEngine(){
    // part 1: Updating the snake array and Food
    if(isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press Any Key")
        snakeArray = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
        level = 0;
        speed = initialSpeed;
        scoreBox.innerHTML = "Score: " + score;
        levelBox.innerHTML = "Level: " + level;
    }

    // Eat food than increase score and regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score += 1;
        if (score > highScoreVar) {
            highScoreVar = score;
            localStorage.setItem('highScore', JSON.stringify(highScoreVar));
            highScoreBox.innerHTML = "High Score:" + highScoreVar;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) *Math.random()), y: Math.round(a + (b - a) * Math.random())}

        // Increase difficulty
        //This statement checks if the snake length is 3 than increase the speed by 1
        if (snakeArray.length % 3 === 0) {
            speed = initialSpeed + Math.floor(snakeArray.length / 3);
            level += 1;
            levelBox.innerHTML = "Level: " + level;
    }
    }

    
    
    
    //Move snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    // part 2: Render the snake and Food
    //Display the snake

    //This lines clears the board
    board.innerHTML = "";
    /* This line goes into each object 'e' with each object 
    property index in array */
    snakeArray.forEach((e, index)=>{
        //This lines creates a div element
        snakeElement = document.createElement('div');
        /*This styles sets the position of the div by going
        inside the object 'e' and getting the value */
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        /* if there is only one object in array than display head,
        And if there is two element the second element will go to 
        else since secod value index is two So in for each loop it
         displays head first and body in second if there is two object in array*/
        if(index === 0){
            snakeElement.classList.add('head');
            snakeElement.style.transform = `scale(1.2) rotate(${rotation}deg)`;
        }
        //This adds a CSS class snake to the div element
        else { 
            snakeElement.classList.add('snake')
        }
        //This adds the new div inside the board 
        board.appendChild(snakeElement); 
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic
let highScore = localStorage.getItem('highScore');
if (highScore === null){
    highScoreVar = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreVar));
}
else {
    highScoreVar = JSON.parse(highScore)
    highScoreBox.innerHTML = "High Score: "+ highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    musicSound.play();
    inputDir = {x: 0, y:1} //Game starts
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x= 0;
        inputDir.y= -1; 
        rotation = 0;
        break;

        case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x= 0;
        inputDir.y= 1;
        rotation = 180;
        break;

        case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x= -1;
        inputDir.y= 0;
        rotation = 270;
        break;

        case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x= 1;
        inputDir.y= 0;
        rotation =90;
        break;
    
        default:
            break;
    }
});
