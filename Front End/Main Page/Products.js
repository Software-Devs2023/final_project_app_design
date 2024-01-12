document.querySelector(".search_button").addEventListener('click',(event)=>{
    const search=document.querySelector("#search").value
    if(!search) GetAllProducts()
    else GetSpecifiedProducts(search)
})
const GetAllProducts=async()=>{
    const response=await fetch("http://localhost:4200/products",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("AccessToken")}`
        }
    })
    if(response.ok)
    {
        const content=await response.json()
        console.log(content)
        sessionStorage.setItem("Result",JSON.stringify(content.products))
        location.href="../Search Page/index.html"
    }
}
const GetSpecifiedProducts=async(search)=>{
    const response=await fetch(`http://localhost:4200/products/search/${search}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("AccessToken")}`
        }
    })
    if(response.ok)
    {
        const content=await response.json()
        console.log(content.products)
        sessionStorage.setItem("Result",JSON.stringify(content.products))
        location.href="../Search Page/index.html"
    }
}
