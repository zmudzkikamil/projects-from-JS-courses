const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

const inputArr = [username, pass, pass2, email]

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')
	errorMsg.textContent = msg
	formBox.classList.add('error')
}
const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		// stringBefore = input.previousElementSibling.textContent
		// stringAfter = stringBefore.slice(0,-1)
		showError(input, `${input.previousElementSibling.textContent.slice(0, -1)} składa się z min. ${min} znaków.`)
	}
}
const checkPassword = (password1, password2) => {
	if (password1.value !== password2.value) {
		showError(password2, 'hasła nie są takie same.')
	}
}
const checkEmail = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'e-mail jest niepoprawny')
	}
}
const checkErrors = input => {
	const inputParent = input.map(el => el.parentElement)
	// const containsError = inputParent.some(el => el.classList.contains('error'))
	// if (containsError == false) {
	// 	popup.classList.add('show-popup')
	// }
	for (let i = 0; i < inputParent.length; i++) {
		if(inputParent[i].classList.contains('error')){break}
		else if(inputParent.length -1 === i){
			popup.classList.add('show-popup')
		}
	}
}
sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm(inputArr)
	checkLength(username, 3)
	checkLength(pass, 8)
	checkPassword(pass, pass2)
	checkEmail(email)
	checkErrors(inputArr)
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()

	inputArr.forEach(el => {
		el.value = ''
		clearError(el)
	})
})
