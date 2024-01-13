document.querySelector("button").addEventListener("click",(event)=>{
    const input=document.querySelectorAll(".input")
    const values= [];
    let check=true;

    for(let i=0;i<=input.length-1;i++)
    {   
        if(input[i].value==='' || isNaN(input[i].value))
        {
            check=false;
            break;
        }
        values.push(input[i].value)
    }
    if(check===false) alert("Invalid Input")
    else{
        const intArray=values.map(i=>parseFloat(i))
        GetPrediction(intArray)
    }
})
const GetPrediction= async(values)=>{
    const obj={PreviousTemp:values}
    const response=await fetch('http://localhost:4350/predict',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(obj)
    })
    const jsonResponse = await response.json();
    let data=jsonResponse.prediction;

    const ul = document.querySelector('ul');
    ul.innerHTML = '';
    for(let i=0;i<=data.length-1;i++)
    {
        let list = document.createElement("li")
        list.textContent=data[i].toFixed(2)
        document.querySelector("ul").appendChild(list)
    }
}