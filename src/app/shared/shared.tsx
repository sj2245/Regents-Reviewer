'use client';

import { User } from "./types/User";
import React, { useEffect } from "react";
import { Question } from "./types/Question";
import { createContext, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { SpreadSheetQuestions } from "./database/sample-questions";
import { DatabaseTableNames, db, usersDatabaseCollection } from "@/server/firebase";

export const SharedDatabase = createContext({});

export const brandName = `Regents Reviewer`;
export const logoURL = `/images/logos/QuizListLogo.svg`;
export const description = `${brandName} is an app to make and take quizzes.`;

export default function SharedData({ children }: { children: React.ReactNode; }) {

  // General app things
  let [beta, setBeta] = useState(false);
  let [loading, setLoading] = useState(false);
  let [darkMode, setDarkMode] = useState(true);
  
  // Users
  let [users, setUsers] = useState<User[]>();
  let [user, setUser] = useState<User | null>(null);
  let [usersLoading, setUsersLoading] = useState(false);

  // Questions
  let [questionsLoading, setQuestionsLoading] = useState(false);
  let [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  let [questions, setQuestions] = useState<Question[]>(SpreadSheetQuestions);

  useEffect(() => {
    // Database Tables
    const usersCollection = collection(db, usersDatabaseCollection);
    const questionsCollection = collection(db, DatabaseTableNames.questions);

    // Real Time Listener for Users
    const unsubscribeFromUserDatabase = onSnapshot(usersCollection, snapshot => {
        setUsersLoading(true);
        const usersFromDB: User[] = [];
        snapshot.forEach((doc) => usersFromDB.push({ ...doc.data() } as any));
        console.log(`Users Update from Firebase`, usersFromDB);
        setUsers(usersFromDB);
        setUsersLoading(false);
      }, error => {
        console.log(`Error getting Users from Firebase`, error);
        setUsersLoading(false);
      }
    );
    
    // Real Time Listener for Questions
    const unsubscribeFromQuestionDatabase = onSnapshot(questionsCollection, snapshot => {
        setQuestionsLoading(true);
        const questionsFromDB: Question[] = [];
        snapshot.forEach((doc) => questionsFromDB.push({ ...doc.data() }));
        console.log(`Questions Update from Firebase`, questionsFromDB);
        // setQuestions(questionsFromDB);
        setQuestionsLoading(false);
      }, error => {
        console.log(`Error getting Questions from Firebase`, error);
        setQuestionsLoading(false);
      }
    );

    return () => {
      unsubscribeFromUserDatabase();
      unsubscribeFromQuestionDatabase();
    };
  }, []);

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