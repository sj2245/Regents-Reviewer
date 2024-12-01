import NavItem from "./navitem";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/server/firebase";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { brandName, SharedDatabase } from "@/app/shared/shared";
import { IconLayoutDashboard, IconLogin, IconLogout, IconQuestionMark } from "@tabler/icons-react";

export default function NavMenu() {
  let { user, setUser } = useContext<any>(SharedDatabase);

  const logOut = (e?: any) => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem(`user`);
    window.location.href = `/`;
  }

  return (
    <ul className={`navMenu flex column gap5 p0 pl15`}>
      <NavItem name={`Home`} />
      <NavItem name={brandName} link={`/`} icon={<IconQuestionMark color={`var(--iconRight)`} />} />
      <NavItem name={`Questions Database`} link={`/table`} icon={<IconLayoutDashboard color={`var(--iconRight)`} />} />
      {user != null ? <>
        <div onClick={(e) => logOut(e)}>
          <NavItem name={`${user != null ? user?.displayName : `User`}, Log Out?`} link={`#`} icon={<IconLogout color={`var(--iconRight)`} />} />
        </div>
      </> : <>
        <NavItem name={`Sign In`} link={`/signin`} icon={<IconLogin color={`var(--iconRight)`} />} />
        <NavItem name={`Sign Up`} link={`/signup`} icon={<PersonAddIcon style={{ color: `var(--iconRight)` }} />} />
      </>}
    </ul>
  )
}