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