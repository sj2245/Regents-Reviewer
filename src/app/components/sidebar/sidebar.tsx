import Nav from '../nav/nav';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export class SidebarProps {
  style: any;
  expanded?: boolean = true;
}

export const sidebarWidth = 250;

export default function Sidebar({
  style,
  expanded = true,
}: SidebarProps) {

  let [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <aside className={`sidebar ${isExpanded ? `expanded` : `collapsed`} flex column flexCenter gap5 w100`} style={{
      ...style,
      margin: 0,
      position: `relative`,
      justifyContent: `center`,
    }}>
      <div className={`sidebarContent flex column flexCenter gap5 w100`}
        style={{
          height: `97%`,
          position: `absolute`,
          justifyContent: `space-between`,
        }}
      >
        <Nav />
        <div className="sideBarFooter">
          <IconButton size={`small`} style={{ color: `white` }} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
      </div>
    </aside>
  )
}