import Link from "next/link";

export default function SideNavHeader() {
    return (
        <div className="w-fit p-2 text-[24px] text-center border rounded-full text-white bg-slate-800">
            <Link href={"/"}>
                SOFTWARE
            </Link>
        </div>
    )
}