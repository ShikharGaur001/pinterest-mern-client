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
    <div className="w-screen pt-16 flex flex-col justify-center">
      <div className="w-full h-12 flex px-20 justify-between items-center">
        <span className="text-4xl font-bold">{selectedBoard?.data?.title}</span>

        <div className="h-full flex items-center justify-center gap-2">
          <div className="flex items-center justify-center h-full w-12 hover:bg-zinc-200 rounded-full p-2">
            <img
              src="/Inbox-Tray-2--Streamline-Core.svg"
              className="h-2/3 w-2/3"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center h-full w-12 hover:bg-zinc-200 rounded-full p-2">
            <img src="/ellypsis.svg" className="h-full w-full" alt="" />
          </div>
        </div>
      </div>

      <span className="text-zinc-500 px-20 mt-4">
        {selectedBoard?.data?.pins?.length} Pins
      </span>

      <div className="w-full px-20 mt-4 h-10 flex items-center">
        <div className="collaborators flex items-center justify-between h-full relative w-20">
          {/* User div */}
          <div className="h-full w-10 border-2 border-white bg-red-200 rounded-full z-[1]"></div>

          {/* Collaborators divs */}
          {selectedBoard?.data?.collaborators.map((collaborator, index) => (
            <div
              key={index}
              className={`h-full w-10 border-2 border-white bg-blue-200 rounded-full z-[${
                index + 2
              }] absolute ml-[${(index + 1) * 1.8}rem]`}
            ></div>
          ))}

          {/* Last div with image */}
          <div
            className={`h-full w-10 border-2 border-white bg-zinc-200 rounded-full hover:bg-zinc-300 z-[${
              selectedBoard?.data?.collaborators.length + 2
            }] absolute ml-[${
              (selectedBoard?.data?.collaborators.length + 1) * 1.8
            }rem] p-2`}
          >
            <img
              src="/User-Add-Plus--Streamline-Core.svg"
              className="w-full h-full"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
