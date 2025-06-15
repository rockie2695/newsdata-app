import { Switch } from "react-native";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
export default function RowSwitch() {
  const [isRow, setIsRow] = useState(false);
  const toggleSwitch = () => setIsRow((previousState) => !previousState);
  return (
    <>
      <MaterialIcons
        name="table-rows"
        size={16}
        color="black"
        onPress={() => setIsRow(false)}
      />
      <Switch
        className="mx-2"
        trackColor={{ false: "#93c5fd", true: "#86efac" }}
        thumbColor={isRow ? "#22c55e" : "#3b82f6"}
        ios_backgroundColor="#93c5fd"
        onValueChange={toggleSwitch}
        value={isRow}
      />
      <MaterialIcons
        name="list"
        size={24}
        color="black"
        onPress={() => setIsRow(true)}
      />
    </>
  );
}
