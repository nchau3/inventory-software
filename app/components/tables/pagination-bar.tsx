"use client";

interface paginationBarProps {
  currentPage: number;
  lastPage: boolean;
  recordsDisplayed: number;
  totalRecords: number;
  isLoading: boolean;
  onClick: Function;
}

function PaginationButton({
  direction,
  onClick,
  hidden,
  disabled,
}: {
  direction: "next" | "prev";
  onClick: Function;
  hidden: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`h-6 w-6 border border-slate-300 bg-white enabled:hover:bg-slate-200 ${
        hidden ? "invisible" : ""
      }`}
      onClick={() => onClick(direction)}
      disabled={disabled}
    >
      {direction === "next" ? ">" : "<"}
    </button>
  );
}

export default function PaginationBar({ currentPage, lastPage, recordsDisplayed, totalRecords, isLoading, onClick }: paginationBarProps) {
  const changePage = (direction: "next" | "prev") => {
    const increment = direction === "next" ? 1 : -1;
    onClick(currentPage + increment);
  }

  //take is hard-coded at 50
  const start = currentPage === 1 ? 1 : ((currentPage - 1) * 50) + 1;
  const end = recordsDisplayed < 50 ? start -1 + recordsDisplayed : currentPage * 50;

  return (
    <span className="flex w-full items-center justify-end">
      <div className="flex w-[6rem] items-center justify-between mr-2">
        <PaginationButton
          direction={"prev"}
          onClick={changePage}
          hidden={currentPage === 1}
          disabled={isLoading}
        ></PaginationButton>
        <div className="h-8 w-8 bg-slate-600 p-1 text-white">
          <div className="flex items-center justify-center">{currentPage}</div>
        </div>
        <PaginationButton
          direction={"next"}
          onClick={changePage}
          hidden={lastPage}
          disabled={isLoading}
        ></PaginationButton>
      </div>
      <div className="text-sm min-w-[8rem] text-end">{`${start} - ${end} of ${totalRecords}`}</div>
    </span>
  );
}