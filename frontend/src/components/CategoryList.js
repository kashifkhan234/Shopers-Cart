import React, { useEffect, useState } from "react";
import SummryApi from "../Commen";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProdduct = async () => {
    setLoading(true);
    const response = await fetch(SummryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProdduct();
  }, []);
  return (
    <div className="mx-auto px-2 py-4">
      <div className="flex items-center gap-4 justify-center overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })  : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/category-product?Category=" + product?.Category}
                  className="cursor-pointer"
                  key={product?.Category}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex justify-center items-center">
                    <img
                      src={product?.ProductImage[0]}
                      alt={product?.Category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transiation-all"
                    />
                  </div>
                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.Category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
