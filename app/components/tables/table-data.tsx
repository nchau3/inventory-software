import { ReactNode } from "react";

interface Props {
  value: string | ReactNode;
  twClasses?: string;
}

export default function TableData({ value, twClasses }: Props) {
  return <td className={`text-start p-1 overflow-hidden text-ellipsis ${twClasses}`}>{value}</td>;
}
