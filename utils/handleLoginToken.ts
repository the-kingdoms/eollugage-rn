import * as SecureStore from "expo-secure-store";

async function setLoginToken(value: string) {
  await SecureStore.setItemAsync("access_token", value);
}

async function getLoginToken(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

async function deleteLoginToken(key: string) {
  await SecureStore.deleteItemAsync("access_token");
}

export { setLoginToken, getLoginToken, deleteLoginToken };
