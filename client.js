var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = todoList.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // // Get number of completed todos.
    // for (var i = 0; i < totalTodos; i++) {
    //   if (this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }
    
    this.todos.forEach(function(todo){
      if (todo.completed === true) {
         completedTodos++;
       }
    });
    
    
    // Case 1: If everything’s true, make everything false.
    // if (completedTodos === totalTodos) {
    //   this.todos.forEach(function(todo){
    //     todo.completed = false;
    //   })
    // // Case 2: Otherwise, make everything true.
    // } else {
    //   this.todos.forEach(function(todo){
    //     todo.completed = true;
    //   });
    // }
    
    this.todos.forEach(function(todo){
    // Case 1: If everything’s true, make everything false.
      if(completedTodos === totalTodos){
         todo.completed = false;   
         }
    // // Case 2: Otherwise, make everything true.
      else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    // var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    // todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    // toggleCompletedPositionInput.value = '';
    // view.displayTodos();
    var toggleCompletedPositionInput = event.target.parentNode.id;
    //console.log(todoList.toggleCompleted(toggleCompletedPositionInput));
    todoList.toggleCompleted(toggleCompletedPositionInput);
    toggleCompletedPositionInput.value = '';
    console.log(toggleCompletedPositionInput);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
//     for (var i = 0; i < todoList.todos.length; i++) {
//       var todoLi = document.createElement('li');
//       var todo = todoList.todos[i];
//       var todoTextWithCompletion = '';

//       if (todo.completed === true) {
//         todoTextWithCompletion = '(x) ' + todo.todoText;
//       } else {
//         todoTextWithCompletion = '( ) ' + todo.todoText;
//       }
//       todoLi.id = i;
//       todoLi.textContent = todoTextWithCompletion;
//       todoLi.appendChild(this.createDeleteButton());
//       todosUl.appendChild(todoLi);
//     }
    
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = todo.todoText;
        todoLi.classList.add('taskCompleted');
      } else {
        todoTextWithCompletion = todo.todoText;
        todoLi.classList.remove();
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createCompleteButton());
      todosUl.appendChild(todoLi);        
                           }, this);
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.className = 'deleteButton';  
    return deleteButton;
  },
  createCompleteButton: function(){
    var completeButton = document.createElement('button');
    completeButton.textContent = '✓';
    completeButton.className = 'completeButton';  
    completeButton.addEventListener('click', function() {
    });
    return completeButton;
    
  }, 
  setUpEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
      //console.log(event.target.parentNode.id);
    var elementClicked = event.target;
      if (elementClicked.className === 'deleteButton'){
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
          }
      else if(elementClicked.className === 'completeButton'){
          // handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
          handlers.toggleCompleted();
          }
});
  
  }
};

  view.setUpEventListeners();












