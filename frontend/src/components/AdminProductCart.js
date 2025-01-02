import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayINRCurrency from "../helpers/displayCurrency";

const AdminProductCart = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.ProductImage[0]}
            width={120}
            height={120}
            className="mx-auto object-fit h-full w-fit"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.ProductName}</h1>

        <div>
          <p className="font-semibold">
            {DisplayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="w-fit ml-auto bg-red-100 p-2 hover:bg-red-600 hover:text-white rounded-full cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productdata={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
