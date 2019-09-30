class Quiz {
    constructor(questions) {
        this.playerName = "";
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getPlayerName() {
        return this.playerName;
    }
    getCurrentQuestion() {
        return this.questions[this.questionIndex];
    }
}
