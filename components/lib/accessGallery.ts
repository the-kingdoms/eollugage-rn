import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { PRESIGNED_URL_SERVER } from "@env";
import mime from "mime";

export interface ImageUploadResultT {
  isSuccess: boolean;
  reason?: string;
  fileFullName?: string;
}

export const uploadImage = async (storeId: string): Promise<ImageUploadResultT> => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      if (image.base64 === undefined) return { isSuccess: false, reason: "base64 undifined" };

      const fileName = image.uri.split("/").pop();
      const fileExtension = fileName?.split(".").pop();
      const fileFullName = `eollugage-store/${storeId}.${fileExtension}`;
      const presignedURL = await getPresignedUrl(fileFullName);
      const isUploadS3Success = await uploadImageOnS3(result.assets[0], presignedURL, fileFullName);

      if (isUploadS3Success) return { isSuccess: true, fileFullName };
      else return { isSuccess: false, reason: "upload-fail" };
    } else return { isSuccess: false, reason: "not-select" };
  } catch (error) {
    return { isSuccess: false, reason: "presigned-url-error" };
  }
};

const getPresignedUrl = async (fileFullName: string) => {
  try {
    const res = await axios.post(PRESIGNED_URL_SERVER, { name: fileFullName, method: "put" });
    return res.data.presigned_url;
  } catch (error) {
    console.log("get presigned url error:", error);
  }
};

const uploadImageOnS3 = async (image: ImagePicker.ImagePickerAsset, presignedURL: string, fileFullName: string) => {
  try {
    const Buffer = require("buffer").Buffer;
    const buffer = Buffer.from(image.base64 ?? "", "base64");
    const response = await axios.put(presignedURL, buffer, {
      headers: {
        "Content-Type": mime.getType(fileFullName),
        "Content-Encoding": "base64",
      },
    });

    return true;
  } catch (error) {
    console.log("upload image to s3 error", error);
    return false;
  }
};
