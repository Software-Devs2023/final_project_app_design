document.querySelector(".AccountsLink").addEventListener("click",(event)=>{
    const roles=JSON.parse(sessionStorage.getItem("Roles"))
    if(roles&&(roles.Admin||roles.Editor)) location.href='../accounts/index.html'
    else alert("You are not authorized")
})
document.querySelector(".AddProductLink").addEventListener("click",(event)=>{
    const roles=JSON.parse(sessionStorage.getItem("Roles"))
    if(roles&&(roles.Admin||roles.Editor)) location.href='../add_product/index.html'
    else alert("You are not authorized")
})