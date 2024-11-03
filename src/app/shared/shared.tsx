'use client';

import React from "react";
import { User } from "./types/User";
import { Question } from "./types/Question";
import { createContext, useState } from "react";
import { SpreadSheetQuestions } from "./database/sample-questions";

export const SharedDatabase = createContext({});

export const brandName = `Regents Reviewer`;
export const logoURL = `/images/logos/QuizListLogo.svg`;
export const description = `${brandName} is an app to make and take quizzes.`;

export default function SharedData({ children }: { children: React.ReactNode; }) {

  // General app things
  let [beta, setBeta] = useState(false);
  let [users, setUsers] = useState<User[]>()
  let [loading, setLoading] = useState(false);
  let [darkMode, setDarkMode] = useState(true);
  let [user, setUser] = useState<User | null>(null);

  // Specific items
  let [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  let [questions, setQuestions] = useState<Question[]>(SpreadSheetQuestions);

  return <>
    <SharedDatabase.Provider value={{ 
      user, setUser, 
      beta, setBeta,
      users, setUsers,
      loading, setLoading,
      darkMode, setDarkMode,
      questions, setQuestions,
      questionToEdit, setQuestionToEdit,
    }}>
      {children}
    </SharedDatabase.Provider>
  </>
}