import axios from "axios";

import { BASE_URL_DINO } from "@/config/config";

export const addImage = async (
  imagePath: string,
  fileName: string,
  dino_id: number
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/images`, {
      imagePath: imagePath,
      fileName: fileName,
      dino_id: dino_id,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with add image: ${error}`);
  }
};

export const deleteImage = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL_DINO}/images/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting image: ${error}`);
  }
};
