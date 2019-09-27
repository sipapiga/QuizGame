class Quiz {
    constructor(questions) {
        this.players = [];
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {

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