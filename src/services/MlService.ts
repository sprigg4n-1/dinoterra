import axios from "axios";

import { BASE_DEV_API_URL } from "@/config/config";
import { TFeedbackBody, TPrediction } from "@/config/types";

export const classifyImage = async (
  file: string,
): Promise<TPrediction | undefined> => {
  try {
    const response = await axios.post(`${BASE_DEV_API_URL}/ml/classify`, {
      file,
    });

    return response.data.data;
  } catch (error) {
    console.error(`Error with classify image: ${error}`);
  }
};

export const giveFeedback = async (id: string, body: TFeedbackBody) => {
  try {
    const response = await axios.post(
      `${BASE_DEV_API_URL}/ml/classify/${id}/feedback`,
      body,
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error with give feedback: ${error}`);
  }
};
