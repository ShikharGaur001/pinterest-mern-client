import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getCurrentUser, reset } from "../redux/auth/auth.slice";
import { createBoard } from "../redux/boards/board.slice";

const CreateBoard = () => {
  const [sideNav, setSideNav] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    isSecret: false,
  });

  const { title, description, category, isSecret } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } =
    useSelector((state) => state.auth);

  const { isLoadingInBoard, isErrorInBoard, isSuccessInBoard, messageBoard } =
    useSelector((state) => state.boards);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCurrentUser());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const toggleNav = () => {
    setSideNav((prev) => !prev);
  };

  useEffect(() => {
      if (isErrorInBoard) toast.error(messageBoard)
      dispatch(reset())
    }, [isSuccessInBoard, isErrorInBoard, messageBoard, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const boardData = { title, description, category, isSecret };
    dispatch(createBoard(boardData));
    navigate("/dashboard");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoadingInBoard) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center text-red-600">
        <p>Error loading board: {message || messageBoard}</p>
      </div>
    );
  }

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
              <span className="text-2xl font-semibold h-full flex items-center ml-2">
                Create
              </span>
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

      <div
        className={`flex-grow ${
          sideNav ? "w-[calc(100%-24rem)]" : "w-[calc(100%-5rem)]"
        }`}
      >
        <div className="w-full h-20 px-6 flex items-center text-3xl font-bold border-b-2 border-zinc-200">
          Create Board
        </div>

        <div className="w-full px-6 py-4">
          <form className="mt-2 w-4/5" onSubmit={onSubmit}>
            <div className="flex flex-col mb-1 w-2/4">
              <label htmlFor="title" className="text-sm ml-1">
                Title
              </label>
              <input
                className="block px-4 py-2 rounded-xl border-2"
                type="text"
                placeholder='E.g. "Places to go" or "Recipes to make"'
                name="title"
                id="title"
                value={title}
                onChange={onChange}
                required
              />
            </div>

            <div className="flex flex-col mb-1 mt-6 w-2/4">
              <label htmlFor="description" className="text-sm ml-1">
                Description
              </label>
              <textarea
                className="block px-4 py-2 rounded-xl border-2 h-20"
                type="text"
                placeholder='Something about your board...'
                name="description"
                id="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex flex-col mb-1 mt-6 w-2/4">
              <label htmlFor="category" className="text-sm ml-1">
                Category
              </label>
              <select
                className="block px-4 py-2 rounded-xl border-2"
                name="category"
                id="category"
                value={category}
                onChange={onChange}
              >
                <option value="Art">Art</option>
                <option value="Photography">Photography</option>
                <option value="DIY">DIY</option>
                <option value="Food">Food</option>
                <option value="Fashion">Fashion</option>
                <option value="Travel">Travel</option>
                <option value="Other" defaultChecked >Other</option>
              </select>
            </div>

            <div className="flex mt-6 w-2/4 h-14">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSecret"
                  className="w-5 h-5 mx-3 text-zinc-800 bg-gray-100 border-gray-300 rounded-md focus:ring-zinc-800 focus:ring-2"
                  checked={isSecret}
                  onChange={(e) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      isSecret: e.target.checked,
                    }))
                  }
                />
              </div>
              <div className="h-full flex flex-col justify-center">
                <label
                  htmlFor="helper-checkbox"
                  className="font-semibold text-lg text-gray-900"
                >
                  Keep this board secret
                </label>
                <p
                  id="helper-checkbox-text"
                  className="text-xs font-normal text-gray-500"
                >
                  So only you and collaborators can see it.
                </p>
              </div>
            </div>

            <input
              type="submit"
              value="Create"
              className="bg-pinterest text-md font-semibold ml-[42%] px-4 py-3 rounded-full text-white mt-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBoard;
