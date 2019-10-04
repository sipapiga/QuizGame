class Quiz {
    constructor(questions) {
        this.playerName = "";
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }
    //show quiz
    renderQuiz() {
        console.log("Q index " + this.questionIndex);
        const questionText = document.getElementById("question");
        this.progress();
        questionText.innerHTML = this.getCurrentQuestion().questionText;
        let choiceJson = this.getCurrentQuestion().choices;
        for (let i = 0; i < choiceJson.length; i++) {
            let choices = document.getElementById("choice" + i);
            choices.innerHTML = choiceJson[i].text;
            let selectedChoice = document.getElementById("btn" + i);
            if (choiceJson[i].correct == "true") {
                selectedChoice.dataset.correct = "true";
            } else {
                selectedChoice.dataset.correct = "false";
            }
        }
    }
    //checking answer if it correct or incorrect and control click per question
    selectAnswer() {
        let numberOfChecksPerQuestion = 0;
        let correctPerQuestion = [];
        let userAnswer = document.getElementsByName('chk');
        for (let i = 0; i < userAnswer.length; i++) {
            if (userAnswer[i].checked == true) {
                numberOfChecksPerQuestion++;
                if (numberOfChecksPerQuestion < 3) {
                    let dataSetCorrect = userAnswer[i].dataset.correct;
                    if (dataSetCorrect == "true") {
                        console.log("You are right");
                        let alreadyCorrect = correctPerQuestion[this.questionIndex];
                        if (alreadyCorrect === undefined) {
                            correctPerQuestion[this.questionIndex] = true;
                            this.score++;
                            console.log("score " + this.score);
                        }
                    } else {
                        console.log("You are wrong");
                    }
                } else {
                    alert("You can only select a maximum of 2 checkboxes");
                    userAnswer[i].checked = false;
                    if (this.score > 0) {
                        this.score--;
                    }
                }
            }
        }
    }
    progress() {
        let currentQuestion = this.questionIndex + 1;
        document.getElementById("questionNum").innerHTML = currentQuestion;
        let questionRemain = this.questions.length - currentQuestion;
        document.getElementById("questionRemain").innerHTML = questionRemain;

    }
}
