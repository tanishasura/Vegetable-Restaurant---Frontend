import React, { useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Menu from "./page/Menu";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import toast, { Toaster } from "react-hot-toast";
import Api from "./API";
import { setDataProduct } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./page/Cart";

export default function App() {
const dispatch = useDispatch();
const productData = useSelector((state) => state.product)
// console.log("productData:", productData);

  const getProduct = async () => {
    const res = await Api.getProducts();
    // console.log("res:", res);
    const resData = await res.data;
    // console.log("resData:", resData);
    dispatch(setDataProduct(resData));
  };
  useEffect(() => {
    getProduct();
  }, []);



  return (
    <>
      <Toaster />
      <BrowserRouter>
        {/* <ToastContainer position='top-center' /> */}
        <Header />
        <div className="bg-slate-100 min-h-screen pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu/:filterby" element={<Menu />} />
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/newproduct" element={<Newproduct />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
