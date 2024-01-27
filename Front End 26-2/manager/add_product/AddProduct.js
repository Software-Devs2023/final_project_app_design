function UploadImage(){
    if(!document.querySelector(".name").value||!document.querySelector(".category").value||!document.querySelector(".price").value||!document.querySelector(".image").files[0]) alert("Invalid")
    else
    {
        let form=new FormData()
        let obj={
            'name':document.querySelector(".name").value,
            'category':[document.querySelector(".category").value],
            'quantity':document.querySelector(".quantity").value,
            'price':document.querySelector(".price").value
        }
        form.append("image",document.querySelector(".image").files[0])
        form.append("content",JSON.stringify(obj))
        APICall(form,obj)
    }
}
const APICall=async(form,obj)=>{
    const response=fetch("http://localhost:4200/products",{
        method:'POST',
        headers:{
            "Authorization":`Bearer ${sessionStorage.getItem("AccessToken")}`
        },
        body:form
    })
}