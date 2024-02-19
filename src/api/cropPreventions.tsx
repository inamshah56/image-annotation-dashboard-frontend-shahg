import { baseUrl } from "@/utils/baseUrl";
import axios from "axios";

export const getCropPreventions = async (condition: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/crop-prevention?condition=${condition}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const addCropPreventions = async (data: CropPreventions) => {
  try {
    const res = await axios.post(`${baseUrl}/crop-prevention`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteCropPreventions = async (id: number) => {
  try {
    const res = await axios.delete(`${baseUrl}/crop-prevention?id=${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
