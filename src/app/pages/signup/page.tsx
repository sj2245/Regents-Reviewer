'use client';

import { useContext } from "react";
import { toast } from "react-toastify";
import PageContainer from "@/app/components/page/page";
import { User } from "@/app/shared/types/User";
import { addUser, auth } from "@/server/firebase";
import { SharedDatabase } from "@/app/shared/shared";
import { createUserWithEmailAndPassword} from "firebase/auth";

export default function SignUp({
  title = `Sign Up`,
  className = `signup`,
}: any) {

  let { users } = useContext<any>(SharedDatabase);

  const onSignUp = (e?: any) => {
    e.preventDefault();

    let form = e.target;
    let { email, password } = form;

    email = email.value;
    password = password.value;

    createUserWithEmailAndPassword(auth, email, password).then(async fireBaseUserCred => {
      let { uid } = fireBaseUserCred?.user;
      let usersLength = users ? users?.length : 0;
      let index = usersLength + 1;
      let newUser = new User({
        email,
        index,
        uid,
      });
      await addUser(newUser);
      toast.success(`User Created`);
      form.reset();
      window.location.href = `/signin`;
    }).catch(fireBaseCreateUserError => {
      toast.error(`Failed to Create User`);
      console.log(`Firebase Create User Error`, fireBaseCreateUserError);
      return;
    });
  }

  return (
    <PageContainer title={title} desc={`This is the ${title}`} showSidebar={true}>
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
    </PageContainer>
  )
}