import { useState, useEffect } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/todos";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    //esto hace que los datos persistan, que al hacer refresh de la app, no se borren
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    //si hay mas de una tarea en el localstorage, que al refrescar la pagina, se muestre solo la tarea que queda
    //pero si no hay ni una tarea, que se muetsre la dummydata
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
  return {
    todos,
    setTodoCompleted,
    addTodoForm,
    deleteTodo,
    deleteAllCompleted,
  };
}
