import React from "react";

const FilterButtons = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-lg capitalize text-sm ${
            activeFilter === filter
              ? "bg-primary-light dark:bg-primary-dark text-white"
              : "rounded-xl bg-transparent flex items-center justify-center border-2  border-primary-light dark:border-primary-dark shadow-lg hover:bg-primary-light dark:hover:bg-primary-dark text-primary-light dark:text-primary-dark hover:text-white dark:hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
          }`}
        >
          {filter.replace("-", " ")}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
