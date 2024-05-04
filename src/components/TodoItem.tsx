import { Todo } from "../types/todos";
import { Trash } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
  onDelete: (id:number)  => void;
}

export default function TodoItem({ todo, onCompletedChange, onDelete }: TodoItemProps) {
  return (
    <div>
      <label className="flex items-center gap-2 rounded-md p-2 border-gray-400 bg-white hover:bg-slate-50">
        <input
          type="checkbox"
          checked={todo.completed}
          className="scale-125"
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
        />

        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          {todo.title}
        </span>

        <button onClick={()=> onDelete(todo.id)} className="flex items-center" >
          <Trash className="w-5 h-5" />
        </button>
      </label>
    </div>
  );
}
