import { atom } from "jotai";
import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

interface StatusBarStyle {
  barStyle: "dark-content" | "light-content";
  backgroundColor: string;
}
const statusBarStyleAtom = atom<StatusBarStyle>({
  barStyle: "light-content",
  backgroundColor: "black",
});

interface WebviewStyle {
  container: {
    flex: number;
    alignItems: "center";
    justifyContent: "space-between";
    backgroundColor: string;
    color: string;
  };
  webview: {
    backgroundColor: string;
    flex: number;
    height: number;
    width: number;
  };
}
const webviewStyleAtom = atom<WebviewStyle>({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    color: "black",
  },
  webview: {
    backgroundColor: "black",
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
  },
});

// writable derived atom
const setThemeAtom = atom(null, (get, set, update: "light" | "dark") => {
  if (update === "dark") {
    set(statusBarStyleAtom, {
      barStyle: "light-content",
      backgroundColor: "black",
    });
    set(webviewStyleAtom, {
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        color: "black",
      },
      webview: {
        backgroundColor: "black",
        flex: 1,
        height: deviceHeight,
        width: deviceWidth,
      },
    });
  } else {
    set(statusBarStyleAtom, {
      barStyle: "dark-content",
      backgroundColor: "white",
    });
    set(webviewStyleAtom, {
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        color: "white",
      },
      webview: {
        backgroundColor: "white",
        flex: 1,
        height: deviceHeight,
        width: deviceWidth,
      },
    });
  }
});

export { statusBarStyleAtom, webviewStyleAtom, setThemeAtom };
