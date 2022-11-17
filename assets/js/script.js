/*Acceptance Criteria 
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score */ 

const quizContainerEL = document.querySelector("#quiz-container")
var questiontitle = document.querySelector(".questions"); 
var answer0 = document.getElementById("answer-0"); 
var answer1 = document.getElementById("answer-1");
var answer2 = document.getElementById("answer-2");
var answer3 = document.getElementById("answer-3");
var answerCheck = document.querySelector(".answer-check p");
var timerEL = document.querySelector(".timer-countdown span"); 
var startBtn = document.querySelector("#start-btn"); 
const introPage = document.querySelector("#intro-page");
const result = document.querySelector("#result");
const highScorePage = document.querySelector("#high-score");
const savedScore = document.querySelector("#saved-initial-score p");
const submitBtn = document.querySelector("#submit-btn"); 
const backBtn = document.querySelector("#back-btn");
const clearBtn = document.querySelector("#clear-btn"); 
const choicesEl = document.querySelectorAll(".choices ul li");

let timerCount = 75; 
let interval;


let questionIndex = 0;
// let choiceIndex = 0; 
// Quiz questions, options and answers 
const quizQuestions = [
    {
        questions: "Commonly used data types DO NOT include:", 
        choices: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"], 
        answer: 2
    }, 
    {
        questions: "The condition in an if/else statement is enclosed within __________.", 
        choices: ["1. Quotes", "2. Curly brackets", "3. Parentheses", "4. Square brackets"], 
        answer: 2
    }, 
    {
        questions: "Arrays in JavaScript can be used to store __________.", 
        choices: ["1.  Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"], 
        answer: 1
    }, 
    {
        questions: "String values must be enclosed within __________ when being assigned to variables.", 
        choices: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parentheses"], 
        answer: 2
    }, 
    {
        questions: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        choices: ["1. JavaScript", "2. Terminal/Bash", "3. For loops ", "4. Console.log"], 
        answer: 3
    }
];

// let answerChoices = quizQuestions[questionIndex].choices;
// console.log(answerChoices);

function startQuiz(){
    // Update UI to hide intro-pag box 
    introPage.classList.add("hidden");
    // show buildQuiz box 
    quizContainerEL.classList.remove("hidden");
    // buildQuiz question 
    buildQuiz();
    // start timer
    interval = setInterval(timerCountdown,1000);
    
}
// update questions
function buildQuiz(){
    // Question1 and choices
    questiontitle.innerText = quizQuestions[questionIndex]["questions"]; 

    // answer0.innerText = quizQuestions[questionIndex]["choices"][0];
    // answer1.innerText = quizQuestions[questionIndex].choices[1];
    // answer2.innerText = quizQuestions[questionIndex].choices[2];
    // answer3.innerText = quizQuestions[questionIndex].choices[3];

    for(let answerChoices = 0; answerChoices <= quizQuestions[questionIndex.choices]; answerChoices++){
        
        console.log (answerChoices); 
    
    }

}


function checkAnswer(){

    if (quizQuestions[questionIndex].choices[quizQuestions[questionIndex].answer] == this.innerText) {
        answerCheck.innerText = "correct";
    } else {
        answerCheck.innerText = "wrong";       
    }

    if(questionIndex < quizQuestions.length-1)  {
        questionIndex += 1;
        console.log(quizQuestions.length);
        buildQuiz();

    } else {
        quizContainerEL.classList.add("hidden");
        result.classList.remove("hidden");
    }
   
}

function submitAnswer(){
    //what do you have to do when they click submit? 
    
    console.log("answer submit")
    result.classList.add("hidden");
    highScorePage.classList.remove("hidden");

}

function goBack(){
    highScorePage.classList.add("hidden");
    introPage.classList.remove("hidden");
    questionIndex = 0;
    answerCheck.innerText = "";

}

// console.log(choicesEl);

for (var answers = 0; answers < choicesEl.length; answers++) {
    choicesEl[answers].addEventListener("click",checkAnswer);
} 

startBtn.addEventListener("click",startQuiz);
submitBtn.addEventListener("click",submitAnswer);
backBtn.addEventListener("click", goBack);

function timerCountdown(){
    if(timerCount > 0) {
        timerCount = timerCount - 1; 
        timerEL.innerText = timerCount
    }else{
        clearInterval(interval);
    }
}


// answer0.addEventListener("click",checkAnswer); 
// answer1.addEventListener("click",checkAnswer); 
// answer2.addEventListener("click",checkAnswer); 
// answer3.addEventListener("click",checkAnswer); 

