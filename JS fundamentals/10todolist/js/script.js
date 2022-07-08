let todoInput,
	errorInfo,
	addBtn,
	ulList,
	newTodo,
	cloneTools,
	popup,
	popupInfo,
	todoEdit,
	popupInput,
	popupAddBtn,
	popupCloseBtn,
	todoDelete
const divTools = document.querySelector('.tools')
const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}
const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
	todoDelete = document.querySelector('.delete')
}
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkBtn)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeTodoText)
	todoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.append(newTodo)
		cloneTools = divTools.cloneNode(true)
		newTodo.append(cloneTools)
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}
const checkBtn = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.delete')) {
		deleteTodo(e)
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTodo(e)
	}
}
const editTodo = e => {
	todoEdit = e.target.closest('li')
	popupInput.value = todoEdit.firstChild.textContent
	console.log(todoEdit.textContent);
	console.log(todoEdit);
	console.log(todoEdit.firstChild)
	console.log(todoEdit.firstChild.textContent)
	popup.style.display = 'flex'
}
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}
const changeTodoText = () => {
	if (popupInput.value !== '') {
		todoEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'musisz podać treść.'
	}
}
const deleteTodo = e => {
	e.target.closest('li').remove()
	const allLi=document.querySelectorAll('li')
	if (allLi.length===0){
		errorInfo.textContent='Lista zadań jest pusta.'
	}
}
const enterKeyCheck = e =>{
	if (e.key==='Enter'){
		addNewTodo()
	}
}

document.addEventListener('DOMContentLoaded', main)
