import React, { useState } from "react";
import { ChevronDown, X, Filter } from "lucide-react";
import FilterButtons from "../FilterButtons/FilterButtons";

const SortFilterBar = ({
  activeSort,
  setActiveSort,
  selectedFilters,
  setSelectedFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = ["all", "Most Recent", "Most Likes", "Most Comments"];

  const filterOptions = [
    { id: "food", label: "Food" },
    { id: "exercise", label: "Exercise" },
    { id: "workout", label: "Workout" },
    { id: "meal", label: "Meal" },
  ];

  const handleSortClick = (sort) => {
    setActiveSort(sort);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const handleClearAll = () => {
    setActiveSort("all");
    setSelectedFilters([]);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <FilterButtons
          filters={sortOptions}
          activeFilter={activeSort}
          onFilterChange={setActiveSort}
        />
        <div className="relative">
          <div className="flex gap-2">
            <button
              onClick={toggleFilter}
              className={`py-2.5 px-2 transition-all duration-200 text-sm font-medium flex items-center rounded-xl gap-2 border-2 border-primary-light dark:border-primary-dark shadow-lg ${
                isFilterOpen
                  ? "bg-primary-light dark:bg-primary-dark text-white"
                  : "bg-transparent  hover:bg-primary-light dark:hover:bg-primary-dark text-primary-light dark:text-primary-dark hover:text-white dark:hover:text-white duration-300"
              }`}
            >
              <Filter className="w-4 h-4" />
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {(selectedFilters.length > 0 || activeSort !== "all") && (
              <button
                onClick={handleClearAll}
                className="p-2 rounded-full transition-all duration-200 text-sm font-medium bg-transparent border-2 border-compleprimary-light dark:border-compleprimary-dark shadow-lg hover:bg-compleprimary-light dark:hover:bg-compleprimary-dark text-compleprimary-light dark:text-compleprimary-dark hover:text-white dark:hover:text-white duration-300 cursor-pointer active:scale-[0.98]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-10 border border-gray-100 min-w-[200px] z-50">
              <div className="p-4 space-y-3">
                {filterOptions.map((filter) => (
                  <label
                    key={filter.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter.id)}
                      onChange={() => handleFilterChange(filter.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-light dark:text-primary-dark focus:ring-primary-light dark:focus:ring-primary-dark"
                    />
                    <span className="text-sm text-primary-light dark:text-primary-dark">
                      {filter.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortFilterBar;
