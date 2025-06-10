import { TnewsSlide } from "@/type/news";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchInfReactQuery = <T,>(
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: any }) => Promise<T>
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
      console.log("getNextPageParam", lastPage, pages);
      return [
        (pages.at(-1) as TnewsSlide).id,
        (pages.at(-1) as TnewsSlide).pubdate,
      ];
    },
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
