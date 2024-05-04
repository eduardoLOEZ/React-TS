import TodoItem from "./components/TodoItem";

import AddTodoForm from "./components/AddTodoForm";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./Hooks/useTodos";

export default function App() {
  const {
    todos,
    addTodoForm,
    setTodoCompleted,
    deleteTodo,
    deleteAllCompleted,
  } = useTodos();
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
