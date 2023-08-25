import Link from "next/link";

export default function LogoHeader() {
  return (
    <div className="w-fit rounded-full border bg-slate-800 p-2 text-center text-white hover:opacity-90">
      <Link href={"/"}>SOFTWARE</Link>
    </div>
  );
}
