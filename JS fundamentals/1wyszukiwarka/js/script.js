'use strict';
const input = document.querySelector('.search')
const drinks = document.querySelectorAll('li')
const removeLi = () => {
	drinks.forEach(drink => {
		if (drink.textContent.toLowerCase().includes(input.value.toLowerCase())) {
			drink.style.display = 'block'
		} else {
			drink.style.display = 'none'
		}
	})
}
input.addEventListener('keyup', removeLi)
