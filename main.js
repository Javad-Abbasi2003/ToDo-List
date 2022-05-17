const input = document.getElementById('toDOInput');
const todoList = document.querySelector('.toDoList');

todoList.addEventListener('click', deleteCompleteTodo)
document.getElementById('toDoSubmit').addEventListener("click", addTodo);
document.getElementById('toDoFilter').addEventListener("click", filterTodos);
document.addEventListener("DOMContentLoaded", getTodos);

function filterTodos (event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if(event.target.value == "all") {
            todo.style.display = "flex";
        }else if (event.target.value == "Completed") {
            if(todo.classList.contains("completedToDo")) {
                todo.style.display = "flex";
            }else {
                todo.style.display = "none";
            };
        }else {
            if(todo.classList.contains("completedToDo")) {
                todo.style.display = "none";
            }else {
                todo.style.display = "flex";
            };
        };
    });
};
function deleteCompleteTodo(event) {
    let item;
    if (event.target.classList[0] === "completedI" || event.target.classList[0] === "trashI") {
        item = event.target.parentElement;
    }else if (event.target.classList[0] === "completed" || event.target.classList[0] === "trash"){
        item = event.target;
    };
    if (item.classList[0] === "completed") {
        const todoDiv = item.parentElement.parentElement;
        todoDiv.classList.toggle("completedToDo");
    } else if (item.classList[0] === "trash") {
        const todoDiv = item.parentElement.parentElement;
        todoDiv.remove();
        removeTodoLocal(todoDiv);
    };
};
function removeTodoLocal(todoDiv) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.splice(todos.indexOf(todoDiv.children[0].innerText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("toDoDiv");
        const todoP = document.createElement("p");
        todoP.classList.add("toDo");
        todoP.innerText = todo;
        todoDiv.appendChild(todoP);
    
        const buttonsDiv = document.createElement("div");
        buttonsDiv.innerHTML = '<button class="completed completeBtn"><i class="completedI fa-solid fa-check"></i></button><button class="trash trashBtn"><i class="trashI fa-solid fa-trash"></i></button>';
        todoDiv.appendChild(buttonsDiv);
        todoList.appendChild(todoDiv);
    });
};
function addTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    if(todos.indexOf(input.value) < 0) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("toDoDiv");
        const todoP = document.createElement("p");
        todoP.classList.add("toDo")
        todoP.innerText = input.value;
        todoDiv.appendChild(todoP);
        saveTodoToLocal(todoP.innerText);
        input.value = "";
    
        const buttonsDiv = document.createElement("div");
        buttonsDiv.innerHTML = '<button class="completed completeBtn"><i class="completedI fa-solid fa-check"></i></button><button class="trash trashBtn"><i class="trashI fa-solid fa-trash"></i></button>';
        todoDiv.appendChild(buttonsDiv);
        todoList.appendChild(todoDiv);
    }else{
        console.log('task exists.')
        input.value = "";
        input.placeholder = "Task Exists!!";
        setTimeout(() => {input.placeholder = "What to do next?";
        }, 1000);
    };
};
function saveTodoToLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};