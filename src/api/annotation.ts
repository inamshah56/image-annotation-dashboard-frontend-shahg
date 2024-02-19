import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";

export const getImageProcessingResult = async (imageName: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/image-processing-result?img_name=${imageName}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const submitAnnotation = async (data: ProcessedResult) => {
  try {
    const res = await axios.patch(`${baseUrl}/image-processing-result`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const getImageProcessingHistory = async (farmId: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/image-processing-history?farmId=${farmId}`
    );
    return res;
  } catch (error) {
    return error;
  }
};
