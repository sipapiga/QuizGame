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
    checkAnswer(answer) {
        if (answer == this.getCurrentQuestion().answer) {
            this.score++;
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