import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBoard, reset } from "../redux/boards/board.slice";
import Spinner from "../components/Spinner";
import { getCurrentUser } from "../redux/auth/auth.slice";

const Board = () => {
  const [more, setMore] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boardId } = useParams();

  const { user, myProfile } = useSelector((state) => state.auth);
  const { selectedBoard, isLoadingInBoard, isErrorInBoard, messageBoard } =
    useSelector((state) => state.boards);

  const toggleMore = () => {
    setMore((prev) => !prev);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser())
      dispatch(getBoard(boardId));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, boardId]);

  if (isLoadingInBoard) {
    return <Spinner />;
  }

  if (isErrorInBoard) {
    return (
      <div className="w-full flex justify-center text-red-600">
        <p>Error loading board: {messageBoard}</p>
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
    <>
    <button
        onClick={() => navigate(-1)}
        className="absolute h-12 w-12 left-0 ml-6 mt-6 p-3 hover:bg-zinc-100 rounded-full"
      >
        <img
          src="/Arrow-Up-1--Streamline-Core.svg"
          className="h-full w-full -rotate-90"
          alt=""
        />
      </button>
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
          <button
            onClick={toggleMore}
            className={`w-12 h-full active:animate-jump active:animate-ease-out p-2 rounded-full ${
              more ? "bg-zinc-800" : "hover:bg-zinc-100"
            }`}
          >
            <img
              src="/ellypsis.svg"
              className={`w-full h-full ${more ? "invert" : ""}`}
              alt=""
            />
          </button>
          <div
            className={`${
              more
                ? "animate-fade-up animate-duration-500 animate-ease-out"
                : "hidden"
            } z-50 absolute mt-48 mr-12 w-44 p-3 shadow-even bg-white h-24 rounded-xl right-0`}
          >
            <span className="w-full mb-2 text-zinc-500 text-xs px-2">
              Options
            </span>
            <Link
              to={`/edit/${selectedBoard?.data?._id}`}
              className="w-full px-2 py-2 hover:bg-zinc-200 rounded-lg flex"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>

      <span className="text-zinc-500 px-20 flex items-center gap-1 mt-4">
        {selectedBoard?.data?.isSecret ? (
          <div className="flex gap-2 items-center">
            <div className="h-6 w-6 p-1.5 bg-zinc-100 rounded-full">
              <img
                src="/Padlock-Square-1--Streamline-Core.svg"
                className="h-full w-full"
                alt=""
              />
            </div>
            <span className="font-light">Secret • </span>
          </div>
        ) : (
          ""
        )}{" "}
        {selectedBoard?.data?.pins?.length} Pins
      </span>

      <div className="w-full px-20 mt-4 h-10 flex items-center">
        <div
          className="collaborators flex items-center justify-between h-full relative"
          style={{
            width: `${
              (selectedBoard?.data?.collaborators.length + 2) * 2.2
            }rem`,
          }}
        >
          {/* User div */}
          <div className="h-full w-10 border-2 border-white bg-red-200 rounded-full overflow-hidden z-[1]">
            <img
              src={`/uploads/${selectedBoard?.data?.createdBy?.profileImage}`}
              alt=""
            />
          </div>

          {/* Collaborators divs */}
          {selectedBoard?.data?.collaborators.map((collaborator, index) => (
            <div
              key={index}
              className={`h-full w-10 border-2 border-white bg-blue-200 rounded-full z-[${
                index + 2
              }] absolute`}
              style={{ marginLeft: `${(index + 1) * 1.8}rem` }}
            ></div>
          ))}

          {/* Last div with image */}
          <div
            className="h-full w-10 border-2 border-white bg-zinc-200 rounded-full hover:bg-zinc-300 z-[999] absolute p-2.5"
            style={{
              marginLeft: `${
                (selectedBoard?.data?.collaborators.length + 1) * 1.8
              }rem`,
            }}
          >
            <img
              src="/User-Add-Plus--Streamline-Core.svg"
              className="w-full h-full"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[4.8rem] px-24 mt-6">
        <div className="w-[4.8rem] gap-1 flex flex-col items-center justify-center">
          <div className="bg-zinc-200 h-[4.8rem] w-[4.8rem] rounded-3xl p-7">
            <img
              src="/Pathfinder-Minus-Front-1--Streamline-Core.svg"
              className="w-full h-full"
              alt=""
            />
          </div>
          <span className="text-sm text-zinc-600">Organise</span>
        </div>
      </div>

      <div className="w-screen h-10 mt-16 flex flex-row-reverse px-20">
        <div className="h-full w-10 rounded-full hover:bg-zinc-200 p-2">
          <img src="/equalizer-2-line.svg" className="w-full h-full" alt="" />
        </div>
      </div>

      <div className="w-screen px-20">
        <div className="columns-5 gap-x-5 break-inside-avoid">
          {selectedBoard?.data?.pins?.map((elem) => (
            <Link to={`/pin/${elem._id}`} className="card mb-2" key={elem._id}>
              {elem.file.filetype === "image/jpeg" ? (
                <img
                  src={`${elem.file.fileurl}`}
                  className="shadow-xl object-cover object-top w-full rounded-xl mb-1 break-after-avoid"
                  alt={`Image uploaded by ${elem.createdBy.fullname.firstname}`}
                  loading="lazy"
                />
              ) : (
                <div className="relative">
                  <h5 className="absolute text-xs px-1.5 py-0.5 mt-1 ml-1 opacity-70 bg-zinc-200 text-zinc-800 rounded-full video-duration">
                    0:00
                  </h5>
                  <video
                    src={`${elem.file.fileurl}`}
                    className="shadow-xl rounded-xl mb-1 break-after-avoid mt-1 video"
                    controls
                  />
                </div>
              )}
              <div className="data flex items-center gap-2 mt-2 mb-4 ml-1">
                <div className="h-7 w-7 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover rounded-full"
                    src={`/uploads/${elem.createdBy.profileImage}`}
                    alt={`${elem.createdBy.fullname.firstname}'s profile`}
                  />
                </div>
                <h3 className="whitespace-nowrap overflow-ellipsis overflow-hidden">
                  {elem.createdBy.fullname.firstname}{" "}
                  {elem.createdBy.fullname.surname}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-screen py-6 flex items-center justify-center">
        <img src="/pinterest-fill-@.svg" className="h-10 w-10" alt="" />
      </div>
    </div>
    </>
  );
};

export default Board;
