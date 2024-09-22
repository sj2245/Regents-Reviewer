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

// Shakes Homework Fill out this array in the class type structure format above and below
// Grab the questions from the spread sheet
// export const SpreadSheetQuestions = [
//   new Question({
//     id
//   }),
// ]

export const SampleQuestions = [
  new Question({
    answer: 4,
    choices: [4, 22, 5, 8],
    id: `Question-${uniqueId()}`,
    question: `What is 2 + 2?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Extreme,
    explanation: `2 + 2 = 4 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
  new Question({
    answer: 5,
    choices: [3, 5, 4, 22],
    id: `Question-${uniqueId()}`,
    question: `What is 3 + 2?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Medium,
    explanation: `3 + 2 = 5 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
  new Question({
    answer: 5,
    choices: [3, 5, 4, 22],
    id: `Question-${uniqueId()}`,
    question: `What is 3 + 2?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Easy,
    explanation: `3 + 2 = 5 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
  new Question({
    answer: 22,
    choices: [3, 5, 4, 22],
    id: `Question-${uniqueId()}`,
    question: `What is 11 + 11?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Medium,
    explanation: `11 + 11 = 22 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
  new Question({
    answer: 22,
    choices: [3, 5, 4, 22],
    id: `Question-${uniqueId()}`,
    question: `What is 11 + 11?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Hard,
    explanation: `11 + 11 = 22 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
  new Question({
    answer: 100,
    choices: [100, 22, 50, 1010],
    id: `Question-${uniqueId()}`,
    question: `What is 10 x 10?`,
    subject: Subjects.Math.name,
    difficulty: Difficulties.Extreme,
    explanation: `10 x 10 = 100 Because I Said So`,
    topics: [MathTopics.Algebra, MathTopics.Arithmetic],
  }),
];

export default function SharedData({ children }: { children: React.ReactNode; }) {

  let [user, setUser] = useState<any>(null);
  let [beta, setBeta] = useState(false);
  let [loaded, setLoaded] = useState(false);
  let [questions, setQuestions] = useState([]);
  let [darkMode, setDarkMode] = useState(true);
  let [isSidebarOpen, setIsSidebarOpen] = useState(true);
  let [questionToEdit, setQuestionToEdit] = useState<any>(null);
  let [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return <>
    <SharedDatabase.Provider value={{ 
      user, setUser, 
      beta, setBeta,
      loaded, setLoaded,
      darkMode, setDarkMode,
      questions, setQuestions,
      isSidebarOpen, setIsSidebarOpen,
      questionToEdit, setQuestionToEdit,
      isMobileSidebarOpen, setMobileSidebarOpen
    }}>
      {children}
    </SharedDatabase.Provider>
  </>
}