export class Game {
  answer: string;
  guesses: string[];
  answers: string[];

  constructor(serialized: string | null) {
    if (serialized) {
      const data = JSON.parse(serialized);
      this.answer = data.answer;
      this.guesses = data.guesses;
      this.answers = data.answers;
    } else {
      this.answer = this.randomWord();
      this.guesses = Array(6).fill('');
      this.answers = [];
    }
  }

  randomWord() {
    const WORDS = ['apple', 'chair', 'sugar', 'spoon', 'table', 'drink', 'house'];
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  toString() {
    return JSON.stringify({
      answer: this.answer,
      guesses: this.guesses,
      answers: this.answers
    });
  }

  updateKey(key: string) {
    const i = this.answers.length;

    if (key === 'backspace') {
      this.guesses[i] = this.guesses[i].slice(0, -1);
    } else if (this.guesses[i].length < 5) {
      this.guesses[i] += key;
    }
  }

  enterGuess(): boolean {
    const i = this.answers.length;
    const guess = this.guesses[i];

    if (guess.length !== 5) return false;

    let answerRow = [];

    for (let idx = 0; idx < 5; idx++) {
      if (guess[idx] === this.answer[idx]) {
        answerRow.push('x');
      } else if (this.answer.includes(guess[idx])) {
        answerRow.push('c');
      } else {
        answerRow.push('_');
      }
    }

    this.answers.push(answerRow.join(''));

    return true;
  }

  restart() {
    localStorage.removeItem('sverdle');
    return new Game(null);
  }
}
