import { useQuery } from "@tanstack/react-query";

export const useFetchReactQuery = (queryKey: string[], queryFnUrl: string) => {
  const { isPending, error, data } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetch(queryFnUrl).then((res) => res.json()),
  });

  return { isPending, error, data };
};
