export type NavItemProps = {
  link?: string;
  name?: string;
  fontSize?: number | string;
  // hoverFontSize?: number | string;
}

export default function NavItem({
  link = `#`,
  name = `Home`,
  fontSize = 16,
  // hoverFontSize = (fontSize as any) * 1.25,
}: NavItemProps) {
  return (
    <li>
      <a href={link} style={{ fontSize }}>
        {name}
      </a>
    </li>
  )
}