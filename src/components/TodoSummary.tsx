import { Todo } from "../types/todos";

interface TodoSummaryProps {
  todos: Todo[];
  deleteAllCompleted: () => void;
}

export default function TodoSummary({
  todos,
  deleteAllCompleted,
}: TodoSummaryProps) {
  //este filter es para mostrar el mensaje de 1/3 todos completed
  //me retorna un nuevo completedTodos con los que han sido completados en true
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="text-center space-y-2">
      <p>
        {completedTodos.length}/{todos.length} todos
      </p>

      {completedTodos.length > 0 && (
        <button
          onClick={deleteAllCompleted}
          className="text-red-500 hover:underline text-sm font-medium"
        >
          Delete all completed
        </button>
      )}
    </div>
  );
}
