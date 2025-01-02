import Logo1 from "../Assets/Logo2.png";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummryApi from "../Commen";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../Commen/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const [menuDisplay, setMenudisplay] = useState(false);
  const context = useContext(Context)
 const navigate = useNavigate()
 const searchInput = useLocation()
 const urlSearch = new  URLSearchParams(searchInput?.search)
 const searchQuery = urlSearch.getAll("q")
 const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummryApi.Logout.url, {
      method: SummryApi.Logout.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/Home")
    }
    if (data.erroe) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) =>{
    const { value } = e.target
    setSearch(value)
    if(value){
      navigate(`/Search?q=${value}`)
    }else{
      navigate("/Search")
    }
  }
  return (
    <header className="h-18 shadow-md bg-white fixed z-40 w-full">
      <div className="h-full countainer mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/Home"}>
            <img src={Logo1} alt="" width={90} height={60} className="header-logo"/>
          </Link>
        </div>
        <div className="md:flex items-center w-[400px] justify-between mx-w-sm  border rounded-l-md focus-within:shadow pl-2 hidden">
          <input
            type="text"
            placeholder="Search product..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center rounded-r-md justify-center text-white">
            <IoSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl curser-pointer relative flex justify-center"
                onClick={() => setMenudisplay((preve) => !preve)}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-Panel/Products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenudisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

           {
            user?._id && (
              <Link to={"/cart"} className="text-3xl relative">
            <span>
              <PiShoppingCartSimpleFill />
            </span>

              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 left-3">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
            </Link>
            )
           }
         
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Log out
              </button>
            ) : (
              <Link
                to={"/Login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
