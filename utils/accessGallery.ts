import * as ImagePicker from "expo-image-picker";
import { PRESIGNED_URL_SERVER } from "@env";
import mime from "mime";

export interface ImageUploadResultT {
  isSuccess: boolean;
  reason?: string;
  fileFullName?: string;
}

export const openGallery = async (): Promise<ImagePicker.ImagePickerResult> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 2],
    quality: 1,
  });

  return result;
};

export const uploadImage = async (storeId: string, imageInfo: ImagePicker.ImagePickerAsset): Promise<boolean> => {
  try {
    const fileName = imageInfo.uri.split("/").pop();
    const fileExtension = fileName?.split(".").pop();
    const fileFullName = `eollugage-store/${storeId}.${fileExtension}`;

    const presignedURL = await getPresignedUrl(fileFullName);
    const isUploadS3Success = await uploadImageOnS3(imageInfo, presignedURL, fileFullName);

    if (isUploadS3Success) return true;
    else return true;
  } catch (error) {
    return false;
  }
};

const getPresignedUrl = async (fileFullName: string) => {
  try {
    const response = await fetch(`${PRESIGNED_URL_SERVER}?name=${fileFullName}&method=put`, { method: "GET" });
    const data = await response.json();
    return data.presigned_url;
  } catch (error) {
    console.log("get presigned url error:", error);
  }
};

const uploadImageOnS3 = async (image: ImagePicker.ImagePickerAsset, presignedURL: string, fileFullName: string) => {
  try {
    const imageObject = await fetch(image.uri);
    const imageBlob = await imageObject.blob();
    const response = await fetch(presignedURL, {
      method: "PUT",
      body: imageBlob,
      headers: {
        "Content-Type": mime.getType(fileFullName) || "image",
      },
    });

    return true;
  } catch (error) {
    console.log("upload image to s3 error", error);
    return false;
  }
};
