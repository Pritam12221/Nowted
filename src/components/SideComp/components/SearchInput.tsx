import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();

  //debouncing for search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        navigate(`/search?search=${encodeURIComponent(search)}`);
      } else {
        const params = new URLSearchParams(searchParams);
        params.delete("search");
        setSearchParams(params);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <input
      autoFocus
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search notes..."
      type="text"
      className="bg-zinc-700 w-full h-10 text-white outline-none px-3 rounded-md placeholder:text-zinc-400 text-sm"
    />
  );
};

export default SearchInput;
