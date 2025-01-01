import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBoard, reset } from "../redux/boards/board.slice";
import Spinner from "../components/Spinner";

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { selectedBoard, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getBoard(boardId));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, boardId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center text-red-600">
        <p>Error loading board: {message}</p>
      </div>
    );
  }

  if (!selectedBoard?.data?.title) {
    return (
      <div className="w-full flex justify-center text-gray-500">
        <p>No board selected or data unavailable.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{selectedBoard?.data?.title}</h1>
      {/* Add more details about the board here */}
    </div>
  );
};

export default Board;
