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
      } px-2 py-[2px] rounded-xl w-10 flex items-center justify-center transition-colors`}
    >
      <FontAwesome5
        name={iconName}
        color={focused ? "white" : color}
        size={20}
      />
    </View>
  );
};

export default TabBarIcon;