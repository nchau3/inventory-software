'use client'

interface Props {
    currentPage: number;
    clickHandler: Function;
    lastPage: boolean;
}

function PaginationButton({ direction, onClick, hidden }: {direction: "next" | "prev", onClick: Function, hidden: boolean }) {
    return (
        <button className={`w-6 h-6 hover:bg-slate-300 bg-white border border-slate-300 ${hidden ? "invisible" : ""}`} onClick={() => onClick(direction)}>{direction === "next" ? ">" : "<"}</button>
    )
}

export default function PaginationBar({ currentPage, clickHandler, lastPage }: Props) {
    return (
        <span className="flex justify-around items-center w-full">
            <div className="w-[6rem] flex justify-between items-center">
                <PaginationButton direction={"prev"} onClick={clickHandler} hidden={currentPage === 1}></PaginationButton>
                <div className="w-8 h-8 bg-slate-600 flex justify-center items-center text-white">{currentPage}</div>
                <PaginationButton direction={"next"} onClick={clickHandler} hidden={lastPage}></PaginationButton>
            </div>
        </span>
    )
}