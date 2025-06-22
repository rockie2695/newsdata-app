import { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = <T,>(
  queryKey: string[],
  queryFnUrl: () => Promise<T>,
  enabled = true
) => {
  const { isPending, error, data } = useQuery<T>({
    queryKey: queryKey,
    queryFn: queryFnUrl,
    enabled,
  });

  return { isPending, error, data };
};
