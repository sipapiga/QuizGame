//Module Pattern
export default class Question {
  //Constructior Pattern
  constructor(questionText, choices) {
    this.category = '';
    this.questionText = questionText;
    this.choices = choices;
  }
  getCategory() {
    return this.category;
  }
}
