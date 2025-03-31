
class Controller {
  constructor() {
    this.module = new TodoList(this);
    this.view = new View(this);
    this.hash = window.location.hash;
    this.initLocalStorageTodo();
  }

  initLocalStorageTodo(){
    this.module.commitTodo( this.module.todos);
    this.view.startSelectedFilterPage(this.hash);
  }

  handlerAddTodo(text) {
    this.module.createTodo(text);
  }
  
  handlerRenderTodoList(todoArr) {
    this.view.resetAllUlChild();
    
    const hashPageArr = this.filterRenderList(todoArr);
    const numActiveTodo = todoArr.filter(todo => !todo.checked).length;
    const numCompletedTodo = todoArr.filter(todo => todo.checked).length;

    this.view.renderTodoList(hashPageArr,numActiveTodo,numCompletedTodo);
    this.view.checkedArrow.checked = todoArr.length && todoArr.length === numCompletedTodo ? true : false;
    (!!todoArr.length) ? this.view.addVisibleDisplay(this.view.footer) : this.view.addNoneDisplay(this.view.footer);
  }

  handlerDeleteTodo(todoId) {
    this.module.deleteTodo(todoId);
  }

  handlerToggleTodo(toggleId) {
    this.module.toggleTodo(toggleId);
  }

  handlerToggleAllTodo(state){
    this.module.toggleAllTodo(state);
  }

  handlerClearCompleted(){
    this.module.clearCompleted();
  }

  handlerEditTodo(todoId,text) {
    this.module.editTodo(todoId,text);
  }

  filterRenderList(todoArr){
    switch(this.updateHashValue()){
      case '#/':
        return todoArr;
      case '#/active':
        return todoArr.filter(todo => !todo.checked);
      case '#/completed':
        return todoArr.filter(todo => todo.checked);
    }
  }

  updateHashValue(){
    this.hash = window.location.hash ? window.location.hash : '#/';
    return this.hash;
  }

  handlerTakeTodo(){
    this.module.todoListInfo();
  }
}