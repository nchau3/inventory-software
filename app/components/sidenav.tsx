import SideNavItem from "./sidenav-item"

export default function SideNav() {
    return (
        <ul className="fixed top-0 left-0 flex flex-col w-60 h-screen border-r-2">
            <SideNavItem name="items" />
            <SideNavItem name="locations" />
            <SideNavItem name="reports" />
            <SideNavItem name="settings" />
        </ul>
    )
}