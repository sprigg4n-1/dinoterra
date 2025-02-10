import { BASE_URL_DINO } from "@/config/config";
import axios from "axios";

export const addLocation = async (
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
