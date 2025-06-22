import { TnewsSlide } from "@/type/news";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchInfReactQuery = <T,>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: any }) => Promise<T>,
  enabled = true
) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    initialPageParam: [0, ""],
    getNextPageParam: (lastPage, pages) => {
      return [
        (lastPage as TnewsSlide[]).at(-1)?.id,
        (lastPage as TnewsSlide[]).at(-1)?.pubdate,
      ];
    },
    enabled,
  });

  return {
    isPending,
    error,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  };
};
