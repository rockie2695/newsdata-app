import { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = (
  queryKey: string[],
  queryFnUrl: () => Promise<any>
) => {
  const { isPending, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: queryFnUrl,
  });

  return { isPending, error, data };
};
