import { initializeApp } from "firebase/app";
import { User } from "@/app/shared/types/User";
import { Question } from "@/app/shared/types/Question";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";

export const Environments = {
  prod: ``,
  beta: `beta_`,
  alpha: `alpha_`,
}

export const DatabaseTableNames = {
  users: `users`,
  quizzes: `quizzes`,
  features: `features`,
  questions: `questions`,
  notifications: `notifications`,
}

// export const environment = Environments.prod; // Implement this later
export const environment = process.env.NODE_ENV == `production` ? Environments.alpha : Environments.beta;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const googleProvider = provider;

const firebaseConfig = {
  appId: process.env.NEXT_PUBLIC_APPID,
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  projectId: process.env.NEXT_PUBLIC_PROJECTID || `capregentsapp`,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const usersDatabaseCollection = environment + DatabaseTableNames.users;
export const questionsDatabaseCollection = Environments.prod + DatabaseTableNames.questions;

export const generateUniqueID = () => {
  let id = Math.random().toString(36).substr(2, 9);
  return Array.from(id).map(char => Math.random() > 0.5 ? char.toUpperCase() : char).join(``);
}

export const generateDatabaseMetaData = (type: string, index: any) => {
  let uuid, uniqueID, currentTimeStampNoSpaces;
  uuid = generateUniqueID();
  currentTimeStampNoSpaces = new Date().toLocaleString().replaceAll(` `, `_`).replaceAll(`,`, `_`).replaceAll(`/`, `_`).replaceAll(`:`, `_`);
  uniqueID = `${type}_${index}_${currentTimeStampNoSpaces}_${uuid}`;
  return { uuid, uniqueID, currentTimeStampNoSpaces };
}

export const userConverter = {
  toFirestore: (usr: User) => {
    return JSON.parse(JSON.stringify(usr));
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new User(data);
  }
}

export const questionConverter = {
  toFirestore: (ques: Question) => {
    return JSON.parse(JSON.stringify(ques));
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Question(data);
  }
}

export const initializeQuestionsDB = (questionsArray: Question[], user: User) => {
  questionsArray.forEach((ques, quesIndex) => {
    let metaData = generateDatabaseMetaData(`Question`, quesIndex + 1);
    let { uuid, uniqueID } = metaData;
    addQuestion({
      ...ques,
      uuid,
      id: uniqueID,
      user_id: user?.id,
      user_email: user?.email,
    });
  });
}

export const addUser = async (usr: User) => {
  const userReference = await doc(db, usersDatabaseCollection, usr?.id).withConverter(userConverter);
  await setDoc(userReference, usr as User);
};

export const addQuestion = async (ques: Question, questionsDatabaseToUse = questionsDatabaseCollection) => {
  try {
    const questionReference = await doc(db, questionsDatabaseToUse, ques?.id).withConverter(questionConverter);
    await setDoc(questionReference, ques as Question);
    return questionReference;
  } catch (addQuestionError) {
    console.log(`Add Question Error`, addQuestionError);
    return addQuestionError;
  }
}

export const deleteQuestionFromDB = async (quesID: string) => {
  try {
    const questionReference = await doc(db, questionsDatabaseCollection, quesID).withConverter(questionConverter);
    await deleteDoc(questionReference);
    return questionReference;
  } catch (deleteQuestionError) {
    console.log(`Delete Question Error`, deleteQuestionError);
    return deleteQuestionError;
  }
}

// export const updateQuestionInDB = async (ques: Question) => {
  // Fill this in later
// }

export default app;