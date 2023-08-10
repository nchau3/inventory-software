import SideNavHeader from "./sidenav-header"
import SideNavItem from "./sidenav-item"

export default function SideNav() {
    return (
        <div className="flex flex-col items-center fixed top-0 left-0 h-screen w-60 border-r-2 pt-3">
            <SideNavHeader></SideNavHeader>
            <ul className="flex flex-col w-full pl-4">
                <SideNavItem name="items" />
                <SideNavItem name="locations" />
                <SideNavItem name="reports" />
                <SideNavItem name="settings" />
            </ul>
        </div>
    )
}