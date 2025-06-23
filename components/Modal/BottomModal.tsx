import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
  title: string;
}>;

export default function BottomModal({
  isVisible,
  children,
  onClose,
  title,
}: Props) {
  const { t } = useTranslation();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
      >
        <Pressable onPress={onClose} className="flex-1" />
        <View
          style={styles.modalContent}
          className="shadow-lg border border-gray-200 flex "
        >
          <View
            style={styles.titleContainer}
            className="border-b border-gray-200"
          >
            <Text
              style={styles.title}
              className="text-cyan-500 text-lg font-[NotoSansHK]"
            >
              {title}
            </Text>
          </View>
          <View className="flex-1 mx-4 mt-2">{children}</View>
          <Pressable
            onPress={onClose}
            className="flex-row mx-4 my-2 py-1 bg-cyan-500 items-center justify-center rounded-lg"
          >
            <MaterialIcons name="close" color="#fff" size={22} />
            <Text className="text-white font-[NotoSansHK]">{t("close")}</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "32%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "20%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
