import React, {useState} from "react";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import Api from "../API";
import toast from "react-hot-toast";

const Newproduct = () => {
  const [data,setData] = useState("")
  console.log("data:", data);

  const handleOnChange = (e)=>{
    setData({...data, [e.target.id]: e.target.value})
  }

  const uploadImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      // console.log("data:",data)
      setData((preve)=>{
        return{ ...preve, image : data }
      })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(data);
    const {name,category,image,price, description} = data

    if(name && category && image && price && description){
    try {
      const res = await Api.uploadProduct(
        name,category,image,price, description
        )
      //  console.log("res:", res);
       const dataRes = res.data;
      //  console.log("dataRes:", dataRes);
      toast(dataRes.message);
        setData("")
      } catch (error) {
        console.log(error.message);
      }
    }
    else{
      toast("Enter Required Fields")
    }
  }
  
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type={"text"}
          id="name"
          name="name"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          id="category"
          name="category"
          onChange={handleOnChange}
        >
          <option value={"other"}>select category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegetable</option>
          <option value={"icream"}>Icream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option>
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"panner"}>Panner</option>
          <option value={"sandwich"}>Sandwich</option>
          <option value={"chicken"}>Chicken</option>
        </select>

        <label htmlFor="image">
          Image
          <div  className='h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} className="h-full" /> :<span className='text-5xl'><BsCloudUpload/></span> 
            }

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-1">
          Price
        </label>
        <input
          type={"text"}
          className="bg-slate-200 p-1 my-1"
          name="price"
          id="price"
          onChange={handleOnChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          className="bg-slate-200 p-1 my-1 resize-none"
          name="description"
          id="description"
          onChange={handleOnChange}
        ></textarea>
        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
