import { brandName } from "@/app/shared/shared";

export default function NavMenu() {
  return (
    <nav className={`sidebarContainer spaceBetween h100 gap15 flex column`}>
      {brandName}
    </nav>
  )
}