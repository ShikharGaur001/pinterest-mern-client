import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Check if user exists on initial load and redirect if not
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  
  return (
    <div className="w-screen h-screen bg-zinc-600">
      <div className="w-full h-screen px-4 grid grid-cols-7 gap-4 bg-white opacity-50 overflow-hidden z-0">
        <div className="flex flex-col gap-6 h-screen animate-scroll-up">
          <img className="w-full rounded-lg shadow-lg" src="/1.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/2.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/3.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/4.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/1.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/2.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/3.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/4.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-down">
          <img className="w-full rounded-lg shadow-lg" src="/5.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/6.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/7.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/5.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/6.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/7.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-up">
          <img className="w-full rounded-lg shadow-lg" src="/8.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/14.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/13.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/8.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/14.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/13.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-down">
          <img className="w-full rounded-lg shadow-lg" src="/9.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/12.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/17.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/9.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/12.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/17.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-up">
          <img className="w-full rounded-lg shadow-lg" src="/11.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/20.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/10.gif" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/11.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/20.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/10.gif"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-down">
          <img className="w-full rounded-lg shadow-lg" src="/15.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/22.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/16.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/15.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/22.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/16.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-6 h-screen animate-scroll-up">
          <img className="w-full rounded-lg shadow-lg" src="/18.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/19.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/21.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/23.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/18.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/19.jpg" alt="" />
          <img className="w-full rounded-lg shadow-lg" src="/21.jpg" alt="" />
          <img
            className="w-full rounded-lg shadow-lg mb-6"
            src="/23.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="absolute -translate-x-1/2 flex -translate-y-1/2 top-1/2 left-1/2 bg-zinc-50 rounded-2xl w-[50vw] h-[30vw] z-10">
        <div className="w-1/2 items-center gap-20 justify-center flex flex-col h-full">
          <img className="h-44" src="/pinterest-logo.svg" alt="" />
          <h3 className="text-pinterest text-lg">Pinterest, Inc.</h3>
        </div>
        <div className="w-1/2 py-8 pr-6">
          <h2 className="font-bold text-4xl tracking-tighter mb-4">
            Getting Started with Pinterest
          </h2>
          <h3 className="text-xl text-zinc-500 tracking-tighter mb-44">
            Your Creative Journey Begins Here
          </h3>
          <Link
            to={"/login"}
            className="w-full flex items-center justify-center text-white py-4 rounded-xl bg-pinterest text-xl font-semibold "
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
