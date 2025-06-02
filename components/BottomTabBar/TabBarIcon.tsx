import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  iconName?: string;
}

const TabBarIcon = ({
  focused,
  color,
  iconName = "newspaper",
}: TabBarIconProps) => {
  return (
    <View
      className={`${
        focused ? "bg-cyan-500" : "bg-transparent"
      } px-2 py-[2px] rounded-2xl w-14 flex items-center justify-center transition-colors`}
    >
      <FontAwesome5
        name={iconName}
        color={focused ? "white" : color}
        size={24}
      />
    </View>
  );
};

export default TabBarIcon;
