import React from "react";

const Spinner = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-500 bg-opacity-50 z-50 flex justify-center items-center">
        <span className="w-12 h-12 border-4 border-white border-b-transparent rounded-full inline-block box-border animate-spin"></span>
      </div>
    </div>
  );
};

export default Spinner;
