import Link from "next/link";

interface sideNavProps {
  name: string;
}

export default function SideNavItem(props: sideNavProps) {
  return (
    <li className="w-full pt-1 text-[30px] hover:opacity-60">
      <Link href={`/${props.name}`}>{props.name.toUpperCase()}</Link>
    </li>
  );
}
