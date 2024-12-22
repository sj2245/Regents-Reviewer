'use client';

import { useContext } from "react";
import { toast } from "react-toastify";
import { auth } from "@/server/firebase";
import PageContainer from "@/app/components/page/page";
import { User } from "@/app/shared/types/User";
import { SharedDatabase } from "@/app/shared/shared";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({
  title = `Sign In`,
  className = `signin`,
}: any) {

  let { users, setUser } = useContext<any>(SharedDatabase);

  const onSignIn = (e?: any) => {
    e.preventDefault();

    let form = e.target;
    let { email, password } = form;

    email = email.value;
    password = password.value;

    // console.log(`On Sign In`, {email, password});
    signInWithEmailAndPassword(auth, email, password).then(fireBaseUserCred => {
      if (fireBaseUserCred) {
        let firebaseUserEmail = fireBaseUserCred?.user?.email?.toLowerCase();
        let userFromDB = users.find((usr: User) => usr?.email?.toLowerCase() == firebaseUserEmail);
        if (userFromDB) {
          setUser(userFromDB);
          toast.success(`Sign In as ${userFromDB?.email}`);
          form.reset();
          window.location.href = `/`;
        } else {
          toast.error(`User does not exist`);
        }
      } else {
        toast.error(`Can't Sign In User`);
      }
    }).catch(fireBaseSignInUserError => {
      toast.error(`Failed to Sign In User`);
      console.log(`Firebase Sign In User Error`, fireBaseSignInUserError);
      return;
    });
  }

  return (
    <PageContainer title={title} desc={`This is the ${title}`} showSidebar={true}>
      <div className={`wrapper container ${className} ${className}Container`}>
        <div className={`formGroup container`}>
          <h3 className={`formTitle`}>{title}</h3>
          <form className={`${className}Form container`} onSubmit={(e) => onSignIn(e)}>
            <input type={`email`} name={`email`} className={`email`} placeholder={`Enter Email`} required />
            <input type={`password`} name={`password`} className={`password`} placeholder={`Enter Password`} required />
            <button type={`submit`} className={`submit`}>
              {title}
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  )
}