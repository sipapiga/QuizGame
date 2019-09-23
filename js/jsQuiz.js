/* • Skriv en fungerande Quiz-applikation. Visa på sidan hur många frågor som är besvarade.
• Låt användaren bestämma hur många frågor som ska visas.
• Skriv klassen Quiz. Den ska hålla reda på användarens namn, frågorna som ingår och hur många frågor som har besvarats korrekt/felaktigt.
• Skriv klassen Question. Den ska hålla reda på frågekategori, fråga, svarsalternativ och om svarsalternativet är korrekt eller inte. (Hur kan vi lösa det?)
• Lämna in projektet som ett git-repo.
• VG: Klassen ska ha en correct-metod, som tar en array som parameter. Arrayen ska innehålla de DOM-element som hör till frågan och kontrollera vilka alternativ som är korrekt ifyllda.
• VG: Visa en fråga i taget, låt användaren bläddra mellan dem.
• VG: Responsiv design (edited)  */

window.addEventListener('DOMContentLoaded', (event) => {

    class Quiz {
        constructor(questions) {
            this.players = [];
            this.questions = questions;
            this.questionIndex = 0;
        }
        getQuestionIndex() {
            return this.questions[this.questionIndex];
        }

    }
    class Question {
        constructor(questionText, choices, answer) {
            this.questionText = questionText;
            this.choices = choices;
            this.answer = answer;

        }
    }

    function show() {
        console.log("show");
        let questionText = document.getElementById("question");
        questionText.innerHTML = quiz.getQuestionIndex().questionText;

        let choices = quiz.getQuestionIndex().choices;
        for (i = 0; i < choices.length; i++) {
            let choiceText = document.getElementById("choice" + i);
            choiceText.innerHTML = choices[i];
        }
    };
    let getName = localStorage.getItem("playerName");
    document.getElementById("nameAfterInput").innerHTML = JSON.parse(getName);
    let questions = [new Question("Where is Taj Mahal?", ["India", "China", "Iran", "Turkey"], "India"),
    new Question("What country is kilimanjaro located?", ["Uganda ", "Kenya  ", "Tanzania  ", "Ghana"], "Tanzania")];

    let quiz = new Quiz(questions);

    show();
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

    //get year to copyright in footer
    let today = new Date();
    let year = today.getFullYear();
    document.getElementById("footer").innerHTML = "<p>Copyright &copy;" + year + "</p>";
});