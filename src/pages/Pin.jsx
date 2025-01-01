import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPin, reset } from "../redux/pins/pin.slice";
import Spinner from "../components/Spinner";

const Pin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pinId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { selectedPin, isLoading, isError, message } = useSelector(
    (state) => state.pins
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getPin(pinId));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, pinId]);

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
  if (!selectedPin?.file) {
    return (
      <div className="w-full flex justify-center text-gray-500">
        <p>No pin selected or data unavailable.</p>
      </div>
    );
  }

  const { file } = selectedPin;

  return (
    <div className="w-screen py-6 flex justify-center">
      <Link to="/home" className="absolute h-16 w-16 left-0 ml-6 mt-2 p-4 bg-zinc-100 rounded-full">
        <img src="/Arrow-Up-1--Streamline-Core.svg" className="h-full w-full -rotate-90" alt="" />
      </Link>
      <div className="rounded-3xl max-h-[44vw] w-[60vw] flex overflow-hidden">
        <div className="left bg-zinc-100 w-1/2 h-full flex items-center justify-center">
          {file?.filetype === "image" ? (
            <img
              className="h-full w-auto object-cover"
              src={`/uploads/${file?.filename}`}
              alt="Post"
            />
          ) : (
            <video
              className="h-full w-auto object-cover"
              preload="auto"
              autoPlay
              controls
              src={`/uploads/${file?.filename}`}
            ></video>
          )}
        </div>
        <div className="right border border-l-0 border-zinc-200 flex flex-col items-center p-2 rounded-e-3xl w-1/2 h-full">
          <div className="w-full h-14 flex items-center justify-between">
            <div className="h-full flex items-center">
              <div className="bg-orange-200 h-full w-14"></div>
              <div className="bg-amber-200 h-full w-14"></div>
              <div className="bg-blue-200 h-full w-14"></div>
              <div className="bg-violet-200 h-full w-14"></div>
              <div className="bg-pink-200 h-full w-14"></div>
            </div>
            <a
              href="#"
              role="button"
              tabIndex="0"
              className="bg-[#e60023] text-white text-lg font-semibold px-10 py-3 rounded-2xl"
            >
              Save
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
