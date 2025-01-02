import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import imageupload from "../helpers/imageupload";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummryApi from "../Commen";
import { toast } from "react-toastify";
import ProductCategory from "../helpers/ProductCategory";

const UploadProducts = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Description: "",
    Price: "",
    sellingPrice: "",
  });

  const [openFullscreenImage, setOpenFullScreenImage] = useState(false);
  const [fullscreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await imageupload(file);

    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...prev.ProductImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImages = async (index) => {
    const newProductImage = [...data.ProductImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        ProductImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Response = await fetch(SummryApi.uploadProduct.url, {
      method: SummryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await Response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed pt-20 w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 bottom-0 right-0 flex justify-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Products</h2>
          <div
            className="m-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="ProductName">Product Name</label>
          <input
            type="text"
            id="ProductName"
            name="ProductName"
            placeholder="Enter Product Name"
            value={data.ProductName}
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />
          <label htmlFor="BrandName" className="mt-3">
            Brand Name
          </label>
          <input
            type="text"
            id="BrandName"
            name="BrandName"
            placeholder="Enter Brand Name"
            value={data.BrandName}
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />
          <label htmlFor="Category" className="mt-3">
            Category
          </label>
          <select
            value={data.Category}
            name="Category"
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Select Category</option>
            {ProductCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="ProductImage" className="mt-3">
            Product Image
          </label>
          <label htmlFor="UploadImage">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-1">
                <span className="text-4xl">
                  {" "}
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Image</p>
                <input
                  type="file"
                  id="UploadImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.ProductImage[0] ? (
              <div className="flex items-center gap-2">
                {data.ProductImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImages(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *please upload product image
              </p>
            )}
          </div>
          <label htmlFor="Price" className="mt-3">
            Price
          </label>
          <input
            type="number"
            id="Price"
            name="Price"
            placeholder="Enter Price"
            value={data.Price}
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Enter Selling Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="Description" className="mt-3">
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            className="h-28 bg-slate-100 resize-none border p-1"
            placeholder="Enter Product Description"
            rows={3}
            value={data.Description}
            onChange={handleOnChange}
          />

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/* Display image full screen */}
      {openFullscreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgurl={fullscreenImage}
        />
      )}
    </div>
  );
};

export default UploadProducts;
