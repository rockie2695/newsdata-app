import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { zhHK } from "date-fns/locale/zh-HK";

export const formatDate = (
  dateString: string,
  language: string,
  enableTimeDiff: boolean = true
) => {
  const date = new Date(dateString);
  const now = new Date();

  // If the date is more than 1 day ago, show full date and time
  if (differenceInDays(now, date) >= 1 || !enableTimeDiff) {
    if (language === "zh-HK") {
      return format(date, "yyyy年MM月dd日 HH:mm");
    }
    return format(date, "MMM d, yyyy h:mm a");
  }

  // Otherwise, show relative time
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: language === "zh-HK" ? zhHK : undefined,
  });
};

export const replaceImageUrlToSingle = (url: string) => {
  return url.includes("https://")
    ? "https://" + url.split("https://").at(-1)
    : url;
};
