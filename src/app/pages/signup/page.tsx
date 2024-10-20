'use client';

import { auth } from "@/server/firebase";
import Page from "@/app/components/page/page";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignUp({
  title = `Sign Up`,
  className = `signup`,
}: any) {

  const onSignUp = (e?: any) => {
    e.preventDefault();

    let form = e.target;
    let { email, password } = form;

    email = email.value;
    password = password.value;

    let usr = {
      email,
      password,
    }

    console.log(`On Sign Up`, {
      e,
      usr
    });

    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <Page title={title} desc={`This is the ${title}`} showSidebar={true}>
      <div className={`wrapper container ${className} ${className}Container`}>
        <div className={`formGroup container`}>
          <h3 className={`formTitle`}>{title}</h3>
          <form className={`${className}Form container`} onSubmit={(e) => onSignUp(e)}>
            <input type={`email`} name={`email`} className={`email`} placeholder={`Enter Email`} required />
            <input type={`password`} name={`password`} className={`password`} placeholder={`Enter Password`} required />
            <button type={`submit`} className={`submit`}>
              {title}
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}