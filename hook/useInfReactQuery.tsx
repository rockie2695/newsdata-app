import { useInfiniteQuery } from "@tanstack/react-query";

export const useFetchInfReactQuery = (
  queryKey: string[],
  queryFn: ({ pageParam }: { pageParam: any }) => Promise<any>
) => {
  //   const { isPending, error, data } = useQuery({
  //     queryKey: queryKey,
  //     queryFn: () => fetch(queryFnUrl).then((res) => res.json()),
  //   });

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
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      console.log("getNextPageParam", lastPage, allPages, lastPageParam);
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      console.log("getPreviousPageParam", firstPage, allPages, firstPageParam);
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
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
