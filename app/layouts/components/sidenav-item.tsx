import Link from "next/link";

interface sideNavProps {
  name: string;
}

export default function SideNavItem(props: sideNavProps) {
  return (
    <li className="w-full pt-1 text-[30px] hover:bg-slate-600 hover:text-white">
      <Link href={`/${props.name}`}>{props.name.toUpperCase()}</Link>
    </li>
  );
}
