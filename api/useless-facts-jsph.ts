import axios from "axios";

export type FactResponse = {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
};

const backendUri = "https://uselessfacts.jsph.pl/api/v2";

const axiosClient = axios.create({
  baseURL: backendUri,
  timeout: 5000,
});

export const getTodaysFact = async () => {
  try {
    const response = await axiosClient.get<FactResponse>("/facts/today");
    return response.data.text;
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the fact";
  }
};

export const getRandomFact = async () => {
  try {
    const response = await axiosClient.get<FactResponse>("/facts/random");
    return response.data.text;
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the fact";
  }
};
