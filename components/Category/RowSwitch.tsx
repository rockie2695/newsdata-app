import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { useNewsStore } from "../../stores/news-store";

export default function RowSwitch() {
  const { isRow, setIsRow } = useNewsStore();
  const toggleSwitch = () =>
    setIsRow((previousState: boolean) => !previousState);

  // Animation value for the thumb
  const thumbPosition = useRef(new Animated.Value(0)).current;

  // Update thumb position when isRow changes
  useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: isRow ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isRow, thumbPosition]);

  const thumbLeft = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 30], // Adjust these values to control thumb travel distance
  });

  return (
    <View className="flex flex-row items-center">
      <MaterialIcons
        name="table-rows"
        size={18}
        color={isRow ? "#9ca3af" : "#1f2937"}
        onPress={() => setIsRow(false)}
      />
      <Pressable
        style={{
          width: 60, // Makes the track longer
          height: 28,
          borderRadius: 15,
          backgroundColor: isRow ? "#86efac" : "#93c5fd",
          marginHorizontal: 8,
          padding: 2,
        }}
        onPress={toggleSwitch}
      >
        <Animated.View
          style={{
            width: 24,
            height: 24,
            borderRadius: 13,
            backgroundColor: isRow ? "#22c55e" : "#3b82f6",
            transform: [{ translateX: thumbLeft }],
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.5,
          }}
        />
      </Pressable>
      <MaterialIcons
        name="list"
        size={28}
        color={isRow ? "#1f2937" : "#9ca3af"}
        onPress={() => setIsRow(true)}
      />
    </View>
  );
}
