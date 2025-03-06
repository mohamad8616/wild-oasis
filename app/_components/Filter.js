"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();

  const pathName = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className='border border-blue-800 flex'>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"all"}
      >
        All
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"small"}
      >
        1&mdash;3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"medium"}
      >
        3&mdash;7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter={"large"}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter, children, activeFilter }) {
  return (
    <button
      className={`cursor-pointer px-5 py-2 hover:bg-blue-600 ${
        activeFilter === filter ? "bg-blue-600" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
