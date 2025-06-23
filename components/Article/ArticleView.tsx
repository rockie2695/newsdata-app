import { useFetchReactQuery } from "@/hook/useReactQuery";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  Share,
  ScrollView,
} from "react-native";
import { article } from "@/scripts/api";
import ParallaxScrollView from "./ParallelScrollView";
import CategoryHFlatList from "../Category/CategoryHFlatList";
import { ArticleResponse } from "@/type/news";
import { formatDate, replaceImageUrlToSingle } from "@/scripts/common";
import { useTranslation } from "react-i18next";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RemoteImage from "../RemoteImage/RemoteImage";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState } from "react";
import BottomModal from "../Modal/BottomModal";

const openLink = async (url: string) => {
  // Check if the device can open the URL
  const canOpen = await Linking.canOpenURL(url);

  if (canOpen) {
    // Open the URL in the default browser
    await Linking.openURL(url);
  } else {
    console.error("Cannot open URL:", url);
  }
};

const onShare = async (url: string, message: string) => {
  try {
    const result = await Share.share({
      url,
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    //Alert.alert(error.message);
    console.error(error.message);
  }
};

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screenWidth = useWindowDimensions().width || 300;
  const imageHeight = screenWidth * (9 / 16);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const router = useRouter();

  type articlePOrFigure = {
    type: "p" | "figure";
    content?: string;
    alt?: string;
    src?: string;
    figcaption?: string;
  };

  let articleArray: articlePOrFigure[] = [];
  let dataContent = "";
  if (articleData?.success?.content) {
    dataContent = articleData.success.content;
  } else if (articleData?.success?.description) {
    dataContent = articleData.success.description;
  }
  if (
    articleData?.success?.content &&
    articleData?.success?.description &&
    dataContent === "ONLY AVAILABLE IN PAID PLANS"
  ) {
    dataContent =
      "<p>" +
      articleData?.success?.description +
      "</p><p>ONLY AVAILABLE IN PAID PLANS</p>";
  }

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
  const pressOnOriginalLink = () => {
    openLink(articleData?.success?.link || "");
  };
  const pressOnShare = () => {
    const link =
      "https://newsdata-two.vercel.app/" +
      (i18n.language === "en" ? "en" : "zh-hk") +
      "/category/" +
      articleData?.success?.category[0] +
      "/article/" +
      articleData?.success?.id +
      "/";
    onShare(
      link,
      articleData?.success?.title + " " + t("on") + " NewsData:" + " " + link
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => router.back()}
        className="absolute top-4 left-4 z-50 shadow-lg bg-white rounded-full p-2"
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>
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
                <View className="mt-2 w-full h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
                <View className="mt-2 w-[50%] h-[28px] bg-gray-300 rounded-2xl animate-pulse" />
              </>
            ) : (
              <Text className="text-xl font-bold font-[NotoSansHK]" selectable>
                {articleData?.success?.title}
              </Text>
            )}
            <View className="flex-row items-center gap-2">
              <View className="grow">
                {isPending ? (
                  <View className="mt-2 w-[33%] h-[20px] bg-gray-300 rounded-2xl animate-pulse" />
                ) : (
                  <Text
                    className="text-sm text-gray-500 font-[NotoSansHK]"
                    selectable
                  >
                    {articleData?.success?.source_id}
                    {articleData?.success?.creator &&
                    articleData.success.creator.length > 0 &&
                    articleData.success.creator[0] !== "auto_generator"
                      ? " | " +
                        articleData?.success?.creator
                          .map((creator) => creator)
                          .join(" ")
                      : ""}
                  </Text>
                )}
                {isPending ? (
                  <View className="mt-2 w-[33%] h-[20px] bg-gray-300 rounded-2xl animate-pulse" />
                ) : (
                  <Text
                    className="text-sm text-gray-500 font-[NotoSansHK]"
                    selectable
                  >
                    {formatDate(
                      articleData?.success?.pubdate || "",
                      currentLanguage,
                      false
                    )}
                  </Text>
                )}
              </View>
              <View className="">
                <Pressable onPress={() => setIsModalVisible(true)}>
                  <MaterialIcons name="more-vert" size={24} color="#6b7280" />
                </Pressable>
              </View>
            </View>

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
                      <Text className="text-lg font-[NotoSansHK]" selectable>
                        {item.content}
                      </Text>
                    ) : null}
                    {item.type === "figure" ? (
                      <>
                        <RemoteImage
                          uri={replaceImageUrlToSingle(item.src || "")}
                          progressiveRenderingEnabled={true}
                          maxWidth={screenWidth - 2 * 16}
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

            {isPending
              ? null
              : (articleData?.success?.keywords || []).length > 0 && (
                  <View className="mt-4 gap-2 flex flex-row">
                    {articleData?.success?.keywords?.map((keyword, index) => (
                      <Text
                        key={index}
                        className="text-sm font-[NotoSansHK]"
                        selectable
                      >
                        #{keyword}
                      </Text>
                    ))}
                  </View>
                )}

            {isPending ? (
              <View className="mt-4 gap-4 flex flex-row">
                <View className="flex-1 flex flex-row gap-2 items-center justify-center">
                  <FontAwesome5 name="link" size={20} color="#06b6d4" />
                  <Text className="text-cyan-500 text-base">
                    {t("originalLink")}
                  </Text>
                </View>
                <View className="flex-1 flex flex-row gap-2 items-center justify-center">
                  <FontAwesome5 name="share-alt" size={20} color="#06b6d4" />
                  <Text className="text-cyan-500 text-base">{t("share")}</Text>
                </View>
              </View>
            ) : (
              <View className="mt-4 gap-4 flex flex-row">
                <Pressable
                  className="flex-1 flex flex-row gap-2 items-center justify-center"
                  onPress={pressOnOriginalLink}
                >
                  <FontAwesome5 name="link" size={20} color="#06b6d4" />
                  <Text className="text-cyan-500 text-base">
                    {t("originalLink")}
                  </Text>
                </Pressable>
                <Pressable
                  className="flex-1 flex flex-row gap-2 items-center justify-center"
                  onPress={pressOnShare}
                >
                  <FontAwesome5 name="share-alt" size={20} color="#06b6d4" />
                  <Text className="text-cyan-500 text-base">{t("share")}</Text>
                </Pressable>
              </View>
            )}

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
              {(articleData?.success?.category || [category]).length > 0 &&
                (articleData?.success?.category || [category]).map(
                  (item: string) => (
                    <CategoryHFlatList
                      key={item}
                      category={item}
                      needBackPage={true}
                      refreshing={true}
                    />
                  )
                )}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
      <BottomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={t("action")}
      >
        <ScrollView>
          <View className="flex flex-col gap-2">
            <Pressable
              className="flex flex-row gap-2 items-center justify-center"
              onPress={pressOnOriginalLink}
            >
              <FontAwesome5 name="link" size={20} color="#06b6d4" />
              <Text className="text-cyan-500 text-base">
                {t("originalLink")}
              </Text>
            </Pressable>
            <Pressable
              className="flex flex-row gap-2 items-center justify-center"
              onPress={pressOnShare}
            >
              <FontAwesome5 name="share-alt" size={20} color="#06b6d4" />
              <Text className="text-cyan-500 text-base">{t("share")}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </BottomModal>
    </View>
  );
}
