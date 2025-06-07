// // components/ProjectFilter.tsx
// "use client";

type ProjectFilterProps = {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function ProjectFilter({
  filters,
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full border text-sm transition
            ${
              activeFilter === filter
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
            }
          `}
        >
          {filter.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
