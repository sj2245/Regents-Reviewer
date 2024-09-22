import Nav from "../nav/nav";
import { useMediaQuery, Box } from "@mui/material";

type SidebarProps = {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function Sidebar({
  isSidebarOpen,
  onSidebarClose,
  isMobileSidebarOpen,
}: SidebarProps) {

  const sidebarWidth = 200;
  const largeScreenSize = useMediaQuery((theme: any) => theme.breakpoints.up(`lg`));

  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: `7px`,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: `15px`,
      backgroundColor: `var(--darkMain)`,
    },
  };

  const getNav = () => (
    <Nav 
      // sidebarWidth={sidebarWidth} 
      // isSidebarOpen={isSidebarOpen} 
      // onSidebarClose={onSidebarClose} 
      // scrollbarStyles={scrollbarStyles}
      // largeScreenSize={largeScreenSize} 
      // isMobileSidebarOpen={isMobileSidebarOpen} 
      // anchor={largeScreenSize ? `left` : `right`}
    />
  )

  return (
    <aside className={`sidebar`}>
      {largeScreenSize ? (
        <Box 
          className={`menuSidebar drawerContainer`} 
          sx={{ width: sidebarWidth, flexShrink: 0 }}
        >
          {getNav()}
        </Box>
      ) : getNav()}
    </aside>
  )
}