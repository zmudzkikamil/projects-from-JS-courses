const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const historyBtn = document.querySelector('.history')
const infoBtn = document.querySelector('.info')
const closeModalBtn = document.querySelector('.close')
const timeList = document.querySelector('.time-list')
const time = document.querySelector('.time')
const stopWatch = document.querySelector('.stopwatch')
const modalShadow = document.querySelector('.modal-shadow')

let countTime
let minutes = 0
let seconds = 0
let timesArr = []

const startTime = () => {
	countTime = setInterval(() => {
		if (seconds <= 9) {
			stopWatch.textContent = `${minutes}:0${seconds++}`
		} else if (seconds >= 10 && seconds <= 59) {
			stopWatch.textContent = `${minutes}:${seconds++}`
		} else {
			seconds = 0
			minutes++
			stopWatch.textContent = `${minutes}:${seconds++}`
		}
	}, 100)
	startBtn.disabled = true
	startBtn.classList.add('disabled')
}
const removeDisable = () => {
	startBtn.disabled = false
	startBtn.classList.remove('disabled')
}
const clearTime = () => {
	clearInterval(countTime)
	minutes = 0
	seconds = 0
	stopWatch.textContent = '0:00'
	timeList.textContent = ''
}
const pauseTime = () => {
	clearInterval(countTime)
	removeDisable()
}
const stopTime = () => {
	if (stopWatch.textContent !== `0:00`) {
		time.style.visibility = 'visible'
		time.innerHTML = `ostatni czas: ${stopWatch.textContent}`
		timesArr.push(stopWatch.textContent)
	}
	clearTime()
	removeDisable()
}
const resetTime = () => {
	timesArr = []
	time.style.visibility = 'hidden'
	clearTime()
	removeDisable()
}
const showHistory = () => {
	timeList.textContent = ''
	let num = 1
	timesArr.forEach(time => {
		const timeListItem = document.createElement('li')
		timeList.append(timeListItem)
		timeListItem.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`
		num++
	})
}
const showModal =()=>{
    modalShadow.style.display==="none"  ? modalShadow.style.display="block" : modalShadow.style.display='none'
    modalShadow.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', startTime)
pauseBtn.addEventListener('click', pauseTime)
stopBtn.addEventListener('click', stopTime)
resetBtn.addEventListener('click', resetTime)
historyBtn.addEventListener('click', showHistory)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
window.addEventListener('click', e=>e.target === modalShadow ? showModal() : false)
