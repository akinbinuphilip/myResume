//  ?  select our form
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todosListEl = document.getElementById("todos-list");
const notification_ele = document.querySelector(".notification");

// our todo
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let edit_todo_id = -1;

// 1st render
rendertodos();

// ?  The form sumbit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  savetodos();
  rendertodos();
  localStorage.setItem("todos", JSON.stringify(todos));
});

// ? saves the todo
function savetodos() {
  const isEmpty = todoInput.value === "";
  // const todoValue = todoInput.value

  // check for duplicate
  const isDuplicate = todos.some(
    (todo) => todo.value.toUpperCase() === todoInput.value.toUpperCase()
  );

  if (isEmpty) {
    show_notification("write a todo...");
  } else if (isDuplicate) {
    show_notification("You have tabbed that todo");
  } else {
    if (edit_todo_id >= 0) {
      // UPDATE THE EDIT
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === edit_todo_id ? todoInput.value : todo.value,
      }));
      edit_todo_id = -1;
    } else {
      todos.push({
        value: todoInput.value,
        cheked: false,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      });
    }

    todoInput.value = "";
  }
}

// console.log(todos);
function rendertodos() {
  if (todos.length === 0) {
    console.log(todosListEl);
    todosListEl.innerHTML = `<center> Nothing to do </center>`;
    return;
  }
  // CLEAR ELEMENT BEFORE A RE-RENDER
  todosListEl.innerHTML = "";

  // RENDER TODOS
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
        <div class="todo" id="${index}">
                <i 
                class="bi ${
                  todo.cheked ? `bi-check-circle-fill` : `bi-circle`
                } "
                style="color : ${todo.color}"
                data-action="check"
                ></i>
                <p class="" data-action="check" >${todo.value}</p>
                <i class="bi bi-pencil-square" data-action="edit" ></i>
                <i class="bi bi-trash" data-action="delete" ></i>
            </div>
        `;
  });
}

// ! CLICK EVENT LISTENER FOR THE TODOS

todosListEl.addEventListener("click", (event) => {
  const target = event.target;
  const parentElement = target.parentNode;
  if (parentElement.className !== "todo") return;

  // t o d o id
  const todo = parentElement;
  const todo_Id = Number(todo.id);

  // target action
  const action = target.dataset.action;
  action === "check" && check_todo(todo_Id);
  action === "edit" && editTodo(todo_Id);
  action === "delete" && deletetodo(todo_Id);

  // console.log(todo_Id, action);
});

function check_todo(todo_Id) {
  todos = todos.map((todo, index) => ({
    ...todo,
    cheked: index === todo_Id ? !todo.cheked : todo.cheked,
  }));
  rendertodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

// EDIT A TODO
function editTodo(todo_Id) {
  todoInput.value = todos[todo_Id].value;
  edit_todo_id = todo_Id;
}

function deletetodo(todo_Id) {
  todos = todos.filter((todo, index) => index !== todo_Id);
  edit_todo_id = -1;
  // re-render
  rendertodos();
  localStorage.setItem("todos", JSON.stringify(todos));
}

//  SHOW A NOTIFIATIOBN
function show_notification(msg) {
  //CHANGE THE MESSAGE
  notification_ele.innerHTML = msg;
  // NOTIFICATION ENTER

  notification_ele.classList.add("notif-enter");

  // NOTIFICATION REMOVE
  setTimeout(() => {
    notification_ele.classList.remove("notif-enter");
  }, 2000);
}
