import { Platform } from "react-native";
import { checkVersion } from "react-native-check-version";

export async function getAppVersion() {
  try {
    const { needsUpdate, url } = await checkVersion({ bundleId: "com.eolluga.eollugage", country: "kr" });
    return { isSuccess: true, needsUpdate, url };
  } catch (error) {
    return { isSuccess: false, needsUpdate: false, url: "" };
  }
}
