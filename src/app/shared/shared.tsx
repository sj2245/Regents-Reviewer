'use client';

import React from "react";
import { uniqueId } from "lodash";
import { createContext, useState } from "react";

export const brandName = `Regents Reviewer`;
export const SharedDatabase = createContext({});

export const Difficulties = {
  Easy: `Easy`,
  Medium: `Medium`,
  Hard: `Hard`,
  Extreme: `Extreme`,
}

export const States = {
  Ready: `Ready`,
  Error: `Error`,
  Cancel: `Cancel`,
  Active: `Active`,
  Success: `Success`,
  Loading: `Loading`,
  Disabled: `Disabled`,
}

export const MathTopics = {
  Algebra: `Algebra`,
  Geometry: `Geometry`,
  Arithmetic: `Arithmetic`,
}

export const ProgrammingTopics = {
  Python: `Python`,
  JavaScript: `JavaScript`,
}

export const ScienceTopics = {
  Geology: `Geology`,
  Biology: `Biology`,
  Chemistry: `Chemistry`,
  Astronomy: `Astronomy`,
}

export const LanguageArtsTopics = {
  Grammar: `Grammar`,
  Spelling: `Spelling`,
  Literature: `Literature`,
  Comprehension: `Comprehension`,
}

export const SocialStudiesTopics = {
  History: `History`,
  Geography: `Geography`,
  Anthropology: `Anthropology`,
}

export const Subjects = {
  Math: {
      name: `Math`,
      topics: Object.values(MathTopics),
  },
  Science: {
      name: `Science`,
      topics: Object.values(ScienceTopics),
  },
  Programming: {
      name: `Programming`,
      topics: Object.values(ProgrammingTopics),
  },
  Language_Arts: {
      name: `Language Arts`,
      topics: Object.values(LanguageArtsTopics),
  },
  Social_Studies: {
      name: `Social Studies`,
      topics: Object.values(SocialStudiesTopics),
  },
}

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

export const SpreadSheetQuestions = [
  new Question({
    id: "001",
    subject: "Math",
    topics: ["Expressions and Equations", "Dependent and Independent Variables"],
    question: "The formula for the surface area of a right rectangular prism is A=2lw+2hw+2lh, where l, w, and h represent the length, width, and height, respectively. Which term of this formula is not dependent on the height?",
    difficulty: "Medium",
    explanation: "In the formula A=2lw+2hw+2lh, the term 2lw represents the product of length and width, which does not depend on the height. The other terms (2hw and 2lh) include h, making them dependent on the height.",
    answer: "2lw",
    choices: ["2w", "2lw", "2hw", "2lh"]
  }),
  new Question({
    id: "002",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "What is the degree of the polynomial 2x + x³ + 5x²?",
    difficulty: "Medium",
    explanation: "The degree of a polynomial is the highest power of the variable. Here, the highest power is 3 (from x³), so the degree is 3.",
    answer: 3,
    choices: ["1", "2", "3", "4"]
  }),
  new Question({
    id: "003",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "What is the degree of the polynomial 5x − 3x² − 1 + 7x³?",
    difficulty: "Medium",
    explanation: "The degree is determined by the highest power of the variable. The highest power here is 3 (from 7x³).",
    answer: 3,
    choices: ["1", "2", "3", "5"]
  }),
  new Question({
    id: "004",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "What is the constant term of the polynomial 4d + 6 + 3d²?",
    difficulty: "Easy",
    explanation: "The constant term is the term with no variable. In this case, it's 6.",
    answer: 1,
    choices: ["6", "2", "3", "4"]
  }),
  new Question({
    id: "005",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "When 3x² + 7x − 6 + 2x³ is written in standard form, the leading coefficient is",
    difficulty: "Medium",
    explanation: "In standard form, the polynomial is written as 2x³ + 3x² + 7x − 6. The leading coefficient is 2.",
    answer: 2,
    choices: ["7", "2", "3", "-6"]
  }),
  new Question({
    id: "006",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "When multiplying polynomials for a math assignment, Pat found the product to be −4x + 8x² − 2x³ + 5. He then had to state the leading coefficient of this polynomial. Pat wrote down −4. Do you agree with Pat's answer? Explain your reasoning.",
    difficulty: "Hard",
    explanation: "No, Pat is incorrect. The leading coefficient is the coefficient of the term with the highest power. Here, the highest power is 3 (from −2x³), so the leading coefficient is −2.",
    answer: "No, −2 is the coefficient of the term with the highest power.",
    choices: []
  }),
  new Question({
    id: "007",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "Students were asked to write 6x⁵ + 8x − 3x³ + 7x⁷ in standard form. Shown below are four student responses. Which student is correct?",
    difficulty: "Medium",
    explanation: "The correct standard form arranges the terms by descending powers of x. Anne's response is correct: 7x⁷ + 6x⁵ − 3x³ + 8x.",
    answer: 1,
    choices: ["Anne", "Bob", "Carrie", "Dylan"]
  }),
  new Question({
    id: "008",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "Students were asked to write 2x³ + 3x + 4x² + 1 in standard form. Four student responses are shown below. Which student’s response is correct?",
    difficulty: "Medium",
    explanation: "The correct standard form arranges the terms by descending powers of x. Ryan's response is correct: 2x³ + 4x² + 3x + 1.",
    answer: 3,
    choices: ["Alexa", "Carol", "Ryan", "Eric"]
  }),
  new Question({
    id: "009",
    subject: "Math",
    topics: ["Expressions and Equations", "Modeling Expressions"],
    question: "Mrs. Allard asked her students to identify which of the polynomials below are in standard form and explain why.",
    difficulty: "Medium",
    explanation: "Fred is correct because the exponents of the terms in II and III are in decreasing order.",
    answer: 3,
    choices: [
      "Tyler said I and II because the coefficients are decreasing.",
      "Susan said only II because all the numbers are decreasing.",
      "Fred said II and III because the exponents are decreasing.",
      "Alyssa said II and III because they each have three terms."
    ]
  }),
]


export default function SharedData({ children }: { children: React.ReactNode; }) {

  let [beta, setBeta] = useState(false);
  let [user, setUser] = useState<any>(null);
  let [loaded, setLoaded] = useState(false);
  let [darkMode, setDarkMode] = useState(true);
  let [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  let [questions, setQuestions] = useState<Question[]>(SpreadSheetQuestions);

  return <>
    <SharedDatabase.Provider value={{ 
      user, setUser, 
      beta, setBeta,
      loaded, setLoaded,
      darkMode, setDarkMode,
      questions, setQuestions,
      questionToEdit, setQuestionToEdit,
    }}>
      {children}
    </SharedDatabase.Provider>
  </>
}