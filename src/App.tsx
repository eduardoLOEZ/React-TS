import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { dummyData } from "./data/todos";
import AddTodoForm from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import { Todo } from "./types/todos";

export default function App() {
  const [todos, setTodos] = useState(() => {
    //esto hace que los datos persistan, que al hacer refresh de la app, no se borren
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  //para que los datos persistan, vamos a usar el localstorage y el useEffect para que sea lo primero
  //que se muestre al cargar la pagina, y al cargar la app, se guarden todos los todos en el
  //local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos(
      (
        prevTodos //!todo.completed es el valor opuesto de el valor inicial de completed
      ) =>
        //entonces si sabemos que es false, pasara a true  !todo.completed
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
    );
  }

  function addTodoForm(title: string) {
    //prevTodos representa el estado anterior de todos
    setTodos((prevTodos) => [
      {
        id: prevTodos.length + 1,
        title,
        completed: false,
      },
      ...prevTodos, //colocar los demas todos, sino se agrega esto, se borran y solo aparece el todo mas reciente
    ]);
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function deleteAllCompleted() {
    //da un nuevo array con los todos que su completed sea false
    //borra los que ya estan completados
    //!todo.completed significa que como por default los todos estan false, entonces
    //!todo.completed significa true, que quite todos los que estan en true
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }
  return (
    <main className="py-10 bg-red-50 space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>

      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5">
        <AddTodoForm onSubmit={addTodoForm}></AddTodoForm>
        <div className="space-y-2">
          {todos.length === 0 ? (
            <p className="text-center text-sm text-gray-500">
              No tasks yet. Add new one above
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                onDelete={deleteTodo}
                key={todo.id}
                todo={todo}
                onCompletedChange={setTodoCompleted}
              />
            ))
          )}
        </div>
        {/*se pasa como props los todos del state y la funcion para eleminar todos los completed */}
        <TodoSummary
          deleteAllCompleted={deleteAllCompleted}
          todos={todos}
        ></TodoSummary>
      </div>
    </main>
  );
}
