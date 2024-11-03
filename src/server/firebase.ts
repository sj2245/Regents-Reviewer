import { initializeApp } from "firebase/app";
import { User } from "@/app/shared/types/User";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const Environments = {
  beta: `beta_`,
  prod: ``,
}

export const DatabaseTableNames = {
  questions: `questions`,
  users: `users`,
}

export const environment = process.env.NODE_ENV == `production` ? Environments.prod : Environments.beta;

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

export const userConverter = {
  toFirestore: (usr: User) => {
    return JSON.parse(JSON.stringify(usr));
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new User(data);
  }
}

export const addUser = async (usr: User) => {
  let environmentDBName = environment + DatabaseTableNames.users;
  const userReference = doc(db, environmentDBName, usr?.id).withConverter(userConverter);
  await setDoc(userReference, usr as User);
};

export default app;