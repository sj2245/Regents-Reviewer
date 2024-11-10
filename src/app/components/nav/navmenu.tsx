import NavItem from "./navitem";
import { useContext } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { brandName, SharedDatabase } from "@/app/shared/shared";
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconLogout, IconMailForward, IconQuestionMark, IconSettings, IconUser, IconUserPlus, IconWorld } from "@tabler/icons-react";

export default function NavMenu() {
  let { user } = useContext<any>(SharedDatabase);

  return (
    <ul className={`navMenu flex column gap5 p0 pl15`}>
      <NavItem name={`Home`} />
      <NavItem name={brandName} link={`/`} icon={<IconQuestionMark color={`var(--iconRight)`} />} />
      <NavItem name={`Questions Database`} link={`/`} icon={<IconLayoutDashboard color={`var(--iconRight)`} />} />
      <NavItem name={user != null ? user?.displayName : `User`} />
      {user != null ? <>
        <NavItem name={`Log Out`} icon={<IconLogout color={`var(--iconRight)`} />} />
      </> : <>
        <NavItem name={`Sign In`} link={`/signin`} icon={<IconLogin color={`var(--iconRight)`} />} />
        <NavItem name={`Sign Up`} link={`/signup`} icon={<PersonAddIcon style={{ color: `var(--iconRight)` }} />} />
      </>}
    </ul>
  )
}