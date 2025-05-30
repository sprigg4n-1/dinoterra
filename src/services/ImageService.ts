import axios from "axios";

import { BASE_DEV_API_URL } from "@/config/config";

export const addImage = async (file: string, dino_id: string) => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/dinos/upload-image`,
      {
        file: file,
        dino: dino_id,
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with add image: ${error}`);
  }
};

export const deleteImage = async (id: string) => {
  try {
    const response = await axios.delete(
      `${BASE_DEV_API_URL}/dinos/images/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(`Error with deleting image: ${error}`);
  }
};

export const getImagesByDinoId = async (id: string) => {
  try {
    const response = await axios.delete(
      `${BASE_DEV_API_URL}/dinos/${id}/images`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with deleting image: ${error}`);
  }
};
