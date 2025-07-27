export class Question {
  [key: string]: any;
  constructor(quesObj: {
    id: string;
    uuid?: any;
    user_id?: any;
    subject: string;
    topics: string[],
    user_email?: any;
    question: string,
    images?: string[],
    difficulty: string,
    explanation: string,
    updated?: string | Date,
    answer: string | number | any,
    choices: string[] | number[] | any[],
  }) {
    Object.assign(this, quesObj);
  }
}