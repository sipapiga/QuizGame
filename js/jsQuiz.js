/* • Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
• Låt användaren bestämma hur många frågor som ska visas.
• Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
• Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. (Hur kan vi lösa det?)
• Lämna in projektet som ett git-repo.
• VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
• VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
• VG: Responsiv design (edited)  */

class Quiz {
    constructor(questions) {
        this.players = new Player();
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {

    }

}
class Question {
    constructor(questionText, choices, answer) {
        this.questionText = questionText;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
class Player {
    constructor(name = "") {
        this.name = name;
        this.points = new Points();
    }
    getName() {
        return this.name;
    }
}

class Points {
    constructor() {
        this.ones = 0;
        this.twoes = 0;

    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    //get player name
    let getName = localStorage.getItem("playerName");
    //get number of question choosed
    let getNum = localStorage.getItem("playernumOfQuestion");
    //Get amount of new quesion from user 
    let questions = [
        new Question("Where is Taj Mahal?", ["India", "China", "Iran", "Turkey"], "India"),
        new Question("What country is kilimanjaro located?", ["Uganda ", "Kenya  ", "Tanzania  ", "Ghana"], "Tanzania"),
        new Question("In which country is the worlds highest waterfall?", ["Argentina", "Venezuela ", "Brazil ", "Colombia"], "Venezuela"),
        new Question("What is the largest country in the world (by area)?", ["United States", "Russia", "Canada", "China"], "Russia"),
        new Question("Which city's famous nickname is the 'Pearl of the Orient'?", ["Hong Kong", "Taipei", "Singapore", "TKyoto"], "Hong Kong"),
        new Question("Which of the following countries does NOT have a population exceeding 200 million?", ["Brazil", "Russia", "Idonesia", "Pakistan"], "Russia"),
        new Question("Muscat is the capital of which country?", ["Oman", "Bahrain ", "Jordan", "Yemen"], "Oman"),
        new Question("Which is the world's smallest continent (by area)?", ["South America", "Oceania", "Europe", "Antarctica"], "Oceania"),
        new Question("Which of these countries does NOT border Russia?", ["North Korea", "Poland", "Kazakhstan", "Armenia"], "Armenia"),
        new Question("Galápagos Islands form part of which South American country?", ["Chili", "Peru", "Ecuador", "Brazil"], "Ecuador"),
    ];

    let newQuestions = [];
    for (x = 0; x < getNum; x++) {
        console.log(questions[x]);
        newQuestions.push(questions[x]);
    }
    let player = new Player(getName);
    document.getElementById("nameAfterInput").innerHTML = player.getName();
    let quiz = new Quiz(newQuestions);

    //next previos button
    let nextButton = document.getElementById("nextQuestion");
    let preButton = document.getElementById("preQuestion");

    function nextPreButton(num) {
        let current = num;
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

    function showNext() {
        nextPreButton(quiz.questionIndex + 1);
        quiz.questionIndex++;
        show();
        console.log("next");
    }

    function showPrevious() {
        nextPreButton(quiz.questionIndex - 1);
        quiz.questionIndex--;
        show();
        console.log("pre");
    }
    nextButton.addEventListener("click", showNext);
    preButton.addEventListener("click", showPrevious);

    //show qyiz
    function show() {
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
        if (currentQuestion < 0) {

        } else {
            document.getElementById("questionNum").innerHTML = currentQuestion;
            let questionRemain = quiz.questions.length - currentQuestion;
            document.getElementById("questionRemain").innerHTML = questionRemain;
        }
    }
    console.log(newQuestions);
    console.log(quiz);
    console.log(player);

    show();
    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});