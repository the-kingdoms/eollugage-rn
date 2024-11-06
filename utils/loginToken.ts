import * as SecureStore from "expo-secure-store";

export interface LoginTokenResult {
  isSuccess: boolean;
  token?: string;
}

export const getLoginTokenFromStore = async (key: string): Promise<LoginTokenResult> => {
  const result = await SecureStore.getItemAsync(key);
  if (result) return { isSuccess: true, token: result };
  return { isSuccess: false };
};

export const setLoginTokenFromStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const deleteLoginTokenFromStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};
