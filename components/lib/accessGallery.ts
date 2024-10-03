import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { PRESIGNED_URL_SERVER } from "@env";

export interface ImageUploadResultT {
  isSuccess: boolean;
  reason: string;
}

export const uploadImage = async (): Promise<ImageUploadResultT> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const fileName = "tempImage"; // 추후 변경
    const fileExtension = getFileExtension(result.assets[0].uri);
    const fileFullName = `얼루가게/${fileName}.${fileExtension}`;
    const presignedURL = await getPresignedUrl(fileFullName);
    const isUploadS3Success = await uploadImageOnS3(result.assets[0], presignedURL, fileFullName, fileExtension);

    if (isUploadS3Success) return { isSuccess: true, reason: "" };
    else return { isSuccess: false, reason: "fail" };
  } else return { isSuccess: false, reason: "notSelect" };
};

const getFileExtension = (imageName: string) => {
  const splitedImageName = imageName.split(".");
  return splitedImageName[splitedImageName.length - 1];
};

const getPresignedUrl = async (fileFullName: string) => {
  try {
    const res = await axios.post(PRESIGNED_URL_SERVER, { name: fileFullName });
    return res.data.presigned_url;
  } catch (error) {
    console.log("get presigned url error:", error);
  }
};

const fetchImage = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

const uploadImageOnS3 = async (
  image: ImagePicker.ImagePickerAsset,
  presignedURL: string,
  fileFullName: string,
  fileExtension: string,
) => {
  try {
    const imageBlob = await fetchImage(image.uri);
    const response = await axios.put(presignedURL, imageBlob, {
      headers: {
        "Content-Type": `image/${fileExtension}`,
      },
    });

    return true;
  } catch (error) {
    console.log("upload image to s3 error", error);
    return false;
  }
};
