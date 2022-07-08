const addBtn = document.querySelector('.add')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtns = document.getElementsByClassName('delete-note')
const deleteBtn = document.querySelector('.delete-note')
const deleteAllBtn = document.querySelector('.delete-all')
const noteArea = document.querySelector('.note-area')
const notePanel = document.querySelector('.note-panel')
const category = document.querySelector('#category')
const textArea = document.querySelector('#text')
const error = document.querySelector('.error')
const note = document.querySelector('.note')
let selectedValue
let cardID = 0

const openPanel = () => {
	notePanel.style.display = 'flex'
}
const closePanel = () => {
	notePanel.style.display = 'none'
	error.style.visibility = 'hidden'
	textArea.value = ''
	category.selectedIndex = 0
}
const addNote = () => {
	if (textArea.value !== '' && category.options[category.selectedIndex].value !== '0') {
		createNote()
		error.style.visibility = 'hidden'
	} else {
		error.style.visibility = 'visible'
	}
}
const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text
	console.log(selectedValue)
}
const createNote = () => {
	const newNote = note.cloneNode(true)
	const newNoteTitle = newNote.querySelector('h3')
	const newNoteContent = newNote.querySelector('.note-body')
	newNoteTitle.textContent = selectedValue
	newNoteContent.textContent = textArea.value
	noteArea.append(newNote)
	cardID++
	textArea.value = ''
	category.selectedIndex = '0'
	notePanel.style.display = 'none'
	checkColor(newNote)
	deleteBtnArr = [...deleteBtns]
    deleteBtnArr.forEach(btn=>{
        btn.addEventListener('click', deleteNote)
    })
}
const checkColor = note => {
	switch (selectedValue) {
		case 'Zakupy':
			note.style.backgroundColor = 'tomato'
			break
		case 'Praca':
			note.style.backgroundColor = 'royalblue'
			break
		case 'Inne':
			note.style.backgroundColor = 'pink'
			break
	}
}
const deleteNote = (e) => {
	e.target.closest('.note').remove()
}
const deleteAllNotes = () =>{
noteArea.innerHTML=''
}

addBtn.addEventListener('click', openPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', addNote)
deleteBtn.addEventListener('click', deleteNote)
deleteAllBtn.addEventListener('click',deleteAllNotes)
let mousePosition
let offset = [0, 0]
let isDown = false

notePanel.addEventListener('mousedown', function (e) {
	isDown = true
	offset = [notePanel.offsetLeft - e.clientX, notePanel.offsetTop - e.clientY]
})

document.addEventListener('mouseup', function () {
	isDown = false
})

document.addEventListener('mousemove', function (event) {
	event.preventDefault()
	if (isDown) {
		mousePosition = {
			x: event.clientX,
			y: event.clientY,
		}
		notePanel.style.left = mousePosition.x + offset[0] + 'px'
		notePanel.style.top = mousePosition.y + offset[1] + 'px'
	}
})
