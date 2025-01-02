import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummryApi from "../Commen";
import { FaStar, FaStarHalf } from "react-icons/fa";
import DisplayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/categoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    ProductName: "",
    BrandName: "",
    Category: "",
    ProductImage: [],
    Description: "",
    Price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImageLoadingList = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState(null);
  const [zoomImage, setZoomImage] = useState({
    x: 0,
    y: 0,
  });
  const [imageZoom, setImageZoom] = useState(false);

  const { fetchAddToCartProduct } = useContext(Context);
  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummryApi.productDetails.url, {
        method: SummryApi.productDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      });

      const dataResponse = await response.json();
      setData(dataResponse?.data || {});
      setActiveImage(dataResponse?.data?.ProductImage?.[0] || null);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchProductDetails();
    }
  }, [params?.id]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setImageZoom(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImage({
        x,
        y,
      });
    },
    [zoomImage]
  );
  const handleLeaveImageZoom = () => {
    setImageZoom(false);
  }

  const handleAddToCart = async(e,id) => {
    await addToCart(e,id)
    fetchAddToCartProduct()
  }
  const handleBuyProduct = async(e,id) => {
    await addToCart(e,id)
    fetchAddToCartProduct()
    navigate("/cart")
  }

  return (
    <div className="mx-auto lg:px-16 py-2">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            {activeImage ? (
              <img
                src={activeImage}
                className="w-full h-full mix-blend-multiply object-scale-down"
                alt="Product"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
            ) : (
              <div className="text-gray-500">No image available</div>
            )}
            {/* product Zoom */}
            {imageZoom && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImage.x * 100}% ${
                      zoomImage.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageLoadingList.map((el, index) => (
                  <div
                    className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                    key={`loadingImage-${index}`}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.ProductImage?.length > 0 ? (
                  data.ProductImage.map((imgURL, index) => (
                    <div
                      className="h-20 w-20 bg-slate-200 p-1 rounded"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        alt="Product"
                        className="w-full h-full mix-blend-multiply object-scale-down cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No images available</div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {loading ? (
          <div className="grid gap-4 w-full">
            <h1 className="text-2xl font-bold bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full py-3"></h1>
            <p className="text-2xl font-medium bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></p>
            <p className=" bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></p>
            <div className="bg-slate-200 animate-pulse flex items-center gap-1  h-6 lg:h-8 w-full rounded-full py-3"></div>
            <div className="flex items-center gap-3 text-2xl lg:text-3xl font-medium w-full">
              <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></p>
              <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></p>
            </div>
            <p className="bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></p>
            <div className="flex items-center gap-3 w-full">
              <button className="border-2  px-3 min-w-[120px] bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></button>
              <button className="border-2  px-3 min-w-[120px] bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full py-3"></button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-red-600">
              {data?.ProductName || "Product Name"}
            </h1>
            <p className="text-2xl font-medium">
              {data?.BrandName || "Unknown"}
            </p>
            <p className="text-gray-600">{data?.Category || "Unknown"}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center gap-3 text-2xl lg:text-3xl font-medium">
              <p className="text-red-600">
                {DisplayINRCurrency(data?.sellingPrice) || "N/A"}
              </p>
              <p className="text-gray-600 line-through">
                {DisplayINRCurrency(data?.Price) || "N/A"}
              </p>
            </div>
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {data?.Description || "No description available"}
            </p>
            <div className="flex items-center gap-3">
              <button className="border-2 border-red-200 rounded px-3 py-1 min-w-[120px] text-red-600 hover:bg-red-600 hover:text-white font-medium" onClick={(e)=>handleBuyProduct(e,data?._id)}>
                Buy
              </button>
              <button className="border-2 border-red-200 rounded px-3 py-1 min-w-[120px] bg-red-600 text-white font-medium hover:text-red-600 hover:bg-slate-100"  onClick={(e)=>handleAddToCart(e,data?._id)}>
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
       {
        data?.Category && (
          <CategoryWiseProductDisplay Category={data?.Category} heading={"Recommended Product"} />
        )
       }
    </div>
  );
};

export default ProductDetails;
