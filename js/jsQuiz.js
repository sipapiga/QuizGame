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
    //create some variables
    let currentProgress = 0;
    let newQuestions = [];
    let scoreHTML;
    //get json file
    let json = getJSON("http://www.mocky.io/v2/5d8e48f1310000a2612b543b");

    okButton.addEventListener("click", startQuiz);

    function startQuiz() {
        const name = document.getElementById("nameInput").value;
        const numOfQuestion = document.getElementById("chooseQuestion").selectedIndex + 1;
        quizDiv.style.display = "block";
        welcomeDiv.style.display = "none";
        welcomeName.innerHTML = name;
        for (x = 0; x < numOfQuestion; x++) {
            newQuestions.push(new Question(json[x].question, json[x].choice, json[x].answer));
        }
        showQuiz();
        nextPreButton(currentProgress);
    }
    let player = new Player(name);
    var quiz = new Quiz(newQuestions);
    quiz.players.push(player);

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
            let choiceText = document.getElementById("choice" + i);
            choiceText.innerHTML = choices[i];
        }
        for (let x = 0; x <= 3; x++) {
            let guessButton = document.getElementById("btn" + x);
            guessButton.addEventListener("click", selectAnswer);
            resetButtonClass(guessButton); //*check here again*
        }
    }

    //checking answer if it correct or incorrect
    function selectAnswer(e) {
        const selectButton = e.target;
        quiz.checkAnswer(selectButton.innerText, selectButton);
    }

    function resetButtonClass(btn) {
        btn.classList.remove("wrong");
        btn.classList.remove("correct");
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
        let quizLevel = (calscore >= 80) ? "You are a quiz master!" :
            (calscore >= 60) ? "Well done!" :
                (calscore >= 40) ? "Almost good, keep trying! :)" :
                    "You need to improve!";
        scoreHTML = "<h1 class='display-4 text-center'>" + quizLevel + "</h1><br>";
        scoreHTML += "<p class='lead text-center'> You answered " + quiz.score + " out of " + quiz.questions.length + " correct" + "<p>";
        score.innerHTML = scoreHTML;
    }
    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});