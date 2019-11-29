class Todo {
  private _id: number;
  private _message: string;
  private _checked: boolean;

  constructor(id: number, message: string, checked = false) {
    this._id = id;
    this._message = message;
    this._checked = checked;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

class TodoList {
  private _list: Todo[];

  constructor() {
    this._list = [];
  }

  get list() {
    return this._list
  };

  addTodo = (todo: Todo) => {
    this._list.push(todo)
  };

  checkTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    this._list[idx].checked = true;
  };

  clearCompleted = () => {
    this._list = this._list.filter(t => !t.checked)
  };

  toggleAll = () => {
    this._list = this._list.map(t => {
      t.checked = !t.checked;
      return t;
    })
  };

  uncheckTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list[idx].checked = false;
  };

  updateTodo = (todo: Todo) => {
    const idx = this._list.findIndex(t => t.id === todo.id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list[idx] = todo;
  };

  removeTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list.splice(idx, 1);
  };
}

const todoList = new TodoList();

const todo1 = new Todo(0, "발표준비하기", false);
const todo2 = new Todo(1, "코딩연습하기", false);
const todo3 = new Todo(2, "공부하기", false);

console.log(todoList.list);
console.log("\n-\n");

todoList.addTodo(todo1);
console.log(todoList.list);
console.log("\n-\n");

todoList.addTodo(todo2);
console.log(todoList.list);
console.log("\n-\n");

todoList.addTodo(todo3);
console.log(todoList.list);
console.log("\n-\n");

todoList.checkTodo(0);
console.log(todoList.list);
console.log("\n-\n");

todoList.uncheckTodo(0);
console.log(todoList.list);
console.log("\n-\n");

todoList.updateTodo(new Todo(0, '발표하기', true));
console.log(todoList.list);
console.log("\n-\n");

todoList.toggleAll();
console.log(todoList.list);
console.log("\n-\n");

todoList.clearCompleted();
console.log(todoList.list);
console.log("\n-\n");


todoList.removeTodo(0);
console.log(todoList.list);
console.log("\n-\n");

