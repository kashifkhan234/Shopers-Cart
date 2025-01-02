const { default: SummryApi } = require("../Commen")


const fetchCategoryWiseProduct = async(Category) =>{
    const response = await fetch(SummryApi.categoryWiseProduct.url,{
        method : SummryApi.categoryWiseProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            Category : Category
        })
    })
    const dataResponse =await response.json()
    return dataResponse
}
export default fetchCategoryWiseProduct