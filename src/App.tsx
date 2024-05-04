import { useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/todos";
import AddTodoForm from "./components/AddTodoForm";

export default function App() {
  const [todos, setTodos] = useState(dummyData);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>               //!todo.completed es el valor opuesto de el valor inicial de completed
                                          //entonces si sabemos que es false, pasara a true  !todo.completed
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }

  function addTodoForm(title: string){
    //prevTodos representa el estado anterior de todos
    setTodos(prevTodos => [
      {
        id: prevTodos.length +1,
        title,
       completed: false
      },
      ...prevTodos  //colocar los demas todos, sino se agrega esto, se borran y solo aparece el todo mas reciente

    ])
  }

  function deleteTodo(id: number){
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id) )
  }
  return (
    <main className="py-10 bg-red-50 space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
     
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5">
      <AddTodoForm onSubmit={addTodoForm}></AddTodoForm>
        <div className="space-y-2">
          {todos.length === 0 ? "No tasks" :todos.map((todo) => (
           
            <TodoItem
              onDelete={deleteTodo}
              key={todo.id}
              todo={todo}
              onCompletedChange={setTodoCompleted}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
