document.querySelector(".search").addEventListener("click",(event)=>{
    const content=document.querySelector(".text").value
    if(!content) GetAllProducts()
    else GetSpecifiedProducts(content)
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
        Display(content.products);
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
        console.log(content)
        Display(content.products);
    }
}
const Display=(products)=>{
    const tableBody = document.querySelector('.list-product');
    tableBody.innerHTML = '';
    console.log(products)
    for(let i in products){
        let html=`<div class="job_card">
                    <div class="job_details">
                    <div class="img">
                        <img id="Index${i}" src="./ProductImage/${products[i].image_path}" alt="First Image" style="width:70px; height:70px;"></img>
                        <img src="${products[i].img_link}" id="Index${i}_backupImage" style="display: none; width:70px; height:70px;">
                    </div>
                    <div class="text">
                        <h2>${products[i].name}</h2>
                        <span>${Converter(products[i].category)}</span>
                    </div>
                    </div>
                    <div class="price">
                    <h4>${products[i].price} </h4>
                    <span>Quantity: ${products[i].quantity}</span>
                    <div>
                        <button class = "delete_button" onclick="DeleteProduct('${products[i]._id}')"> DELETE </button>
                        <button class = "edit_button"> EDIT </button>
                    </div>
                    </div>
                </div>`
        tableBody.innerHTML+=html
        document.querySelector(`#Index${i}`).addEventListener("error",()=>{
            document.querySelector(`#Index${i}`).style.display='none'
            document.querySelector(`#Index${i}_backupImage`).style.display='flex'

        })
    }
    
}
function loadBackupImage(id){
    document.querySelector(`.${id}`).style.display='none'
    document.querySelector(`.${id}_backupImage`).style.display='flex'
}
const Converter=(A)=>{
    let s=""
    for(i in A){
        s+=`${i} `;
    }
    return s;
}
const DeleteProduct= async(id)=>{
    const roles=JSON.parse(sessionStorage.getItem("Roles"))
    if(roles&&(roles.Admin||roles.Editor)){
        const response=await fetch("http://localhost:4200/products",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("AccessToken")}`
            },
            body:JSON.stringify({id:id}) 
        })
        if(response.ok)
        {
            const content=document.querySelector(".text").value
            console.log(content)
            if(!content) GetAllProducts()
            else GetSpecifiedProducts(content)
        }
    }
    else alert("You are not authorized")
    
}