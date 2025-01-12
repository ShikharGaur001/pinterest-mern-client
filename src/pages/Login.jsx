import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../redux/auth/auth.slice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const {email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError && message) toast.error(message);
    if (isSuccess || user) navigate("/dashboard")
    dispatch(reset())
  }, [user, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {email, password}
    dispatch(login(userData))
  }

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
      <div className="w-[28vw] h-[60vh] bg-zinc-100 rounded-3xl px-14 py-6 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 left-1/2">
        <img className="h-9 m-auto mb-1" src="/pinterest-logo.svg" alt="" />
        <h1 className="text-center text-2xl font-medium tracking-tighter">
          Welcome to Pinterest
        </h1>
        <h3 className="text-center text-lg text-zinc-500 font-medium tracking-tighter">
          Login your account
        </h3>

        <form onSubmit={onSubmit} className="mt-2">
          <div className="flex flex-col mb-1">
            <label htmlFor="email" className="text-xs ml-1">
              Email
            </label>
            <input
              className="block px-3 py-[.4rem] rounded-xl border-2"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              name="email"
              id="email"
              required
            />
          </div>

          <div className="flex flex-col mt-1">
            <label htmlFor="password" className="text-xs ml-1">
              Password
            </label>
            <input
              className="block px-3 py-[.4rem] rounded-xl border-2"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              name="password"
              id="password"
              required
            />
            <a href="/forgot" className="text-sm font-medium mt-1">
              Forgotten your password?
            </a>
          </div>

          <input
            type="submit"
            value="Log In"
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
          <p className="text-sm mt-4 w-full flex gap-1 justify-center items-center font-medium text-zinc-600">
            Don't have an account yet?
            <Link
              to="/signup"
              className="flex hover:underline items-center justify-center font-semibold text-black"
            >
              Sign up
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
