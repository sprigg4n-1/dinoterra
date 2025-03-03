import { BASE_URL_DINO } from "@/config/config";
import axios from "axios";

export const getFoundLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL_DINO}/locations`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with get locations: ${error}`);
  }
};

export const addFoundLocation = async (
  place: string,
  latitude: string,
  longitude: string,
  dino_id: number
) => {
  try {
    const response = await axios.post(`${BASE_URL_DINO}/locations`, {
      latitude: latitude,
      longitude: longitude,
      place: place,
      dino_id: dino_id,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(`Error with add location: ${error}`);
  }
};

export const deleteFoundLocation = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL_DINO}/locations/${id}`);

    return response.data;
  } catch (error) {
    console.error(`Error with deleting found location: ${error}`);
  }
};
