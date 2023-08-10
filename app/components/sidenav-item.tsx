import Link from "next/link";

interface sideNavProps {
    name: string;
}

export default function SideNavItem(props: sideNavProps) {
    return (
        <li className="w-full text-[30px] pt-1">
            <Link href={props.name}>
                {props.name.toUpperCase()}
            </Link>
        </li>
    )
}