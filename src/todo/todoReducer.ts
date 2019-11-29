import { ActionType } from "typesafe-actions";

enum TodoActionType {
  ADD_TODO = "todo/ADD_TODO",
  REMOVE_TODO = "todo/REMOVE_TODO",
  CHECK_TODO = "todo/CHECK_TODO",
  UNCHECK_TODO = "todo/UNCHECK_TODO",
  UPDATE_TODO = "todo/UPDATE_TODO",
  CLEAR_COMPLETED = "todo/CLEAR_COMPLETED",
  TOGGLE_ALL = "todo/TOGGLE_ALL"
}

interface ITodo {
  id: number
  message: string
  checked: boolean
}

const TodoActionCreator = {
  addTodo: (message: string) => ({
    payload: {
      message
    },
    type: TodoActionType.ADD_TODO,
  }) as const,
  checkTodo: (id: number) => ({
    payload: {
      id
    },
    type: TodoActionType.CHECK_TODO
  }) as const,
  clearCompleted: () => ({
    type: TodoActionType.CLEAR_COMPLETED
  }) as const,
  removeTodo: (id: number) => ({
    payload: {
      id
    },
    type: TodoActionType.REMOVE_TODO,
  }) as const,
  toggleAll: () => ({
    type: TodoActionType.TOGGLE_ALL
  }) as const,
  uncheckTodo: (id: number) => ({
    payload: {
      id
    },
    type: TodoActionType.UNCHECK_TODO
  }) as const,
  updateTodo: (todo: ITodo) => ({
    payload: {
      todo
    },
    type: TodoActionType.UPDATE_TODO
  }) as const,
};

type TodoAction = ActionType<typeof TodoActionCreator>;

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

  apply = (action: TodoAction) => {
    const lastTodo = this._list[this._list.length - 1];
    switch (action.type) {
      case TodoActionType.ADD_TODO: {
        const id = lastTodo && lastTodo.id + 1 || 0;
        this.addTodo(new Todo(id, action.payload.message, false));
        return
      }
      case TodoActionType.CHECK_TODO: {
        this.checkTodo(action.payload.id);
        return
      }
      case TodoActionType.UNCHECK_TODO: {
        this.uncheckTodo(action.payload.id);
        return
      }
      case TodoActionType.CLEAR_COMPLETED: {
        this.clearCompleted();
        return
      }
      case TodoActionType.REMOVE_TODO: {
        this.removeTodo(action.payload.id);
        return
      }
      case TodoActionType.TOGGLE_ALL: {
        this.toggleAll();
        return
      }
      case TodoActionType.UPDATE_TODO: {
        const todo = action.payload.todo;
        this.updateTodo(new Todo(todo.id, todo.message, todo.checked));
        return
      }
    }
  };

  private addTodo = (todo: Todo) => {
    this._list.push(todo)
  };

  private checkTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    this._list[idx].checked = true;
  };

  private clearCompleted = () => {
    this._list = this._list.filter(t => !t.checked)
  };

  private toggleAll = () => {
    this._list = this._list.map(t => {
      t.checked = !t.checked;
      return t;
    })
  };

  private uncheckTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list[idx].checked = false;
  };

  private updateTodo = (todo: Todo) => {
    const idx = this._list.findIndex(t => t.id === todo.id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list[idx] = todo;
  };

  private removeTodo = (id: number) => {
    const idx = this._list.findIndex(t => t.id === id);
    if (idx < 0) {
      throw new Error("NOT FOUND")
    }
    this._list.splice(idx, 1);
  };
}

const todoList = new TodoList();

const addTodo1Action = TodoActionCreator.addTodo("발표준비하기");
const addTodo2Action = TodoActionCreator.addTodo("코딩연습하기");
const addTodo3Action = TodoActionCreator.addTodo("공부하기");
const checkTodoAction = TodoActionCreator.checkTodo(0);
const uncheckTodoAction = TodoActionCreator.uncheckTodo(0);
const updateTodoAction = TodoActionCreator.updateTodo({
  id: 0,
  message: "발표하기",
  checked: true
});
const toggleAllAction = TodoActionCreator.toggleAll();
const clearCompleteAction = TodoActionCreator.clearCompleted();
const removeTodoAction = TodoActionCreator.removeTodo(0);

console.log(todoList.list);
console.log("\n-\n");

todoList.apply(addTodo1Action);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(addTodo2Action);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(addTodo3Action);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(checkTodoAction);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(uncheckTodoAction);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(updateTodoAction);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(toggleAllAction);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(clearCompleteAction);
console.log(todoList.list);
console.log("\n-\n");

todoList.apply(removeTodoAction);
console.log(todoList.list);
console.log("\n-\n");

