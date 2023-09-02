"use client";

interface Props {
  currentPage: number;
  clickHandler: Function;
  lastPage: boolean;
  isLoading: boolean;
  totalRecords: number;
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
      className={`h-6 w-6 border border-slate-300 bg-white enabled:hover:bg-slate-300 ${
        hidden ? "invisible" : ""
      }`}
      onClick={() => onClick(direction)}
      disabled={disabled}
    >
      {direction === "next" ? ">" : "<"}
    </button>
  );
}

export default function PaginationBar({
  currentPage,
  clickHandler,
  lastPage,
  isLoading,
  totalRecords,
}: Props) {
  console.log(totalRecords);
  return (
    <span className="flex w-full items-center justify-around">
      <div className="flex w-[6rem] items-center justify-between">
        <PaginationButton
          direction={"prev"}
          onClick={clickHandler}
          hidden={currentPage === 1}
          disabled={isLoading}
        ></PaginationButton>
        <div className="h-8 w-8 bg-slate-600 p-1 text-white">
          <div className="flex items-center justify-center">{currentPage}</div>
        </div>
        <PaginationButton
          direction={"next"}
          onClick={clickHandler}
          hidden={lastPage}
          disabled={isLoading}
        ></PaginationButton>
      </div>
    </span>
  );
}
