import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPin, savePin } from "../redux/pins/pin.slice";
import Spinner from "../components/Spinner";
import { getCurrentUser, reset } from "../redux/auth/auth.slice";

const Pin = () => {
  const [formData, setFormData] = useState({
    board: "",
  });

  const { board } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pinId } = useParams();

  const { user, myProfile } = useSelector((state) => state.auth);
  const { selectedPin, isLoading, isError, message } = useSelector(
    (state) => state.pins
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (!myProfile) {
      dispatch(getCurrentUser());
    }
    if (!selectedPin) {
      dispatch(getPin(pinId));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, pinId]);

  const formatLikesCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const saveData = { pinId: selectedPin?._id, boardid: board };
    dispatch(savePin(saveData));
    navigate(`/pin/${selectedPin?._id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center text-red-600">
        <p>Error loading pin: {message}</p>
      </div>
    );
  }

  // Ensure selectedPin is available
  if (!selectedPin) {
    return (
      <div className="w-full flex justify-center text-gray-500">
        <p>No pin selected or data unavailable.</p>
      </div>
    );
  }

  const { file } = selectedPin;

  return (
    <div className="w-screen py-6 flex justify-center">
      <button
        onClick={() => navigate(-1)}
        className="absolute h-12 w-12 left-0 ml-6 mt-2 p-3 hover:bg-zinc-100 rounded-full"
      >
        <img
          src="/Arrow-Up-1--Streamline-Core.svg"
          className="h-full w-full -rotate-90"
          alt=""
        />
      </button>
      <div className="rounded-3xl max-h-[44vw] w-[60vw] flex overflow-hidden">
        <div className="left bg-zinc-100 w-1/2 h-full flex items-center justify-center">
          {file?.filetype === "image/jpeg" ? (
            <img
              className="h-full w-auto object-cover"
              src={`${file?.fileurl}`}
              alt="Post"
            />
          ) : (
            <video
              className="h-full w-auto object-cover"
              preload="auto"
              autoPlay
              controls
              src={`${file?.filetype}`}
            ></video>
          )}
        </div>
        <div className="right border border-l-0 border-zinc-200 flex flex-col items-center p-2 rounded-e-3xl w-3/4 h-full">
          <div className="w-full h-14 flex items-center justify-between">
            <div className="h-full flex items-center">
              <div className="hover:bg-zinc-200 flex items-center justify-center p-3.5 h-full w-14 rounded-full">
                <img src="/heart-3-line.svg" className="h-full w-full" alt="" />
              </div>
              <div className="h-full w-14 flex items-center justify-center text-xl font-semibold">
                {formatLikesCount(selectedPin?.likes?.length)}
              </div>
              <div className="hover:bg-zinc-200 h-full w-14 p-4 flex items-center justify-center rounded-full">
                <img
                  className="h-full w-full"
                  src="/Inbox-Tray-2--Streamline-Core.svg"
                  alt=""
                />
              </div>
              <div className="hover:bg-zinc-200 h-full w-14 p-3 flex items-center justify-center rounded-full">
                <img src="/ellypsis.svg" className={`w-full h-full`} alt="" />
              </div>
            </div>
            <form className="h-full flex gap-2" onSubmit={onSubmit}>
              <select
                name="board"
                value={board}
                onChange={onChange}
                className="h-full w-44 rounded-2xl border-2 border-zinc-200"
              >
                <option value="">Profile</option>
                {myProfile?.boards?.map((elem) => (
                  <option key={elem?._id} value={elem?._id}>
                    {elem?.title}
                  </option>
                ))}
              </select>
              <input
                type="submit"
                value={`${myProfile?.pins?.savedPins?.includes(selectedPin?._id?.toString()) ? "Saved" : "Save"}`}
                className={`${myProfile?.pins?.savedPins?.includes(selectedPin?._id?.toString()) ? "bg-zinc-800" : "bg-pinterest"} text-white text-lg font-semibold px-6 py-3 rounded-2xl`}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
