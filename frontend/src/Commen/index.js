
const backendDomine = " http://localhost:3001";

const SummryApi = {

    Signup : {
        url : `${backendDomine}/api/signup`,
        method : "post"
    },
    Signin :{
        url : `${backendDomine}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomine}/api/user-details`,
        method : "get"
    },
    Logout : {
        url :`${backendDomine}/api/logout`,
        method : "get"
    },
    all_users : {
        url : `${backendDomine}/api/all-users`,
        method : "get"
    },
    update_user :  {
        url : `${backendDomine}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomine}/api/upload-product`,
        method : "post"
    },
    products : {
        url : `${backendDomine}/api/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomine}/api/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomine}/api/get-CategoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomine}/api/product-category`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomine}/api/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomine}/api/addtocart`,
        method : "post"
    },
    countAddToCartProductcount : {
        url : `${backendDomine}/api/countAddToCartProduct`,
        method : "get"
    },
    addTocartProductViwe : {
        url : `${backendDomine}/api/viwe-cart-product`,
        method : "get"
    },
    updateCart : {
        url : `${backendDomine}/api/update-cart-product`,
        method : "post"
    },
    deleteProductAddToCart : {
        url : `${backendDomine}/api/delete-cart-product`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomine}/api/search`,
        method : "get"
    },
    productFilter : {
        url : `${backendDomine}/api/filter-product`,
        method : "post"
    }
   
}
export default SummryApi;