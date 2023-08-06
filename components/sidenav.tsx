import styles from "./styles/sidenav.module.css";

export default function SideNav() {
    return (
        <ul className={styles.sidenav}>
            <li>Items</li>
            <li>Locations</li>
            <li>Reports</li>
            <li>Settings</li>
        </ul>
    )
}