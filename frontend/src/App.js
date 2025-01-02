import { useEffect, useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummryApi from "./Commen";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = useCallback(async () => {
    const dataResponse = await fetch(SummryApi.current_user.url, {
      method: SummryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  }, [dispatch]);
  const fetchAddToCartProduct = async() => {
    const dataResponse = await fetch(SummryApi.countAddToCartProductcount.url, {
      method: SummryApi.countAddToCartProductcount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
    console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    // user Details
    fetchUserDetails();
    // Add To Cart Product
    fetchAddToCartProduct()
  }, [fetchUserDetails,fetchAddToCartProduct]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,  //Add To Cart Product
          fetchAddToCartProduct

        }}
      >
        <ToastContainer 
         position="top-center"
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-20">
          <Outlet />
        </main>
        <div className="">
        <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
