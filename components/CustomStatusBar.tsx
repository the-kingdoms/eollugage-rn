import { View } from "react-native";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { statusbarAtom } from "datas/atoms";

function CustomStatusBar() {
  const [statusbarStyle] = useAtom(statusbarAtom);
  const { top } = useSafeAreaInsets();

  return (
    <>
      <View style={{ height: top, backgroundColor: statusbarStyle.color }} />
      <StatusBar style={statusbarStyle.style} />
    </>
  );
}

export default CustomStatusBar;
