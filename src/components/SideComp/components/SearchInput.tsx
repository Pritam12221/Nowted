import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialValue);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // debounce updating URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      setSearchParams(params);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search notes..."
      type="text"
      className="bg-white w-full h-10 text-black outline-none px-2 rounded-md"
    />
  );
};

export default SearchInput;
