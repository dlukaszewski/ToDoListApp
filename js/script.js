let todoInput; // zmienna, gdzie użytkownik wpisuje treść
let errorInfo; // info o braku zadań / konieczności podania treści
let addBtn; // przycisk ADD dodaje nowe elementy do listy
let ulList; // lista zadań, tagi UL
let tools; //pobiera przyciski do naszego nowego todosa
let newTodo; // nowo dodane Li, nowe zadaniequerySelector

let popup; // popup do edycji istniejących zadań
let popupInfo // tekst w popupie, jak się nazywa pusty tekst
let todoEdit // edytowany Todo
let popupInput // input w popupie
let popupAddBtn // przycisk 'zatwierdz' w popupie
let popupCloseBtn // przycisk 'anuluj' w popupie


const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	//pobieramy wszystkie elementy
	todoInput = document.querySelector('.todo-input');
	errorInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	// nadajemy nasłuchiwanie
	addBtn.addEventListener('click', addNewTodo);
    ulList.addEventListener('click' , checkClick);
    popupCloseBtn.addEventListener('click' , closePopup);
    popupAddBtn.addEventListener('click' , changeTodoText);
    todoInput.addEventListener('keyup' , enterKeyCheck);
    popupInput.addEventListener('keyup' , enterKeyCheckInPopup);
};

const addNewTodo = () => {
    if (todoInput.value !== '') {
        newTodo = document.createElement('li');
		newTodo.textContent = todoInput.value;
		createToolsArea();
		
		ulList.append(newTodo);

		todoInput.value = '';
		errorInfo.textContent = '';

	} else {
		errorInfo.textContent = 'Musisz wpisać treść Zadania!';
	}
};
const createToolsArea = () => {
	const newDivTools = document.createElement('div');
	newDivTools.classList.add('tools');
	newTodo.append(newDivTools);

	const newButtonCheck = document.createElement('button');
	newButtonCheck.classList.add('complete');
	newButtonCheck.innerHTML = '<i class="fas fa-check"></i>';

	const newButtonEdit = document.createElement('button');
	newButtonEdit.classList.add('edit');
	newButtonEdit.textContent = 'EDIT';

	const newButtonDelete = document.createElement('button');
	newButtonDelete.classList.add('delete');
	newButtonDelete.innerHTML = '<i class="fas fa-times"></i>';

	newDivTools.append(newButtonCheck, newButtonEdit, newButtonDelete);

	newTodo.append(newDivTools);
};

const checkClick = e => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')){
        editTodo(e);
    } else if (e.target.matches('.delete')){
        deleteTodo(e);
    } 
}

const editTodo = (e) => {
    todoEdit = e.target.closest('li');
    popupInput.value = todoEdit.firstChild.textContent;
    console.log(popupInput);
    popup.style.display = 'flex';
}
const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = ''
}
const changeTodoText = () => {
    if (popupInput.value !== ''){
        todoEdit.firstChild.textContent = popupInput.value
        closePopup();
        
    } else {
        popupInfo.textContent = 'Musisz podać jakąś Wartość!'
    }
}
const deleteTodo = e => {
    e.target.closest('li').remove();
    const allTodos = ulList.querySelectorAll('li');
    
    
    if(allTodos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście.';
    }
}
const enterKeyCheck = e => {
    if(e.key === 'Enter'){
        addNewTodo();
    }
}
const enterKeyCheckInPopup = e => {
    if(e.key === 'Enter'){
        changeTodoText();
    }
}

document.addEventListener('DOMContentLoaded', main);
