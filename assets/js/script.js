const quizContainerEL = document.querySelector("#quiz-container")
const questionTitle = document.querySelector(".questions"); 
const answerCheck = document.querySelector(".answer-check p");
const timerEL = document.querySelector(".timer-countdown span"); 
const startBtn = document.querySelector("#start-btn"); 
const introPage = document.querySelector("#intro-page");
const result = document.querySelector("#result");
const highScorePage = document.querySelector("#high-score");
const savedScore = document.querySelector("#saved-initial-score p");
const submitBtn = document.querySelector("#submit-btn"); 
const backBtn = document.querySelector("#back-btn");
const clearBtn = document.querySelector("#clear-btn"); 
const choicesEl = document.querySelectorAll(".choices ul li");
const displayFinalScore = document.querySelector(".display-final-score span");
const inputInitials = document.querySelector("#initials");
const allHighScores = document.querySelector("#all-time-high-scores");
const viewHighScoreBtn = document.querySelector(".view-high-score");

let timerCount;
let score = 0;  
let interval;

let questionIndex = 0;

// Array of Quiz questions, choices and answers 
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
        answer: 3
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

// Timer Countdown
function timerCountdown(descreaseByValue){
    if(timerCount > 0 && timerCount > descreaseByValue) {
        timerCount = timerCount - descreaseByValue; 
        updateTimerUI(timerCount);
    }else{
        timerCount = 0
        clearInterval(interval);
        updateTimerUI(timerCount);
        updateQuizResultUI(score);
    }
}

// Hide intro, build quiz, starts the quiz timer 
function startQuiz(){
    timerCount = 75;
    buildQuiz(quizQuestions[questionIndex]);
    updateStartQuizUI();
    updateTimerUI(timerCount);
    interval = setInterval(timerCountdown.bind(this, 1),1000);
}

// Quiz page 
/**
 * Builds UI with Questions and Choices of answers
 * @param {question: "", choices: [], answer: 3} quizObject 
 */
function buildQuiz(quizObject){
    questionTitle.innerText = quizObject.questions; 
    choicesEl.forEach(function(element, index){
        element.innerText = quizObject.choices[index];
    })
}

// Check user answer, calculate score and reduce timer
function checkAnswer(userAnswer){
    let isCorrect;
    if (quizQuestions[questionIndex].choices[quizQuestions[questionIndex].answer] == userAnswer) {
        isCorrect = true;
        score += 20
    } else {
        isCorrect = false;
        timerCountdown(10)
        updateTimerUI(timerCount);
    }
    updateAnswerUI(isCorrect);
}

// Display next question once answer check is done
function dispatchNextQuestion(){
    let userAnswer = this.innerText
    checkAnswer(userAnswer);
    if(questionIndex < quizQuestions.length-1)  {
        questionIndex += 1;
        buildQuiz(quizQuestions[questionIndex]);
    } else {
        clearInterval(interval);
        updateQuizResultUI(score)
    }
}

// Collect userinput and store in local
function submitHighScore(){
    let yourScore = {
        initial: inputInitials.value,
        score: score
    };
    let previousScores = JSON.parse(localStorage.getItem("finalScores"));

    if(previousScores == null){
        previousScores = [];
    }
    previousScores.push(yourScore)
    localStorage.setItem("finalScores", JSON.stringify(previousScores))
    showHighScoreBoxUI(previousScores);
}

// Display highscore, pull from storage
function viewHighScore(){
    let previousScores = JSON.parse(localStorage.getItem("finalScores"));
    showHighScoreBoxUI(previousScores);
    clearInterval(interval);
    resetVaribles();
}

// clear highscore
function clearHighScore(){
    localStorage.removeItem("finalScores");
    allHighScores.innerHTML = ""; 
}

// reset to start page
function goBack(){
    resetVaribles();
    goBackToStartBoxUI();
}

// reset values
function resetVaribles(){
    questionIndex = 0;
    score = 0;
    timerCount = 0;
}

// user choice for answer
choicesEl.forEach(function(element,index){
    element.addEventListener("click", dispatchNextQuestion); 
}) 

// click listener
startBtn.addEventListener("click",startQuiz);
submitBtn.addEventListener("click",submitHighScore);
backBtn.addEventListener("click", goBack);
clearBtn.addEventListener("click", clearHighScore);
viewHighScoreBtn.addEventListener("click", viewHighScore)





// All UI Element Updates happens here
 
function updateStartQuizUI(){
    introPage.classList.add("hidden");
    quizContainerEL.classList.remove("hidden");
}

function updateTimerUI(timer){
    timerEL.innerText = timer
}

function updateAnswerUI(isCorrect){
    if(isCorrect){
        answerCheck.innerText = "Correct";
    }else{
        answerCheck.innerText = "Wrong";
    }
}

function updateQuizResultUI(score){
    displayFinalScore.innerText = score; 
    quizContainerEL.classList.add("hidden");
    result.classList.remove("hidden");
}

/**
 * 
 * @param [{}] allScores 
 */
function showHighScoreBoxUI(allScores){

    if(allScores.length > 0){
       allHighScores.innerHTML = (allScores.map(previousScore => `<li>${previousScore.initial} - ${previousScore.score}</li>`)).join('')
    }
    introPage.classList.add("hidden");
    quizContainerEL.classList.add("hidden");
    result.classList.add("hidden");
    highScorePage.classList.remove("hidden");
}

function goBackToStartBoxUI(){
    highScorePage.classList.add("hidden");
    introPage.classList.remove("hidden");
    answerCheck.innerText = "";
    inputInitials.value = "";
    updateTimerUI(0);
}