import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../redux/auth/auth.slice";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      surname: "",
    },
    email: "",
    password: "",
    username: "",
  });

  const { firstname, surname, email, password, username } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/dashboard");
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    if (!firstname || !email || !password || !username) {
      toast.error("Please fill all fields");
      return;
    }

    e.preventDefault();
    const userData = {
      fullname: {
        firstname,
        surname,
      },
      email,
      password,
      username,
    };
    dispatch(register(userData));
  };

  return isLoading ? (
    <Spinner />
  ) : (
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
      <div className="w-[28vw] h-[72vh] bg-zinc-100 rounded-3xl px-14 py-6 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 left-1/2">
        <img className="h-9 m-auto mb-1" src="/pinterest-logo.svg" alt="" />
        <h1 className="text-center text-2xl font-medium tracking-tighter">
          Welcome to Pinterest
        </h1>
        <h3 className="text-center text-lg text-zinc-500 font-medium tracking-tighter">
          Create an account
        </h3>
        <form onSubmit={onSubmit} className="mt-2 w-full">
          <div className="flex gap-[2%]">
            <div className="flex flex-col w-[49%]">
              <label htmlFor="firstname" className="text-xs ml-1">
                First Name
              </label>
              <input
                className="block px-3 py-[.4rem] rounded-xl border-2"
                type="text"
                placeholder="First Name"
                name="firstname"
                id="firstname"
                onChange={onChange}
                value={firstname}
                required
              />
            </div>
            <div className="flex flex-col w-[49%]">
              <label htmlFor="surname" className="text-xs ml-1">
                Surname
              </label>
              <input
                className="block px-3 py-[.4rem] rounded-xl border-2"
                type="text"
                placeholder="Surname"
                name="surname"
                value={surname}
                onChange={onChange}
                id="surname"
              />
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="username" className="text-xs ml-1">
              Username
            </label>
            <input
              className="block px-3 py-[.4rem] rounded-xl border-2"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              id="username"
            />
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="email" className="text-xs ml-1">
              Email address
            </label>
            <input
              className="block px-3 py-[.4rem] rounded-xl border-2"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              id="email"
            />
          </div>
          <div className="flex flex-col mt-1">
            <label htmlFor="password" className="text-xs ml-1">
              Password
            </label>
            <input
              className="block px-3 py-[.4rem] rounded-xl border-2"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              id="password"
            />
          </div>
          <input
            type="submit"
            value="Create New Account"
            className="bg-pinterest w-full px-3 py-[.4rem] rounded-full text-white mt-4"
          />
        </form>
        <footer>
          <p className="text-xs tracking-tight text-center mt-6 text-zinc-600">
            By continuing, you agree to Pinterest's
            <b className="text-black">Terms of Service</b> and acknowledge that
            you've read our{" "}
            <b className="text-black">Privacy Policy. Notice at collection</b>.
          </p>
          <p className="text-sm flex justify-center items-center gap-1 mt-4 w-full font-medium text-zinc-600">
            Already a member?
            <Link
              to="/login"
              className="flex items-center hover:underline justify-center font-semibold text-black"
            >
              Log In
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
