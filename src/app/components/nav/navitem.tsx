import { Button } from '@mui/material';

export type NavItemProps = {
  icon?: any;
  link?: string;
  name?: string;
  fontSize?: number | string;
}

export default function NavItem({
  icon,
  link,
  fontSize = 16,
  name = `Home`,
}: NavItemProps) {
  return (
   link ? (
     <li>
      <Button className={`navMenuButton`}>
        <a href={link} className={`navItem flex gap5 alignCenter borderRadius ${link ? `` : `label`}`} style={{ fontSize, padding: `15px 15px 15px 7px` }}>
          {icon}
          <span className={`labelText`}>{name}</span>
        </a>
      </Button>
      </li >
   ) : <>
      <li>
        <span style={{ fontSize, padding: `15px 15px 15px 7px` }} className={`labelText`}>{name}</span>
      </li >
   </>
  )
}