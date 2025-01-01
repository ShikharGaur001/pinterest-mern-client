import axios from "axios";

const API_URL = "http://localhost:5000/api/pins/";

const createPin = async (pinData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, pinData, config);
  return response.data;
};

const getPins = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "home", config);
  return response.data;
};

const getPin = async (pinId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + pinId, config);
  return response.data; // Return the entire response data
};

const pinService = { createPin, getPins, getPin };

export default pinService;
