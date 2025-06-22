import { useDeferredValue, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default function useDebounceSearch(presetSearch: string) {
  const [search, setSearch] = useState(presetSearch);
  const deferredSearch = useDeferredValue(search);
  const searchParam = useDebounce(deferredSearch, 500);
  return { search, setSearch, deferredSearch, searchParam };
}
