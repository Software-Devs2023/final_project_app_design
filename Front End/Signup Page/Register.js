document.querySelector('button').addEventListener('click',(event)=>{
    const username=document.querySelector(".username").value
    const password=document.querySelector(".password").value
    if(!username || !password) alert("Username or Password are empty !")
    else Register(username,password)
})
const Register=async(username,password)=>{
    const obj={
        user:username,
        pwd:password
    }
    const response=await fetch("http://localhost:4135/register",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
    if(response.ok) location.href="../Login Page/index.html"
    else alert("Username or Password are invalid !")
}
