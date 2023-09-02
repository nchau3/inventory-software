import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  name: string;
  icon?: ReactElement;
}

export default function SideNavItem({ name, icon }: Props) {
  return (
    <Link href={`/${name}`}>
      <li className="flex w-full items-center pt-1 text-xl transition-all duration-200 hover:translate-x-3 hover:opacity-70">
        <div className="mr-2">{icon}</div>
        <div className="flex w-full items-center">{name.toUpperCase()}</div>
      </li>
    </Link>
  );
}
