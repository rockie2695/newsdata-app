import { useFetchReactQuery } from "@/hook/useReactQuery";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { article } from "@/scripts/api";
import ParallaxScrollView from "./ParallelScrollView";
import CategoryHFlatList from "../Category/CategoryHFlatList";
import { ArticleResponse } from "@/type/news";
import { formatDate, replaceImageUrlToSingle } from "@/scripts/common";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function Article({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  const {
    isPending,
    error,
    data: articleData,
  } = useFetchReactQuery<ArticleResponse>(["article", category, id], () =>
    fetch(article(category, id)).then((res) => res.json())
  );
  console.log(articleData);
  const screenWidth = useWindowDimensions().width || 300;
  const imageHeight = screenWidth * (9 / 16);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  type articlePOrFigure = {
    type: "p" | "figure";
    content?: string;
    alt?: string;
    src?: string;
    figcaption?: string;
  };

  let articleArray: articlePOrFigure[] = [];
  const dataContent = articleData?.success?.content
    ? articleData?.success?.content
    : articleData?.success?.description || "";
  if (dataContent) {
    //<p>...</p><figure><img src="..." alt="..." ><figcaption>...</figcaption></figure>
    const articlePara = dataContent.split(/<\/\p>|<\/figure>|<figcaption>/);
    articlePara.forEach((para, index) => {
      if (para.includes("<p>")) {
        const insertContent = para.replaceAll("<p>", "");
        if (insertContent !== "") {
          articleArray.push({
            type: "p",
            content: insertContent,
          });
        }
      } else if (para.includes("<figure>")) {
        const subPara = para.split(/alt="|src="/);
        let subParaSrc = subPara[1].replaceAll('" ', "");
        subParaSrc = replaceImageUrlToSingle(subParaSrc);
        articleArray.push({
          type: "figure",
          src: subParaSrc,
          alt: subPara[2].replaceAll('">', ""),
        });
      } else if (para.includes("</figcaption>")) {
        if (articleArray.length > 0 && articleArray.at(-1)?.type) {
          articleArray[articleArray.length - 1].figcaption = para.replaceAll(
            "</figcaption>",
            ""
          );
        }
      } else {
        if (para !== "") {
          articleArray.push({
            type: "p",
            content: para,
          });
        }
      }
    });
  }
  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        parallaxHeaderContent={
          <View className="aspect-video  w-full">
            {isPending ? (
              <View className="w-full h-full bg-gray-300 animate-pulse" />
            ) : null}
            {!isPending && articleData?.success?.image_url ? (
              <Image
                source={{ uri: articleData.success.image_url }}
                className="w-full h-full object-cover"
                progressiveRenderingEnabled={true}
              />
            ) : null}
            {!isPending && !articleData?.success?.image_url ? (
              <>
                <View className="w-full h-full bg-gray-200" />
                <Text className="text-lg font-bold text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  No Image
                </Text>
              </>
            ) : null}
          </View>
        }
        parallaxHeaderHeight={imageHeight}
      >
        <View className="bg-gray-100 pt-2">
          <View className="mx-4">
            {isPending ? (
              <>
                <View className="mt-2 w-full h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-[50%] h-[24px] bg-gray-300 rounded-2xl animate-pulse" />
              </>
            ) : (
              <Text className="text-xl font-bold font-[NotoSansHK]">
                {articleData?.success?.title}
              </Text>
            )}
            {isPending ? (
              <View className="mt-2 w-[33%] h-[20px] bg-gray-300 rounded-2xl animate-pulse" />
            ) : (
              <Text className="text-sm text-gray-500 font-[NotoSansHK]">
                {formatDate(
                  articleData?.success?.pubdate || "",
                  currentLanguage,
                  false
                )}
              </Text>
            )}

            {isPending ? (
              <>
                <View className="mt-2 w-full h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-full h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-[50%] h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-full h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-full h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-[33%] h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
              </>
            ) : null}
            {!isPending && articleArray.length > 0 ? (
              <View className="mt-4 gap-4">
                {articleArray.map((item, index) => (
                  <View key={index}>
                    {item.type === "p" ? (
                      <Text className="text-lg font-[NotoSansHK]">
                        {item.content}
                      </Text>
                    ) : null}
                    {item.type === "figure" ? (
                      <>
                        <Image
                          source={{
                            uri: replaceImageUrlToSingle(item.src || ""),
                          }}
                          className="w-full h-full object-cover"
                          progressiveRenderingEnabled={true}
                        />
                        {item.figcaption ? (
                          <Text className="text-sm font-[NotoSansHK]">
                            {item.figcaption}
                          </Text>
                        ) : null}
                      </>
                    ) : null}
                  </View>
                ))}
              </View>
            ) : null}

            {error && (
              <View className="mt-4 flex flex-col items-center">
                <MaterialIcons name="error" size={24} color="red" />
                <Text className="text-lg text-red-500 font-[NotoSansHK]">
                  {error?.message || "error"}
                </Text>
              </View>
            )}
          </View>

          <View className="py-4 ">
            <View className="border-t border-gray-300 gap-6 pt-4 flex flex-col ">
              {(articleData?.success?.category || []).length > 0 &&
                (articleData?.success?.category || []).map((item: string) => (
                  <CategoryHFlatList key={item} category={item} needBackPage={true}/>
                ))}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
    </View>
  );
}
