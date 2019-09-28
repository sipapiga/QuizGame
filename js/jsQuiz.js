window.addEventListener('DOMContentLoaded', (event) => {
    //create all elements
    const quizDiv = document.getElementById("quiz");
    const welcomeDiv = document.getElementById("welcome");
    const okButton = document.getElementById("ok");
    const name = document.getElementById("nameInput").value;
    const welcomeName = document.getElementById("nameAfterInput");
    const numOfQuestion = document.getElementById("chooseQuestion").selectedIndex + 1;
    const questionText = document.getElementById("question");
    const nextButton = document.getElementById("nextQuestion");
    const preButton = document.getElementById("preQuestion");

    //create some variables
    let currentProgress = 0;
    let newQuestions = [];
    //get json file
    let json = getJSON("http://www.mocky.io/v2/5d8e48f1310000a2612b543b");

    okButton.addEventListener("click", startQuiz);

    function startQuiz() {
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
        console.log(current);
        if (current === quiz.questions.length - 1) {
            nextButton.style.visibility = 'hidden';
        } else {
            nextButton.style.visibility = 'visible';
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
    //show quiz
    function showQuiz() {
        progress();
        questionText.innerHTML = quiz.getQuestionIndex().questionText;

        let choices = quiz.getQuestionIndex().choices;
        for (i = 0; i < choices.length; i++) {
            let choiceText = document.getElementById("choice" + i);
            choiceText.innerHTML = choices[i];
        }
    }
    function progress() {
        let currentQuestion = quiz.questionIndex + 1;
        document.getElementById("questionNum").innerHTML = currentQuestion;
        let questionRemain = quiz.questions.length - currentQuestion;
        document.getElementById("questionRemain").innerHTML = questionRemain;

    }
    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});