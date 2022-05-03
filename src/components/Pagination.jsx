import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { usePagination, DOTS } from "./usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="flex  mb-5  w-full justify-center lg:justify-end lg:pr-10">
      <li
        className={`${
          currentPage === 1 ? "pointer-events-none" : null
        }  px-[12px] h-[32px] text-center text-lightGrey flex items-center  cursor-pointer hover:border-b-2 hover:border-b-softGrey`}
        onClick={onPrevious}
      >
        <div>
          <IoIosArrowBack />
        </div>
      </li>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <li key={i}  className="bg-transparent cursor-default">&#8230;</li>;
        }

        return (
          <li
            key={i}
            className={`${
              pageNumber === currentPage
                ? "border-b-2 border-b-selectedGrey"
                : null
            }  px-[12px] h-[32px] text-center text-lightGrey flex items-center  cursor-pointer hover:border-b-2  hover:border-b-2 hover:border-b-softGrey`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${
          currentPage === lastPage ? "pointer-events-none" : ""
        }  px-[12px] h-[32px] text-center text-lightGrey flex items-center  cursor-pointer  hover:border-b-2 hover:border-b-softGrey`}
        onClick={onNext}
      >
        <div>
          <IoIosArrowForward />
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
