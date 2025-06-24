import * as z from "zod/v4";

export function slides(category: string, limit: number) {
  const schema = z.object({
    category: z.enum([
      "home",
      "top",
      "entertainment",
      "business",
      "technology",
      "sports",
    ]),
    limit: z.number().min(1).max(10),
  });

  const result = schema.safeParse({
    category,
    limit,
  });

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { category: categoryStr, limit: limitNum } = result.data;
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    categoryStr +
    "/slide?limit=" +
    limitNum
  );
}

export function news(
  category: string,
  limit: number,
  lastId?: number,
  dateTime?: string
) {
  const schema = z.object({
    category: z.enum([
      "top",
      "entertainment",
      "business",
      "technology",
      "sports",
    ]),
    limit: z.number().min(1).max(10),
    lastId: z.number().optional(),
    dateTime: z.string().optional(),
  });

  const result = schema.safeParse({
    category,
    limit,
    lastId,
    dateTime,
  });

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const {
    category: categoryStr,
    limit: limitNum,
    lastId: lastIdNum,
    dateTime: dateTimeStr,
  } = result.data;
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    categoryStr +
    "?limit=" +
    limitNum +
    (lastIdNum ? "&lastId=" + lastIdNum : "") +
    (dateTimeStr ? "&dateTime=" + dateTimeStr : "")
  );
}

export function article(category: string, id: string) {
  const schema = z.object({
    category: z.enum([
      "top",
      "entertainment",
      "business",
      "technology",
      "sports",
    ]),
    id: z.string(),
  });

  const result = schema.safeParse({
    category,
    id,
  });

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { category: categoryStr, id: idStr } = result.data;
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/" +
    categoryStr +
    "/" +
    idStr
  );
}

export function search(
  search: string,
  limit: number,
  lastId?: number,
  dateTime?: string
) {
  const schema = z.object({
    search: z.string(),
    limit: z.number().min(1).max(10),
    lastId: z.number().optional(),
    dateTime: z.string().optional(),
  });

  const result = schema.safeParse({
    search,
    limit,
    lastId,
    dateTime,
  });

  if (!result.success) {
    throw new Error(result.error.message);
  }

  const {
    search: searchStr,
    limit: limitNum,
    lastId: lastIdNum,
    dateTime: dateTimeStr,
  } = result.data;
  return (
    (process.env.EXPO_PUBLIC_API_LINK || "") +
    "/api/newsdata/search?inputValue=" +
    searchStr +
    "&limit=" +
    limitNum +
    "&category=top,entertainment,business,technology,sports" +
    (lastIdNum ? "&lastId=" + lastIdNum : "") +
    (dateTimeStr ? "&dateTime=" + dateTimeStr : "")
  );
}
