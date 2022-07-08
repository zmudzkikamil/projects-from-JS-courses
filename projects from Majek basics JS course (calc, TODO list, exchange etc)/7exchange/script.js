const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const amountOne = document.querySelector('.amount-one')
const amountTwo = document.querySelector('.amount-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

const myHeaders = new Headers()
myHeaders.append('apikey', 'FZNLn0wSAkFyPjCsWflPq0Is5dHOAVjy')

const requestOptions = {
	method: 'GET',
	redirect: 'follow',
	headers: myHeaders,
}

const calculate = () => {
	const URL = `https://api.apilayer.com/exchangerates_data/convert?to=${currencyTwo.value}&from=${currencyOne.value}&amount=${amountOne.value}`
	fetch(URL, requestOptions)
		.then(res => res.json())
		.then(res => {
			amountTwo.value = res.result.toFixed(3)
			rateInfo.textContent = `1 ${currencyOne.value} = ${(res.result / amountOne.value).toFixed(3)} ${currencyTwo.value}`
		})
}
const swapCurrency = () => {
	let currOne = currencyOne.value
	currencyOne.value = currencyTwo.value
	currencyTwo.value = currOne
}

swapBtn.addEventListener('click', swapCurrency)
document.addEventListener('DOMContentLoad', calculate)
currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)

 