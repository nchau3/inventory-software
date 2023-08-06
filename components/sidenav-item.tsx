interface sideNavProps {
    name: string;
    link: string;
}

export default function SideNavItem(props: sideNavProps) {
    return (
        <li className="w-full text-[30px] pt-1 pl-3">{props.name.toUpperCase()}</li>
    )
}