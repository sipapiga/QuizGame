import Question from './question.js';
import Quiz from './quiz.js';
import getFetch from './getJson.js';

window.addEventListener('DOMContentLoaded', (event) => {
  //create all elements
  const quizDiv = document.getElementById('quiz');
  const welcomeDiv = document.getElementById('welcome');
  const okButton = document.getElementById('ok');
  const welcomeName = document.getElementById('nameAfterInput');
  const nextButton = document.getElementById('nextQuestion');
  const finishButton = document.getElementById('finishBtn');
  const score = document.getElementById('score');
  const category = document.getElementById('category');
  const inputs = document.getElementsByTagName('input');
  const childElement = document.getElementsByClassName('child');
  const playerName = document.getElementById('nameInput').value;

  //create some variables
  let currentProgress = 0;
  let newQuestions = [];
  let scoreHTML;
  let question = new Question();
  let quiz;
  question.category = 'Geography & Travel';
  category.innerHTML = question.getCategory();

  okButton.addEventListener('click', startQuiz);

  async function startQuiz() {
    $('#alertDiv').hide();
    const numOfQuestion =
      document.getElementById('chooseQuestion').selectedIndex + 1;
    quizDiv.style.display = 'block';
    welcomeDiv.style.display = 'none';
    welcomeName.innerHTML = playerName;

    const questions = await getFetch(
      'https://www.mocky.io/v2/5d91e0d5310000e18410cb79'
    );
    //Shuffle an array
    questions.sort(() => Math.random() - 0.5);
    for (let x = 0; x < numOfQuestion; x++) {
      newQuestions.push(
        new Question(questions[x].question, questions[x].choice)
      );
    }
    quiz = new Quiz(newQuestions);
    quiz.playerName = playerName;
    quiz.renderQuiz();
    nextPreButton(currentProgress);
  }
  function nextPreButton(num) {
    let current = num;
    if (current === quiz.questions.length - 1) {
      nextButton.style.visibility = 'hidden';
      finishButton.style.visibility = 'visible';
    } else {
      nextButton.style.visibility = 'visible';
      finishButton.style.visibility = 'hidden';
    }
    resetAllButtons();
  }
  //show next question button
  function showNext() {
    let continueNext = quiz.selectAnswer();
    console.log(continueNext);
    if (continueNext == true) {
      nextPreButton(quiz.questionIndex + 1);
      quiz.questionIndex++;
      quiz.renderQuiz();
    }
  }

  nextButton.addEventListener('click', showNext);
  finishButton.addEventListener('click', showScore);

  function resetAllButtons() {
    for (let i in inputs) {
      if (inputs[i].type == 'checkbox') {
        inputs[i].checked = false;
      }
    }
    $('.child').removeClass('active');
  }

  function showScore() {
    let continueNext = quiz.selectAnswer();
    if (continueNext == true) {
      quizDiv.style.display = 'none';
      score.style.display = 'block';
      let calscore = Math.round((100 * quiz.score) / quiz.questions.length);
      let quizLevel =
        calscore >= 80
          ? 'You are a quiz master ' + quiz.playerName + '!'
          : calscore >= 60
          ? 'Well done ' + quiz.playerName + '!'
          : calscore >= 40
          ? 'Almost good, keep trying ' + quiz.playerName + '! :)'
          : 'You need to improve ' + quiz.playerName + '!';
      scoreHTML =
        "<h1 class='display-4 text-center'>" + quizLevel + '</h1><br>';
      scoreHTML +=
        "<p class='lead text-center'> You answered " +
        quiz.score +
        ' out of ' +
        quiz.questions.length +
        ' correct' +
        '<p>';
      score.innerHTML = scoreHTML;
    }
  }

  //get year to copyright in footer
  let today = new Date();
  let year = today.getFullYear();
  document.getElementById('footer').innerHTML =
    '<p>Copyright &copy;' + year + '</p>';
});
