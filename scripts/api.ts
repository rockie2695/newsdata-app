export function slides(category: string, limit: number) {
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    category +
    "/slide?limit=" +
    limit
  );
}

export function news(category: string, limit: number) {
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    category +
    "?limit=" +
    limit
  );
}
