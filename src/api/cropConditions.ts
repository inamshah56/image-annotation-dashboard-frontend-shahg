import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";

export const getCropConditions = async (cropname: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/crop-condition?cropname=${cropname}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const addCropConditions = async (data: CropConditions) => {
  try {
    const res = await axios.post(`${baseUrl}/crop-condition`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteCropConditions = async (data: CropConditions) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/crop-condition?cropname=${data.cropname}&condition=${data.condition}`
    );
    return res;
  } catch (error) {
    return error;
  }
};
