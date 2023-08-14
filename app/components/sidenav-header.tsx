import Link from "next/link";

export default function SideNavHeader() {
  return (
    <div className="w-fit rounded-full border bg-slate-800 p-2 text-center text-[24px] text-white">
      <Link href={"/"}>SOFTWARE</Link>
    </div>
  );
}
