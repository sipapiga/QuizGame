window.addEventListener('DOMContentLoaded', (event) => {
    //create all elements
    const quizDiv = document.getElementById("quiz");
    const welcomeDiv = document.getElementById("welcome");
    const okButton = document.getElementById("ok");
    const welcomeName = document.getElementById("nameAfterInput");
    const questionText = document.getElementById("question");
    const nextButton = document.getElementById("nextQuestion");
    const preButton = document.getElementById("preQuestion");
    const finishButton = document.getElementById("finishBtn");
    const score = document.getElementById("score");
    var playerName = document.getElementById("nameInput").value;
    var numOfQuestion = document.getElementById("chooseQuestion").selectedIndex + 1;


    //create some variables
    let currentProgress = 0;
    let newQuestions = [];
    let scoreHTML;
    const numberOfClicksPerQuestion = [];
    const correctPerQuestion = [];
    //get json file
    let json = getJSON("http://www.mocky.io/v2/5d91e0d5310000e18410cb79");

    okButton.addEventListener("click", startQuiz);

    function startQuiz() {
        quizDiv.style.display = "block";
        welcomeDiv.style.display = "none";
        welcomeName.innerHTML = playerName;
        for (x = 0; x < numOfQuestion; x++) {
            newQuestions.push(new Question(json[x].question, json[x].choice));
        }
        showQuiz();
        nextPreButton(currentProgress);
    }
    var quiz = new Quiz(newQuestions);
    quiz.playerName = playerName;
    console.log(quiz.playerName);
    console.log(quiz);

    function nextPreButton(num) {
        let current = num;
        if (current === quiz.questions.length - 1) {
            nextButton.style.visibility = 'hidden';
            finishButton.style.visibility = 'visible';
        } else {
            nextButton.style.visibility = 'visible';
            finishButton.style.visibility = 'hidden';
        } if (current === 0) {
            preButton.style.visibility = 'hidden';
        } else {
            preButton.style.visibility = 'visible';
        }
        resetAllButtons();
    }
    //show next question button
    function showNext() {
        nextPreButton(quiz.questionIndex + 1);
        quiz.questionIndex++;
        showQuiz();
    }
    //show previous question button
    function showPrevious() {
        nextPreButton(quiz.questionIndex - 1);
        quiz.questionIndex--;
        showQuiz();
    }
    nextButton.addEventListener("click", showNext);
    preButton.addEventListener("click", showPrevious);
    finishButton.addEventListener("click", showScore);
    //show quiz
    function showQuiz() {
        progress();
        questionText.innerHTML = quiz.getCurrentQuestion().questionText;
        let choices = quiz.getCurrentQuestion().choices;
        for (i = 0; i < choices.length; i++) {
            let choiceText = document.getElementById("btn" + i);
            choiceText.innerHTML = choices[i].text;
            const buttonAdd = document.getElementById("btn" + i);
            buttonAdd.addEventListener("click", selectAnswer);
            if (choices[i].correct == "true") {
                console.log("Correct choice: " + choices[i].text);
                buttonAdd.dataset.correct = "true";
            } else {
                buttonAdd.dataset.correct = "false";
            }
        }
    }
    //checking answer if it correct or incorrect
    function selectAnswer(e) {
            let selectedButton = e.target;
            console.log("element: " + e.target);
            let userAnswer = e.target.innerHTML;
            let dataSetCorrect = e.target.dataset.correct;
            console.log("Your answer: " + userAnswer + " correct?: " + dataSetCorrect);
            console.log("question now: " + quiz.questionIndex);
            if (dataSetCorrect == "true") {
                console.log("You are right");
                let alreadyCorrect = correctPerQuestion[quiz.questionIndex];
                if (alreadyCorrect === undefined) {
                    console.log("Du får en poäng!");
                    correctPerQuestion[quiz.questionIndex] = true;
                    quiz.score++;
                } else {
                    console.log("no point");
                }
                selectedButton.classList.add("correct");
            } else {
                console.log("You are wrong");
                selectedButton.classList.add("wrong");
            }
    }

    function resetAllButtons() {
        console.log("reset now??");
        for (var i = 0; i < 4; i++) {
            const oneButton = document.getElementById("btn" + i);
            oneButton.classList.remove("wrong");
            oneButton.classList.remove("correct");
        }
    }

    function progress() {
        let currentQuestion = quiz.questionIndex + 1;
        document.getElementById("questionNum").innerHTML = currentQuestion;
        let questionRemain = quiz.questions.length - currentQuestion;
        document.getElementById("questionRemain").innerHTML = questionRemain;

    }
    function showScore() {
        quizDiv.style.display = "none";
        score.style.display = "block";
        let calscore = Math.round(100 * quiz.score / quiz.questions.length);
        let quizLevel = (calscore >= 80) ? "You are a quiz master " + quiz.playerName + "!" :
            (calscore >= 60) ? "Well done " + quiz.playerName + "!" :
                (calscore >= 40) ? "Almost good, keep trying " + quiz.playerName + "! :)" :
                    "You need to improve " + quiz.playerName + "!";
        scoreHTML = "<h1 class='display-4 text-center'>" + quizLevel + "</h1><br>";
        scoreHTML += "<p class='lead text-center'> You answered " + quiz.score + " out of " + quiz.questions.length + " correct" + "<p>";
        score.innerHTML = scoreHTML;
    }
    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});