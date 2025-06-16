export function slides(category: string, limit: number) {
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    category +
    "/slide?limit=" +
    limit
  );
}

export function news(
  category: string,
  limit: number,
  lastId?: number,
  dateTime?: string
) {
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    category +
    "?limit=" +
    limit +
    (lastId ? "&lastId=" + lastId : "") +
    (dateTime ? "&dateTime=" + dateTime : "")
  );
}

export function article(category: string, id: string) {
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    category +
    "/" +
    id
  );
}
