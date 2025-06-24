import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
        animationType="fade"
        visible={isVisible}
        onRequestClose={onClose}
        backdropColor="rgba(0, 0, 0, 0.1)"
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
            <Text className="text-cyan-500 text-xl font-[NotoSansHK] font-bold">
              {title}
            </Text>
          </View>
          <View className="flex-1 mx-4">{children}</View>
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
});
