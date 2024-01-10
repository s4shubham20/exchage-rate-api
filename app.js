const BASE_URL =   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";;
const dropdownSelect = document.querySelectorAll('.dropdown-list select')
const currFrom = document.querySelector('#from')
const currTo = document.querySelector('#to')
const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");
let amount = document.querySelector('.amount input');
const errorMsg = document.querySelector("#errorMsg");
for (let select of dropdownSelect) {
    for (const currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(currCode === "USD" && select.name === "from"){
            newOption.selected = true
        }else if(currCode === "INR" && select.name === "to"){
            newOption.selected = true
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        // console.log(select.value);
        genFlag(evt.target);
    });
}

const exchangeConvert = async () =>{
    let amoVal = amount.value; 
    if(amoVal == "" && amoVal < 1){
        amoVal=1;
        errorMsg.innerText = 'Please enter amount!';
        errorMsg.style.color = 'red';
        errorMsg.classList.remove('d-none');
        amount.classList.add('inputError');
    }
    else{
        errorMsg.classList.add('d-none');
        amount.classList.remove('inputError');
        const URL = `${BASE_URL}/${currFrom.value.toLowerCase()}/${currTo.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[currTo.value.toLowerCase()] * amoVal;
        msg.innerText = `${amoVal} ${currFrom.value} = ${rate.toFixed(2)} ${currTo.value}`;
    }
}

const genFlag  = (element) => {
    countryFlag = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countryFlag}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
    // console.log(src);  
} 

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    exchangeConvert();
})