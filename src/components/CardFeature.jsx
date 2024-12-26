import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { addCartItem } from "../redux/productSlice";

export default function CardFeature({ image, name, price, category, id }) {
  const dispatch = useDispatch();
  const maxLength = 16;

  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full hover:scale-105 transition-all" />
            </div>
            <h3 className="font-semibold text-black capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name.length > maxLength
                ? `${name.slice(0, maxLength)}...`
                : name}
            </h3>
            <p className=" text-slate-500  font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
            onClick={handleAddCartProduct}
          >
            Add to Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <PulseLoader color="#FF0000" />
        </div>
      )}
    </div>
  );
}
