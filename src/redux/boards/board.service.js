import axios from "axios";

const API_URL = "http://localhost:5000/api/boards/";

const createBoard = async (boardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, boardData, config);
  return response.data;
};

const getBoard = async (boardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "board/" + boardId, config);
  return response.data; // Return the entire response data
};

const boardService = { createBoard, getBoard };

export default boardService;
