import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { FaOpencart, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const currentUser = useSelector((state) => state.user);
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  // console.log("currentUser:", currentUser.email);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast("Logout successfully!");
  };

  // console.log("Admin:", import.meta.env.VITE_ADMIN_EMAIL);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-14 flex items-center">
            <h1 className="text-5xl">
              <FaOpencart />
            </h1>
            <div className="ml-2">
              <h1 className="font-sans text-2xl italic font-bold">tanisha</h1>
              <h3 className="text-sm">shop here</h3>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to='/cart'> <BsCartFill /> 
            <div className="absolute -top-1 -right-1 text-white bg-red-500 rounded-full m-0 p-0 h-4 w-4 text-sm text-center">
            {cartItemNumber.length}
            </div>
            </Link> 
          </div>

          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow">
              {currentUser && currentUser.image ? (
                <img src={currentUser.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>

            {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {currentUser.email === import.meta.env.VITE_ADMIN_EMAIL && (
                  <Link
                    to="/newproduct"
                    className="whitespace-nowrap cursor-pointer px-2 hover:bg-slate-50"
                  >
                    New product
                  </Link>
                )}

                {currentUser?._id ? (
                  <button
                    onClick={handleLogout}
                    className="whitespace-nowrap cursor-pointer px-2 bg-red-500"
                  >
                    Logout ({currentUser.firstName})
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="whitespace-nowrap cursor-pointer px-2 hover:bg-slate-50"
                  >
                    Login
                  </Link>
                )}

                <nav className="flex flex-col text-base md:text-lg md:hidden">
                  <Link to="/" className="px-2 py-1 hover:bg-slate-50">Home</Link>
                  <Link to="/menu" className="px-2 py-1 hover:bg-slate-50">Menu</Link>
                  <Link to="/about" className="px-2 py-1 hover:bg-slate-50">About</Link>
                  <Link to="/contact" className="px-2 py-1 hover:bg-slate-50">Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
