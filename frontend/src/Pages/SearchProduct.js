import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummryApi from "../Commen";
import VerticalCart from "../components/VerticalCart";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummryApi.searchProduct.url + query.search);
    const ResponseData = await response.json();
    setLoading(false);

    setData(ResponseData.data);

    console.log("ResponseData", ResponseData);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);
  return (
    <div className="mx-auto lg:px-16 py-2">
      {loading && <p className="text-center text-lg">Loading...</p>}
      <p className="text-lg font-semibold my-3">
        Search Product : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="text-lg text-center p-4 bg-white">No Data Found...</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCart loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
