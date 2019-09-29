class Quiz {
    constructor(questions) {
        this.players = [];
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }
    checkAnswer(answer,btn) {
        if (answer == this.getCurrentQuestion().answer) {
            this.score++;
            console.log(btn);
            btn.classList.add("correct");
        }else{
            btn.classList.add("wrong");
        }
    }  
}

class Player {
    constructor(name = "") {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
