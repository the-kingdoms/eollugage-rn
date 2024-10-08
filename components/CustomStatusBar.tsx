import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { atom, useAtom } from "jotai";
import { statusBarStyleAtom } from "datas/style";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

function CustomStatusBar() {
  const [statusBarStyle] = useAtom(statusBarStyleAtom);

  return (
    <View style={[styles.statusBar, { backgroundColor: statusBarStyle.backgroundColor }]}>
      <SafeAreaView>
        <StatusBar barStyle={statusBarStyle.barStyle} backgroundColor={statusBarStyle.backgroundColor} translucent />
      </SafeAreaView>
    </View>
  );
}

export { statusBarStyleAtom };
export default CustomStatusBar;
