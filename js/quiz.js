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
        let questionText = document.getElementById("question");
        this.progress();
        questionText.innerHTML = this.getCurrentQuestion().questionText;
        let choiceJson = this.getCurrentQuestion().choices;
        for (let i = 0; i < choiceJson.length; i++) {
            let choices = document.getElementById("choice" + i);
            choices.innerHTML = choiceJson[i].text;
        }
    }
    //checking answer if it correct or incorrect and control click per question
    selectAnswer() {
        let numberOfChecksPerQuestion = 0;
        let correctPerQuestion = [];
        let checkbox = document.getElementsByName('chk');
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked == true) {
                numberOfChecksPerQuestion++;
                if (numberOfChecksPerQuestion < 3) {
                    let userAnswer = Array.from(document.getElementsByName('chk')).map((answer) => {
                        return answer.checked
                    });
                    let correctAnswers = this.getCurrentQuestion().choices.map((question) => {
                        return question.correct
                    });
                    if (userAnswer.join() == correctAnswers.join()) {
                        let alreadyCorrect = correctPerQuestion[this.questionIndex];
                        if (alreadyCorrect === undefined) {
                            correctPerQuestion[this.questionIndex] = true;
                            this.score++;
                        }
                    }
                } else {
                    alert("You can only select a maximum of 2 checkboxes");
                    checkbox[i].checked = true;
                    return false;
                }
            }
        }
        return true;
    }

    progress() {
        let currentQuestion = this.questionIndex + 1;
        document.getElementById("questionNum").innerHTML = currentQuestion;
        let questionRemain = this.questions.length - currentQuestion;
        document.getElementById("questionRemain").innerHTML = questionRemain;
    }
}
