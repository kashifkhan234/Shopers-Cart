import React, { useContext, useEffect, useState } from 'react'
import SummryApi from '../Commen'
import Context from '../context'
import DisplayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";


const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async()=>{
        const response = await fetch(SummryApi.addTocartProductViwe.url,{
            method : SummryApi.addTocartProductViwe.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            }
        })
        const ResponseData = await response.json()
        if(ResponseData.success){
            setData(ResponseData.data)
        }
    }

    const handleLoading = async()=>{
      await fetchData()
    }

    useEffect(()=>{
      setLoading(true)
      handleLoading()
      setLoading(false)
    },[])
  
const dataIncreaseQty = async(id,qty) => {
const response = await fetch(SummryApi.updateCart.url,{
  method : SummryApi.updateCart.method,
  credentials : "include",
  headers : {
    "content-type" : "application/json"
  },
  body : JSON.stringify({
    _id : id,
    quantity : qty + 1
  })
})
const ResponseData = await response.json()
if(ResponseData.success){
  fetchData()
}
}

const decreaseQty = async(id,qty)=>{
  if(qty >= 2){
    const response = await fetch(SummryApi.updateCart.url,{
      method : SummryApi.updateCart.method,
      credentials : "include",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        _id : id,
        quantity : qty - 1
      })
    })
    const ResponseData = await response.json()
    if(ResponseData.success){
      fetchData()
    }
  }
}

const deleteAddToCartProduct = async(id)=>{
  const response = await fetch(SummryApi.deleteProductAddToCart.url,{
    method : SummryApi.deleteProductAddToCart.method,
    credentials : "include",
    headers : {
      "content-type" : "application/json"
    },
    body : JSON.stringify({
      _id : id,
    })
  })
  const ResponseData = await response.json()
  if(ResponseData.success){
    fetchData()
    context.fetchAddToCartProduct()
  }
}
const totatQuantity = data.reduce((previousValue, currentValue)=>previousValue + currentValue.quantity,0)
const totalPrice = data.reduce((preve, curr)=>preve + (curr.quantity * curr.productId.sellingPrice),0)
  return (
    <div className='mx-auto lg:px-16'>
      <div className='text-center text-lg my-3'>
      {
            data.length === 0 && (
                <p className='bg-white py-5'>No Data</p>
            )
        }
      </div>
    <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
    <div className='w-full max-w-3xl'>
        {
         loading ? (
          loadingCart.map((el,index) => {
            return(
              <div key={el+"Add To Cart Loading"+ index} className='bg-slate-200 w-full h-32 my-2 border border-slate-300 animate-pulse'>
           </div>
            )
          })
         ) : (
          data.map((product, index)=>{
        return(
          <div key={product?._id+"Add To Cart Loading"} className='bg-white w-full h-32 my-2 border border-slate-300 grid grid-cols-[128px,1fr]'>
            <div className='h-32 w-32 bg-slate-200'>
              <img src={product?.productId?.ProductImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
            </div>
            <div className='px-4 py-2 relative'>
              <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteAddToCartProduct(product?._id)}>
               <MdDelete/>
              </div>
              <h2 className='text-sm lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.ProductName}</h2>
              <p className='capitalize text-slate-500'>{product?.productId?.Category}</p>
                <div className='flex justify-between items-center'>
                <p className='text-red-600 md:text-lg md:font-medium'>{DisplayINRCurrency(product?.productId?.sellingPrice)}</p>
                <p className='text-slate-500 md:text-lg md:font-semibold'>{DisplayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                </div>  
              <div className='flex items-start gap-2 mt-2'>
                <button className='border border-red-600 text-red-600 w-6 h-6 flex hover:bg-red-600 hover:text-white justify-center items-start rounded' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                <span>{product?.quantity}</span>
                <button className='border border-red-600 text-red-600 w-6 h-6 flex hover:bg-red-600 hover:text-white justify-center items-start rounded' onClick={()=>dataIncreaseQty(product?._id,product?.quantity)}>+</button>
              </div>
            </div>
           </div>
        )
          })
         )
        }
      </div>
      {/*Summry */}

      <div className='mt-5 lg:mt-0 w-full max-w-sm'>
  {
        loading ? (
          <div className='bg-slate-200 h-36 border border-slate-300 animate-pulse'>
      </div>
        ) : (
          <div className='bg-white h-36'>
          <h2 className='bg-red-600 text-white px-4 py-1'>Summry</h2>
          <div className='flex justify-between items-center gap-3 px-4 text-lg text-slate-500 font-medium '> 
            <p>Quantity</p>
            <p>{totatQuantity}</p>
          </div>  
          <div className='flex justify-between items-center gap-3 px-4 text-lg text-slate-500 font-medium'>
            <p>Total Price</p>
            <p>{DisplayINRCurrency(totalPrice)}</p>
          </div>  
            <button className='text-white bg-blue-600 w-full p-2'>Payment</button> 
        </div>
        )
      }
  </div>
    </div>
    </div>
  )
}

export default Cart
