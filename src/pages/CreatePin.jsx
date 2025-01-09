import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreatePin = () => {
  const [sideNav, setSideNav] = useState(false);

  const toggleNav = () => {
    setSideNav((prev) => !prev);
  };

  return (
    <div className="flex w-screen">
      <div
        className={`flex flex-col items-center min-h-screen ${
          sideNav ? "w-96" : "w-20"
        } py-4 border-r-2 border-zinc-200`}
      >
        {sideNav ? (
          <div className="w-full flex flex-col px-4 pb-4 border-b-2 border-zinc-200">
            <div className="w-full flex justify-between">
              <span className="text-2xl font-semibold h-full flex items-center ml-2">Create</span>
              <button
                onClick={toggleNav}
                className="w-12 hover:bg-zinc-200 rounded-full h-12 p-3"
              >
                <img
                  src="/Bracket--Streamline-Core.svg"
                  className="w-full h-full"
                  alt=""
                />
              </button>
            </div>

            <Link
              to="/create/pin"
              className="w-full mt-4 h-10 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center"
            >
              New pin
            </Link>

            <Link
              to="/create/board"
              className="w-full mt-4 h-10 rounded-full bg-zinc-200 hover:bg-zinc-300 flex items-center justify-center"
            >
              New board
            </Link>
          </div>
        ) : (
          <div className="w-full h-16 border-b-2 border-zinc-200 flex justify-center">
            <button
              onClick={toggleNav}
              className="w-12 hover:bg-zinc-200 rounded-full h-12 p-3"
            >
              <img
                src="/Bracket--Streamline-Core.svg"
                className="w-full h-full"
                alt=""
              />
            </button>
          </div>
        )}
      </div>

      <div className={`flex-grow ${sideNav ? "w-[calc(100%-24rem)]" : "w-[calc(100%-5rem)]"}`}>
        <div className="w-full h-20 px-6 flex items-center text-3xl font-bold border-b-2 border-zinc-200">Create Pin</div>
      </div>
    </div>
  );
};

export default CreatePin;
