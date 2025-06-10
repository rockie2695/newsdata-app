import { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = <T,>(
  queryKey: string[],
  queryFnUrl: () => Promise<T>
) => {
  const { isPending, error, data } = useQuery<T>({
    queryKey: queryKey,
    queryFn: queryFnUrl,
  });

  return { isPending, error, data };
};
