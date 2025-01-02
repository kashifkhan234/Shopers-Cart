import React, { useEffect, useState } from "react";
import UploadProducts from "../components/UploadProducts";
import SummryApi from "../Commen";
import AdminProductCart from "../components/AdminProductCart";

const Products = () => {
  const [openUploadProducts, setOpenUploadProducts] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(SummryApi.products.url);
    const dataResponse = await response.json();

    setProducts(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Products</h1>
        <button
          className="border-2 py-1 px-3 rounded-full border-red-600 hover:bg-red-600 hover:text-white transition-all text-red-600"
          onClick={() => setOpenUploadProducts(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {products.map((product, index) => {
          return (
            <AdminProductCart
              data={product}
              key={index + "Products"}
              fetchData={fetchProducts}
            />
          );
        })}
      </div>

      {openUploadProducts && (
        <UploadProducts
          onClose={() => setOpenUploadProducts(false)}
          fetchData={fetchProducts}
        />
      )}
    </div>
  );
};

export default Products;
