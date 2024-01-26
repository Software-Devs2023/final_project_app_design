document.querySelector("button").addEventListener("click",(event)=>{
    const username=document.querySelector(".username").value
    const password=document.querySelector(".password").value
    if(!username||!password) alert("Username or Password are empty !")
    else Login(username,password)
})
const Login=async(username,password)=>{
    const obj={
        user:username,
        pwd:password
    }
    const response=await fetch("http://localhost:4200/auth",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(obj)
    })
    
    if(response.ok)
    {
        const content=await response.json()
        console.log(content)
        sessionStorage.setItem("AccessToken",content.accessToken)
        location.href="../../main_page/index.html"
    }
    else alert("Username or Password are invalid")
}