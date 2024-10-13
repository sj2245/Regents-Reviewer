import Logo from "../logo/logo";
import NavMenu from "./navmenu";


export class NavOptions {
  style?: any;
}

export default function Nav({
  style
}: NavOptions) {
  return (
    <nav className={`sidebarContainer h100 gap15 flex column`} style={style}>
      <Logo />
      <NavMenu />
    </nav>
  )
}