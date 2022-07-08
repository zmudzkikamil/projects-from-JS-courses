const input = document.querySelector('input')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')
const ball = document.querySelector('.ball-img img')
const answers = ['nie', 'tak', 'może', 'ciężko powiedzieć']
const checkEnter = e => {
	if (e.key === 'Enter') {
		shakeBall()
	}
}
const shakeBall = () => {
    ball.classList.add('shake-animation')
    setTimeout(askQuestion, 1000);
    
}
const askQuestion = () => {
	if (input.value === '') {
		input.parentElement.classList.add('error')
		error.textContent = 'nie zadałeś pytania'
		answer.textContent = ''
	} else if (input.value.endsWith('?') && input.value.toLowerCase().startsWith('czy')) {
        input.parentElement.classList.add('answer')
		input.parentElement.classList.remove('error')
		error.textContent = ''
		answer.innerHTML=`<span>Odpowiedź:</span> ${answers[Math.floor(Math.random() * answers.length)]}`
	} else {
		input.parentElement.classList.add('error')
		error.textContent = 'pytanie musi kończyć się znakiem zapytania i zaczynać słowem "czy" '
		answer.textContent = ''
	}
    ball.classList.remove('shake-animation')
}
input.addEventListener('keyup', checkEnter)
ball.addEventListener('click', shakeBall)
