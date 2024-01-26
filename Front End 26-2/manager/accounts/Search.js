document.querySelector(".search").addEventListener("click",(event)=>{
    const content=document.querySelector(".text").value
    if(!content) GetAllUsers()
    else GetSpecifiedUsers(content)
})
const GetAllUsers=async()=>{
    const response=await fetch("http://localhost:4200/accounts",{
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
        Display(content.users);
    }
}
const GetSpecifiedUsers=async(search)=>{
    const response=await fetch(`http://localhost:4200/accounts/${search}`,{
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
        Display(content.users);
    }
}
const Display=(accounts)=>{
    const tableBody = document.querySelector('.list-product');
    tableBody.innerHTML = '';
    console.log(accounts)
    for(let i in accounts){
        let html=`<div class="job_card">
                    <div class="job_details">
                    <div class="img">
                        <img src="../../logo/Usericon.jpg" style="width:70px; height:70px;"></img>
                    </div>
                    <div class="text">
                        <h2>${accounts[i].username}</h2>
                        <span>${Converter(accounts[i].roles)}</span>
                    </div>
                    </div>
                    <div class="price">
                    <div>
                        <button class = "delete_button" onclick="DeleteProduct('${accounts[i]._id}')"> DELETE </button>
                        <button class = "edit_button"> EDIT </button>
                    </div>
                    </div>
                </div>`
        tableBody.innerHTML+=html
    }
    
}
const Converter=(A)=>{
    let s=""
    for(i in A){
        s+=`${i} `;
    }
    return s;
}
const DeleteProduct= async(id)=>{
    const response=await fetch("http://localhost:4200/accounts",{
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
        if(!content) GetAllUsers()
        else GetSpecifiedUsers(content)
    }
}