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
    getQuiz() {
        const questionText = document.getElementById("question");
        this.progress();
        console.log("QuestionIndex F "+ this.questionIndex);
        questionText.innerHTML = this.getCurrentQuestion().questionText;
        let choices = this.getCurrentQuestion().choices;
        console.log("QuestionIndex A "+ this.questionIndex);
        for (let i = 0; i < choices.length; i++) {
            const choiceText = document.getElementById("btn" + i);
            choiceText.innerHTML = choices[i].text;
            const buttonAdd = document.getElementById("btn" + i);
            buttonAdd.addEventListener("click", this.selectAnswer);
            if (choices[i].correct == "true") {
                buttonAdd.dataset.correct = "true";
            } else {
                buttonAdd.dataset.correct = "false";
            }
        }
        console.log("QuestionIndex C "+ this.questionIndex);
    }

    //checking answer if it correct or incorrect and control how many click per question
    selectAnswer(e) {
        let numberOfClicksPerQuestion = [];
        let correctPerQuestion = [];
        console.log("QuestionIndex "+ this);
        let clicksInThisQuestion = numberOfClicksPerQuestion[this.questionIndex];
        if (!clicksInThisQuestion) {
            clicksInThisQuestion = 1;
        }
        else {
            clicksInThisQuestion = clicksInThisQuestion + 1;
        }
        numberOfClicksPerQuestion[this.questionIndex] = clicksInThisQuestion;
        console.log( numberOfClicksPerQuestion[this.questionIndex] );
        if (clicksInThisQuestion < 3) {
            let selectedButton = e.target;
            let dataSetCorrect = e.target.dataset.correct;

            if (dataSetCorrect == "true") {
                console.log("You are right");
                let alreadyCorrect = correctPerQuestion[this.questionIndex];
                if (alreadyCorrect === undefined) {
                    correctPerQuestion[this.questionIndex] = true;

                    this.score++;
                    console.log(this.score);
                }
                numberOfClicksPerQuestion[this.questionIndex] = clicksInThisQuestion;
                selectedButton.classList.add("correct");
            } else {
                console.log("You are wrong");
                selectedButton.classList.add("wrong");
            }
        } else {
            this.questionIndex++;
            this.getQuiz();
        }
    }
    progress() {
        let currentQuestion = this.questionIndex + 1;
        document.getElementById("questionNum").innerHTML = currentQuestion;
        let questionRemain = this.questions.length - currentQuestion;
        document.getElementById("questionRemain").innerHTML = questionRemain;

    }
}
