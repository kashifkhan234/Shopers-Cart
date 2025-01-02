import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCartProduct from "../components/HorizontalCartProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="mb-8">
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct Category={"airdopes"} heading={"Top's Airdopes"} />
      <HorizontalCartProduct Category={"watches"} heading={"Populer Watches"} />

      <VerticalCardProduct Category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct Category={"laptop"} heading={"Laptops"} />
      <VerticalCardProduct Category={"televetions"} heading={"Televetions"} />
      <VerticalCardProduct Category={"camera"} heading={"Cameras & Photography"} />
      <VerticalCardProduct Category={"trimmers"} heading={"Trimmers"} />
      <VerticalCardProduct Category={"shirts"} heading={"Shirts"} />
      <VerticalCardProduct Category={"t-shirts"} heading={"T-Shirts"} />
      <VerticalCardProduct Category={"jeans"} heading={"Jeans"} />
      <VerticalCardProduct Category={"shoes"} heading={"Shoes"} />
      <VerticalCardProduct Category={"sleepers"} heading={"Sleepers"} />
    </div>
  );
};
export default Home;
