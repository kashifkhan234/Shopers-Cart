import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Forgotpassword from "../Pages/Forgotpassword";
import Signup from "../Pages/Signup";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import Products from "../Pages/Products";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Forgot-Password",
        element: <Forgotpassword />,
      },
      {
        path: "/Sign-up",
        element: <Signup />,
      },
      {
        path: "category-product",
        element: <CategoryProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails/>
      },
      {
        path : "cart",
        element : <Cart/>
      },
      {
        path : "Search",
        element : <SearchProduct/>
      },
      {
        path: "/admin-Panel",
        element: <AdminPanel />,

        children: [
          {
            path: "All-Users",
            element: <AllUsers />,
          },
          {
            path: "Products",
            element: <Products />,
          }
        ],
      },
    ],
  },
]);
export default router;
