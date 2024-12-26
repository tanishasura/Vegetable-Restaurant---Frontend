import React, { useState } from "react";
import loginSignupImage from "../assest/login.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Api from "../API";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userSlice";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

export default function Login() {
  const currentUser = useSelector((state) => state.user);
  console.log("currentUser:", currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});
  // console.log("data:", data);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value.trim() });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      if (email && password) {
        const res = await Api.login(email, password);
        // console.log("res:", res);
        const dataRes = res.data;
        // console.log("dataRes:", dataRes);
        if (dataRes.success === true) {
          toast(`${currentUser.firstName} ${res.data.message}`);
          dispatch(login(dataRes));
          // console.log("ok:", currentUser.firstName);
          navigate("/");
        }
      } else {
        alert("Please enter required fields");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={loginSignupImage} className="w-full h-full" />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form
          className="w-full py-3 flex flex-col text-md font-semibold"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email*</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password*</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
