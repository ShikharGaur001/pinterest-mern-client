import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-500 bg-opacity-50 z-50 flex justify-center">
        <div className="h-12 w-12 rounded-full bg-zinc-500 p-3.5 animate-spin mt-28">
          <img src="/Dashboard-Circle--Streamline-Core.svg" className="h-full w-full" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
