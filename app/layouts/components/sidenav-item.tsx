import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  name: string;
  icon?: ReactElement;
}

export default function SideNavItem({ name, icon }: Props) {
  return (
    <li className="flex items-center w-full pt-1 text-xl hover:opacity-70 hover:translate-x-2 transition-all duration-200">
      <div className="mr-2">
        {icon}
      </div>
      <Link href={`/${name}`}>
        <div className="w-full flex items-center">
          {name.toUpperCase()}
        </div>
      </Link>
    </li>
  );
}
