import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import HomeCard from "../components/HomeCard";
import CardFeature from "../components/CardFeature";
// import FilterProduct from "../components/FilterProduct";
import AllProduct from "../components/AllProduct";

export default function Home() {
  const productData = useSelector((state) => state.product.productList);
  // console.log("productData:", productData);

  const homeProductCartList = productData.slice(1, 7);
  // console.log("homeProductCartList:", homeProductCartList);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  // console.log(homeProductCartListVegetables);

  const loadingArray = new Array(6).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const scrollLeft = () => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      container.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      container.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery at{" "}
            <span className="text-red-600 text-">Your Home</span>
          </h2>
          <p className="py-3 text-base ">
            Online Shopping of 100% Fresh Fruits, Vegetables, and Fastfood at
            best price. 100% chemical free produce, harvested for your order,
            ensuring peak ripeness and exceptional taste. Order from our wide
            range of fresh exotic fruits, vegetables and Fastfood online.
          </p>

          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index + "loading"} />;
              })}
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={scrollLeft}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>

            <button
              onClick={scrollRight}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div className="scroll-container flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all">
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Your Products"}/>
    </div>
  );
}
