const incomeArea = document.querySelector('.income-area')
const expensesArea = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const deleteBtn = document.querySelector('.delete')
const cancelBtn = document.querySelector('.cancel')
const deleteAllBtn = document.querySelector('.delete-all')
const lightModeBtn = document.querySelector('.light')
const darkModeBtn = document.querySelector('.dark')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
	addTransactionPanel.style.display = 'flex'
}
const closePanel = () => {
	addTransactionPanel.style.display = 'none'
	clearInputs()
}
const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
		createNewTransaction()
	} else {
		alert('Wypełnij wszystkie pola!')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categorySelect.value = 'none'
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', ID)
	newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value} zł<button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `
	const amountInt = parseFloat(amountInput.value)
	amountInt > 0
		? incomeArea.append(newTransaction) && newTransaction.classList.add('income')
		: expensesArea.append(newTransaction) && newTransaction.classList.add('expense')
	moneyArr.push(amountInt)
	closePanel()
	ID++
	countBalance()
}

const selectCategory = transaction => {
	switch (transaction) {
		case 'income':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
			break
		case 'shopping':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
			break
		case 'food':
			categoryIcon = '<i class="fas fa-hamburger"></i>'
			break
		case 'entertainment':
			categoryIcon = '<i class="fas fa-icons"></i>'
			break
	}
}

const countBalance = () => {
	const newMoney = moneyArr.reduce((a, b) => a + b)
	availableMoney.textContent = `${newMoney} zł`
}
const deleteTransaction = id => {
	const deletedTransaction = document.getElementById(id)
	const transactionAmount = deletedTransaction.querySelector('.transaction-amount').textContent
	console.log(transactionAmount)
	const amountNum = parseFloat(transactionAmount)
	console.log(amountNum)
	const index = moneyArr.indexOf(amountNum)
	if (index > -1) {
		moneyArr.splice(index, 1)
	}
	deletedTransaction.remove()
	countBalance()
}
const deleteAllTransactions = () => {
	incomeArea.innerHTML = '<h3>Przychód:</h3>'
	expensesArea.innerHTML = '<h3>Wydatki:</h3>'
    moneyArr = [0]
    countBalance()
}
const changeBackgroundToLight = () =>{
    root.style.setProperty('--first-color', '#F9F9F9')
    root.style.setProperty('--second-color', '#14161F')
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
}
const changeBackgroundToDark = () =>{
    root.style.setProperty('--second-color', '#F9F9F9')
    root.style.setProperty('--first-color', '#14161F')
    root.style.setProperty('--border-color', 'rgb(255,255,255)')
}


addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransactions)
lightModeBtn.addEventListener('click', changeBackgroundToLight)
darkModeBtn.addEventListener('click', changeBackgroundToDark)
