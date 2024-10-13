export class Question {
  [key: string]: any;
  constructor(quesObj: {
    id: string;
    subject: string;
    topics: string[],
    question: string,
    difficulty: string,
    explanation: string,
    answer: string | number | any,
    choices: string[] | number[] | any[],
  }) {
    Object.assign(this, quesObj);
  }
}