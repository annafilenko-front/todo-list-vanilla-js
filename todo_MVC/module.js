class TodoList {
  constructor(controller) {
    this.controller = controller;
    this.todos = [];
    this.getTodo('todos');
  }
  
  createTodo(text) {
    const newTodo = new Todo(false, text, false);
    this.todos.push(newTodo);
    this.commitTodo(this.todos)
  }
  
  deleteTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
    this.commitTodo(this.todos);
  }
  
  toggleTodo(toggleId) {
    const toggleItem = this.todos.find(todo => todo.id === toggleId);
    
    if(toggleItem){
      toggleItem.toggle(!toggleItem.checked);
    }
    
    this.commitTodo(this.todos);
  }
  
  toggleAllTodo(state) {
    this.todos.forEach(todo => todo.toggle(state))
    this.controller.handlerRenderTodoList(this.todos)
  }
 
  clearCompleted(){
    this.todos = this.todos.filter(todo => !todo.checked);
    this.commitTodo(this.todos);
  }

  editTodo(todoId,text){
    const editItem = this.todos.find(todo => todo.id === todoId);
    editItem.newText(text);
    this.commitTodo(this.todos);
  }

  commitTodo(todoArr) {
    localStorage.setItem('todos',JSON.stringify(todoArr));
    this.controller.handlerRenderTodoList(todoArr);
  }

  getTodo(storageKey){
    const parsedTodoArr = JSON.parse(localStorage.getItem(storageKey)) || [];
    this.todos = parsedTodoArr.map(todo => new Todo(todo.id, todo.title, todo.checked))
  }

  todoListInfo(){
    this.commitTodo(this.todos);
  }
}

class Todo {
  constructor(id, title, checked){
    this.id = id || new Date().valueOf();
    this.title = title;
    this.checked = checked || false;
  }
  toggle(state){
    this.checked = state;
  }
  newText(text){
    this.title = text !== this.title ? text : this.title;
  }
}


