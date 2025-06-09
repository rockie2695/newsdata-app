import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchInfReactQuery = (
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: any }) => Promise<any>
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
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      console.log("getNextPageParam", lastPage, pages);
      return lastPage?.nextCursor || 0;
    },
    // getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
    //   console.log("getPreviousPageParam", firstPage, allPages, firstPageParam);
    //   if (firstPageParam <= 1) {
    //     return undefined;
    //   }
    //   return firstPageParam - 1;
    // },
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
