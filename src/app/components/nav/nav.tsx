import NavItem from "./navitem";
import NavMenu from "./navmenu";
import { uniqueId } from "lodash";
import { Drawer } from "@mui/material";
import { brandName } from "@/app/shared/shared";
import { IconBellRinging, IconLayoutDashboard, IconLogin, IconMailForward, IconQuestionMark, IconSettings, IconUser, IconUserPlus, IconWorld } from "@tabler/icons-react";

export class NavOptions {
  sidebarWidth?: any;
  isSidebarOpen?: any;
  onSidebarClose?: any;
  scrollbarStyles?: any;
  largeScreenSize?: any;
  anchor?: any = `left`;
  isMobileSidebarOpen?: any;
  constructor(data: Partial<NavOptions>) {
    Object.assign(this, data);
  }
}

export const Menu = [
  {
    navlabel: true,
    subheader: `Home`,
  },
  {
    href: `/`,
    id: uniqueId(),
    title: brandName,
    icon: IconQuestionMark,
  },
]

export default function Nav({
  sidebarWidth,
  isSidebarOpen,
  onSidebarClose,
  anchor = `left`,
  scrollbarStyles,
  largeScreenSize,
  isMobileSidebarOpen,
}: NavOptions) {
  return (
    <Drawer 
      anchor={anchor}
      variant={largeScreenSize ? `permanent` : `temporary`}
      onClose={largeScreenSize ? undefined : onSidebarClose}
      open={largeScreenSize ? isSidebarOpen : isMobileSidebarOpen}
      className={`drawer h100 ${largeScreenSize ? `` : `sidebarDrawer mobileMenuDrawer`}`}
      PaperProps={{
        className: largeScreenSize ? `sidebarPaper` : `mobileMenuPaper`,
        sx: {
          ...(largeScreenSize ? {
            width: sidebarWidth - 1,
            boxSizing: `border-box`,
          } : {
            boxShadow: (theme) => theme.shadows[8],
          }),
          ...scrollbarStyles,
        },
      }}
    >
      <NavMenu />
    </Drawer>
  )
}