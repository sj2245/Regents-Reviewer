import NavItem from "./navitem";
import { brandName } from "@/app/shared/shared";
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconMailForward, IconQuestionMark, IconSettings, IconUser, IconUserPlus, IconWorld } from "@tabler/icons-react";

export default function NavMenu() {
  return (
    <ul className={`navMenu flex column gap5 p0 pl15`}>
      <NavItem name={`Home`} />
      <NavItem name={brandName} link={`/`} icon={<IconQuestionMark color={`var(--iconRight)`} />} />
      <NavItem name={`Questions Database`} link={`/`} icon={<IconLayoutDashboard color={`var(--iconRight)`} />} />
    </ul>
  )
}