window.addEventListener('DOMContentLoaded', (event) => {
    //create all elements
    const quizDiv = document.getElementById("quiz");
    const welcomeDiv = document.getElementById("welcome");
    const okButton = document.getElementById("ok");
    const welcomeName = document.getElementById("nameAfterInput");
    const nextButton = document.getElementById("nextQuestion");
    const finishButton = document.getElementById("finishBtn");
    const score = document.getElementById("score");
    const category = document.getElementById("category");
    const inputs = document.getElementsByTagName("input");
    const playerName = document.getElementById("nameInput").value;

    //create some variables
    let currentProgress = 0;
    let newQuestions = [];
    let scoreHTML;
    //get json file

    okButton.addEventListener("click", startQuiz);

    function startQuiz() {
        const numOfQuestion = document.getElementById("chooseQuestion").selectedIndex + 1;
        quizDiv.style.display = "block";
        welcomeDiv.style.display = "none";
        welcomeName.innerHTML = playerName;
        fetch("http://www.mocky.io/v2/5d91e0d5310000e18410cb79")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let x = 0; x < numOfQuestion; x++) {
                    console.log(data[x].question);
                    newQuestions.push(new Question(data[x].question, data[x].choice));
                    quiz.renderQuiz();
                }
            });
        nextPreButton(currentProgress);
    }
    let question = new Question();
    question.category = "Geography & Travel";
    category.innerHTML = question.getCategory();

    let quiz = new Quiz(newQuestions);
    quiz.playerName = playerName;

    function nextPreButton(num) {
        let current = num;
        if (current === quiz.questions.length - 1) {
            nextButton.style.visibility = 'hidden';
            finishButton.style.visibility = 'visible';
        } else {
            nextButton.style.visibility = 'visible';
            finishButton.style.visibility = 'hidden';
        }
        resetAllButtons();
    }
    //show next question button
    function showNext() {
        let continueNext = quiz.selectAnswer();
        if (continueNext == true) {
            nextPreButton(quiz.questionIndex + 1);
            quiz.questionIndex++;
            quiz.renderQuiz();
        }
    }

    nextButton.addEventListener("click", showNext);
    finishButton.addEventListener("click", showScore);

    function resetAllButtons() {
        for (let i in inputs)
            if (inputs[i].type == "checkbox")
                inputs[i].checked = false;
    }

    function showScore() {
        quiz.selectAnswer();
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