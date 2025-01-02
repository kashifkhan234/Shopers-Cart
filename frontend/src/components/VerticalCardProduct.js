import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import DisplayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({Category, heading}) => {

    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchAddToCartProduct } = useContext(Context);

    const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
      fetchAddToCartProduct()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(Category)
        setLoading(false)

        setdata(categoryProduct?.data)
    }
    useEffect(()=>{
fetchData()
    },[])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }
  return (
    <div className='mx-auto px-2 md:px-16 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='flex items-center  gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
            <button
              className="bg-white rounded-full p-1 shadow-md absolute left-0 ml-12 text-lg hidden md:block"
              onClick={scrollLeft}
               >
              <FaAngleLeft />
            </button>
            <button
              className="bg-white rounded-full p-1 shadow-md absolute right-0 mr-12 text-lg hidden md:block"
              onClick={scrollRight}
            >
              <FaAngleRight />
            </button> 
      {
        loading ? (
          loadingList.map((product, index)=>{
            return(
                <div className='w-full min-w-[280px] md:min-w-[360px] max-w-[280px] md:max-w-[360px] bg-white rounded-sm shadow'>
                   <div className='bg-slate-200 h-44 p-2 min-w-[180px] md:min-w-[145px] flex items-center justify-center animate-pulse' >
                  </div>
                  <div className='p-4 grid w-full gap-2'>
                     <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse p-1  py-2 rounded-full'></h2>
                     <p className='capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full py-2'></p>
                     <div className='flex gap-3'>
                        <p className='text-red-600 font-medium bg-slate-200 w-full animate-pulse p-1 rounded-full py-2'></p>
                        <p className='text-slate-500 line-through bg-slate-200 w-full animate-pulse p-1 rounded-full py-2'></p>
                    </div>
                    <button className='text-white px-2 text-sm rounded-full w-full bg-slate-200 animate-pulse py-2'></button>
                  </div>
                </div>
            )
            })
        ) : (

          data.map((product, index)=>{
            return(
              <Link to={"/product/"+product?._id}   className='w-full min-w-[280px] md:min-w-[360px] max-w-[280px] md:max-w-[360px] bg-white rounded-sm shadow'>
                   <div className='bg-slate-200 p-2 h-44 min-w-[180px] md:min-w-[145px] flex items-center justify-center' >
                    <img src={product.ProductImage[0]} className='object-scale-down h-full hover:scale-110 mix-blend-multiply transition-all'/>
                  </div>
                  <div className='p-4 grid gap-3'>
                     <h2 className='font-semibold text-base md:text-lg text-ellipsis line-clamp-1'>{product?.ProductName}</h2>
                     <p className='capitalize text-slate-500'>{product?.Category}</p>
                     <div className='flex gap-3'>
                        <p className='text-red-600 font-medium'>{DisplayINRCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-500 line-through'>{DisplayINRCurrency(product?.Price)}</p>
                    </div>
                    <button className='bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 text-lg rounded-full'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                  </div>
                </Link>
            )
            })
        )
        }
      </div>
      
    </div>
  )
}

export default VerticalCardProduct
