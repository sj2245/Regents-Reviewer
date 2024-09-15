'use client';

import React from "react";
import { createContext, useState } from "react";

export const SharedDatabase = createContext({});

export default function SharedData({ children }: { children: React.ReactNode; }) {

  let [user, setUser] = useState<any>(null);
  let [darkMode, setDarkMode] = useState(true);

  return <>
    <SharedDatabase.Provider value={{ 
        user, setUser, darkMode, setDarkMode,
    }}>
        {children}
    </SharedDatabase.Provider>
  </>
}