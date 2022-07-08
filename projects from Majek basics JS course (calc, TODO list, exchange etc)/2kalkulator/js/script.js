const price = document.querySelector('#price')
const people = document.querySelector('#people')
const tip = document.querySelector('#tip')
const error = document.querySelector('.error')
const tipSpan = document.querySelector('.cost')
const tipText = document.querySelector('.cost-info')
const button = document.querySelector('.count')


showBill =()=>{
    if(price.value == null || people.value == null || tip.value == 0){
        error.textContent= 'Uzupełnij wszystkie pola!'
        tipText.style.display = "none"
    } else{
        error.textContent=''
        countBill()
    }
}
const countBill = () => {
    const newPrice = parseFloat(price.value)
    const newPeople = parseInt(people.value)
    const newTip = parseFloat(tip.value)

    const bill = (newPrice+newPrice*newTip)/newPeople
    tipText.style.display = "block"
    tipSpan.textContent = bill.toFixed(2)
    console.log(bill);
}
button.addEventListener('click', showBill)

