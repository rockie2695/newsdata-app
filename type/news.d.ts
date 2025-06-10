export type NewsResponse = {
  success?: TnewsSlide[];
  error?: string;
};

export type TnewsSlide = {
  id: number;
  category: string[];
  country: string[];
  creator: string[];
  description: string;
  image_url: string | null;
  language: string;
  link: string;
  pubdate: string;
  source_id: string;
  source_priority: number;
  title: string;
  video_url: string | null;
  insert_time: string;
};

export type TnewsData = TnewsSlide & {
  content: string;
  keywords: string[];
};
