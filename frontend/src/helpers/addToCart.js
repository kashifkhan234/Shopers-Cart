import SummryApi from "../Commen"
import {toast} from 'react-toastify' 

const addToCart = async(e,id) => {
e?.stopPropagation()
e?.preventDefault()

const response = await fetch(SummryApi.addToCartProduct.url,{
    method : SummryApi.addToCartProduct.method,
    credentials : "include",
    headers : {
        "content-type" : "application/json"
    },
    body : JSON.stringify(
        {productId : id}
    )
})
const ResponseData = await response.json()
if(ResponseData.success){
    toast.success(ResponseData.message)
}
if(ResponseData.error){
    toast.error(ResponseData.message)
}
return ResponseData
}
export default addToCart