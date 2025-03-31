class View{
  constructor(controller){
    this.controller = controller;
    this.inputField = document.querySelector('.new-todo');
    this.ulList = document.querySelector('.todo-list');
    this.checkedArrow = document.querySelector('.toggle-all');
    this.mainWrapper = document.querySelector('.main');
    this.clearCompletedButton = document.querySelector('.clear-completed');
    this.footer = document.querySelector('.footer');
    this.todoCounter = document.querySelector('.todo-count');
    this.createTodo();
    this.deleteTodo();
    this.toggleTodo();
    this.toggleAllTodo();
    this.addNoneDisplay(this.footer);
    this.addNoneDisplay(this.clearCompletedButton)
    this.clearCompleted();
    this.editTodo();
    this.todoApp = document.querySelector('.todoapp');
    this.filterUlList = document.querySelector('.filters');
    this.activeListButton = this.filterUlList.childNodes;
    this.deleteSelectedClass();
    this.renderButton();
  }

  renderTodoList(todoArr, numActiveTodo, numCompletedTodo) {
    todoArr.forEach(todo => {
      let li = document.createElement('li');
      let div = document.createElement('div');
      let input = document.createElement('input');
      let label = document.createElement('label');
      let button = document.createElement('button');
      
      li.setAttribute('data-id', todo.id);
      input.setAttribute('type','checkbox');
  
      label.textContent = todo.title;

      div.className = 'view';
      input.classList.add('toggle');
      input.checked = todo.checked;
      button.className = 'destroy';
      label.className = 'todo-text';

      this.ulList.prepend(li);
      li.append(div);
      div.append(input,label,button);
      
      if(todo.checked){
        this.addTodoClass(todo.id,'completed');
      }
    });

    this.todoCounter.innerText = `${numActiveTodo} item left`

    this.addVisibleDisplay(this.todoCounter);
    (!!numCompletedTodo) ? this.addVisibleDisplay(this.clearCompletedButton) : this.addNoneDisplay(this.clearCompletedButton)
}

  addNoneDisplay(element){
    element.style.display = 'none'
  }

  addVisibleDisplay(element){
    element.style.display = 'block'
  }
  
  resetAllUlChild() {
    while (this.ulList.firstElementChild){
      this.ulList.removeChild(this.ulList.firstElementChild)
    }
  }
  
  createTodo() {
    this.inputField.addEventListener('keydown', (e) => { 
      if(e.key === 'Enter'){
        if(this.inputField.value.trim() !== ''){
          this.controller.handlerAddTodo(this.inputField.value);
          this.inputField.value = '';
        }
      }
    })

    this.inputField.addEventListener('blur', (e) => { 
      if(this.inputField.value.trim() !== '') {
        this.controller.handlerAddTodo(this.inputField.value);
        this.inputField.value = '';}
      }
    )
  }

  deleteTodo() {
    this.ulList.addEventListener('click',(e) => {
      if(e.target.closest('.destroy')){
        let todoId = e.target.parentElement.parentElement.getAttribute('data-id');
        this.controller.handlerDeleteTodo(+todoId);
      }
    })
  }

  toggleTodo() {
    this.ulList.addEventListener('click',(e) => {
      if(e.target.closest('.toggle')){
        let toggleId = e.target.parentElement.parentElement.getAttribute('data-id');
        this.controller.handlerToggleTodo(+toggleId)
      }
    })
  }

  addTodoClass(todoId,className) {
    const todoItem = this.ulList.querySelector(`li[data-id = '${todoId}']`);
    todoItem.classList.toggle(className);
  }

  toggleAllTodo() {
    this.checkedArrow.addEventListener('click', () => {
      const state = this.checkedArrow.checked;
      this.controller.handlerToggleAllTodo(state);
    })
  }

  clearCompleted() {
    this.clearCompletedButton.addEventListener('click', (e) => {
      this.controller.handlerClearCompleted();  
    })
  }

  editTodo() {
    this.ulList.addEventListener('dblclick', (e) => {
      let li = e.target.parentElement.parentElement;
      let label = e.target
      
      if(label.tagName === 'LABEL') {
        li.firstElementChild.firstElementChild.classList.toggle('edit')
        li.classList.toggle('editing')
        const editInput = this.createEditInput(label,li);
        const blur = this.blur.bind(this);
        editInput.addEventListener('keydown', (e) => {
          if(e.key === 'Enter'){
            if(editInput.value.trim() !== ''){
              editInput.removeEventListener('blur', blur);
              this.editHelperFunction(e);
            }
          }
        })

        editInput.addEventListener('blur', blur)
      }
      
      })
    }
  
  blur(element){
    if(element.target.className === 'edit'){
      if(element.target.value.trim() !== '') {
        this.editHelperFunction(element);
      }
    }
  }

  editHelperFunction(element){
    const newText = element.target.value;
    const todoId = +element.target.parentElement.getAttribute('data-id');
    this.controller.handlerEditTodo(todoId,newText);
  }
  
  createEditInput(label,targetElement) {
    let input = document.createElement('input');
    input.className = 'edit'
    input.value = label.textContent;
    targetElement.append(input);
    input.focus();
    return input;
  }

  deleteSelectedClass(){
    const childrenFilterUlList = this.filterUlList.children;
    Array.from(childrenFilterUlList).forEach(element => element.children[0].classList.remove('selected'));
  }

  addSelectedBarClass(element){
    element.classList.add('selected')
  }

  helperRenderButton(button){
    this.controller.handlerTakeTodo();
    this.deleteSelectedClass();
    this.addSelectedBarClass(button);
  }

  startSelectedFilterPage(hashValue){
    switch(hashValue){
      case '#/':
        this.addSelectedBarClass(this.activeListButton[1].childNodes[1]);
        break;
      case '#/active':
        this.addSelectedBarClass(this.activeListButton[3].childNodes[1]);
         break;
      case '#/completed':
        this.addSelectedBarClass(this.activeListButton[5].childNodes[1]);
         break;
    }
  }

  renderButton(){
    this.filterUlList.addEventListener('click', (e) => {
      let btnElem = e.target;
      if (btnElem.tagName === 'A') {
        switch(btnElem.innerText){
          case 'All' :
            location.hash = '#/';
            this.helperRenderButton(btnElem);
            break;
          case 'Active' :
            location.hash = '#/active';
            this.helperRenderButton(btnElem);
            break;
          case 'Completed' :
            location.hash = '#/completed';
            this.helperRenderButton(btnElem);
            break;
        }
      }
    })
  }
  }

