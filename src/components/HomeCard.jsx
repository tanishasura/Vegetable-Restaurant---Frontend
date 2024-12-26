import React from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from 'react-spinners';

export default function HomeCard ({ name, image, category, price, id }) {
  // console.log("image:", image);
  const maxLength = 16;

  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px]">
      {name ? (
        <>
        <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior : "smooth"})} >
          <div className="w-40 min-h-[150px]">
            <img src={image} className="h-full w-full" />
          </div>
          <h3 className="font-semibold text-black text-center capitalize text-lg">
          {name.length > maxLength ? `${name.slice(0, maxLength)}...` : name}
          </h3>
          <p className="text-center text-slate-500  font-medium">{category}</p>
          <p className="text-center font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          {/* <p>{loading}</p> */}
          <PulseLoader color="#FF0000"/>
        </div>
      )}
    </div>
  );
};