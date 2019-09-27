/* • Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
• Låt användaren bestämma hur många frågor som ska visas.
• Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
• Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. (Hur kan vi lösa det?)
• Lämna in projektet som ett git-repo.
• VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
• VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
• VG: Responsiv design (edited)  */

window.addEventListener('DOMContentLoaded', (event) => {
    //get json file
    let json = getJSON("http://www.mocky.io/v2/5d8e48f1310000a2612b543b");
    //Get amount of new quesion from user 
    let getNum = localStorage.getItem("playernumOfQuestion");
    //add question object into quiz class
    let newQuestions = [];
    for (x = 0; x < getNum; x++) {
        newQuestions.push(new Question(json[x].question, json[x].choice, json[x].answer));
    }
    //get player name
    let getName = localStorage.getItem("playerName");
    let player = new Player(getName);
    //Put name in html
    document.getElementById("nameAfterInput").innerHTML = player.getName();
    var quiz = new Quiz(newQuestions);
    quiz.players.push(player);

    //next previos button
    let nextButton = document.getElementById("nextQuestion");
    let preButton = document.getElementById("preQuestion");

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

        let questionText = document.getElementById("question");
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
    showQuiz();
    nextPreButton(0);
    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});