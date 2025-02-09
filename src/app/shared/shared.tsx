'use client';

import { User } from "./types/User";
import React, { useEffect } from "react";
import { Question } from "./types/Question";
import { createContext, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db, questionsDatabaseCollection, usersDatabaseCollection } from "@/server/firebase";

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
  let [questions, setQuestions] = useState<Question[]>([]);
  let [questionsLoading, setQuestionsLoading] = useState<boolean>(true);
  let [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);

  useEffect(() => { // Logic Will Run Whenever items in the [] are changed
    if (user != null) {
      localStorage.setItem(`user`, JSON.stringify(user));
    }
  }, [user])

  useEffect(() => { // App First Load Logic
    // Check For Stored User
    const hasStoredUser = localStorage.getItem(`user`);
    if (hasStoredUser) {
      const storedUser = JSON.parse(hasStoredUser);
      if (storedUser) {
        setUser(storedUser);
      }
    }

    // Database Tables
    const usersCollection = collection(db, usersDatabaseCollection);
    const questionsCollection = collection(db, questionsDatabaseCollection);

    // Real Time Listener for Users
    const usersRealTimeListener = onSnapshot(usersCollection, snapshot => {
        setUsersLoading(true);
        const usersFromDB: User[] = [];
        snapshot.forEach((doc) => usersFromDB.push({ ...doc.data() } as any));
        console.log(`Update from ${usersDatabaseCollection} Firebase`, usersFromDB);
        setUsers(usersFromDB);
        setUsersLoading(false);
      }, error => {
        console.log(`Error getting from ${usersDatabaseCollection} Firebase`, error);
        setUsersLoading(false);
      }
    );
    
    // Real Time Listener for Questions
    const questionsRealTimeListener = onSnapshot(questionsCollection, snapshot => {
        setQuestionsLoading(true);
        const questionsFromDB: Question[] = [];
        snapshot.forEach((doc) => questionsFromDB.push({ ...doc.data() }));
        console.log(`Update from ${questionsDatabaseCollection} Firebase`, questionsFromDB);
        setQuestions(questionsFromDB);
        setQuestionsLoading(false);
      }, error => {
        console.log(`Error getting from ${questionsDatabaseCollection} Firebase`, error);
        setQuestionsLoading(false);
      }
    );

    return () => {
      usersRealTimeListener();
      questionsRealTimeListener();
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
      questionsLoading, setQuestionsLoading,
    }}>
      {children}
    </SharedDatabase.Provider>
  </>
}