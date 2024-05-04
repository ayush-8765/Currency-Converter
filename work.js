const api="d5fadb49cfc226b5fdd3da54"
const dropdowns = document.querySelectorAll(".drop select")
let btn=document.querySelector(".butt")
let froCur=document.querySelector(".from select")
let toCur=document.querySelector(".to select")
const texts=document.querySelector(".text")
for(let select of dropdowns){
    for(code in country){
        let newOpt=document.createElement("option");
         newOpt.innerText=code;
         newOpt.value=code;
         if(select.name==="from"&& code==="INR"){
               newOpt.selected="selected"
         }
         else if
             (select.name==="to"&& code==="USD")
               newOpt.selected="selected"
          
    select.append(newOpt);
 }
 select.addEventListener("change",(evt)=>{
    update(evt.target)
 })
}

const  update=(element)=>{
let code=element.value
let countryCode=country[code]
let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
let img=element.parentElement.querySelector("img")
img.src=newSrc;

}
let changeIcon=document.querySelector(".drop i")
changeIcon.addEventListener("click",()=>{
    let temp=froCur.value
    froCur.value=toCur.value
    toCur.value=temp
    update(froCur)
    update(toCur)
    rate()
})
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    rate()
})
    function rate(){
    let amount=document.querySelector("input")
    let amtVal=amount.value
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1"
    }
    texts.innerText="Getting exchange rate..."
    const URL=` https://v6.exchangerate-api.com/v6/${api}/latest/${froCur.value}`
   fetch(URL).then(response=>(response.json()).then(result=>{
      let exchange=result.conversion_rates[toCur.value]
      let converted=(amtVal*exchange.toFixed(2))
      texts.innerText=`${amtVal}${froCur.value}=${converted}${toCur.value}`
   })).catch(()=>{
    texts.innerText="Something went wrong"
   })
}