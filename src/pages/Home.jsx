import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getPins, reset } from "../redux/pins/pin.slice";
import Spinner from "../components/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { pins, isLoading, isError, message } = useSelector(
    (state) => state.pins
  );

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch pins and handle errors
  useEffect(() => {
    if (isError) {
      alert(`Error: ${message}`); // Display error as an alert (can use toast instead)
    }
    dispatch(getPins());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="px-12 py-4 w-screen text-center text-lg font-semibold">
        All Pins
      </h1>
      <div className="w-screen px-24 py-3">
        <div className="columns-5 gap-x-5 break-inside-avoid">
          {pins?.pins?.map((elem) => (
            <Link to={`/pin/${elem._id}`} className="card mb-2" key={elem._id}>
              {elem.file.filetype === "image" ? (
                <img
                  src={`/uploads/${elem.file.filename}`}
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
                    src={`/uploads/${elem.file.filename}`}
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
    </>
  );
};

export default Home;
