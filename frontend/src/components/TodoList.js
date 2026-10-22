import "./TodoList.css";

function TodoList({ tasks, toggleTask, deleteTask, editTask }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task._id} className="task-item">
          {/* Checkbox for completion */}
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task._id, !task.done)}
          />

          {/* Editable or static text */}
          {task.isEditing ? (
            <input
              type="text"
              value={task.title}
              onChange={(e) => editTask(task._id, e.target.value)}
              onBlur={() => editTask(task._id, task.title, true)}
              className="edit-input"
            />
          ) : (
            <span
              className={task.done ? "task-title done" : "task-title"}
              onClick={() => toggleTask(task._id, !task.done)}
            >
              {task.title}
            </span>
          )}

          {/* Show calendar date if available */}
          {task.date && (
            <span className="task-date">
              📅 {task.date}
            </span>
          )}

          {/* Action buttons */}
          <div className="task-actions">
            <button className="btn delete" onClick={() => deleteTask(task._id)}>Delete</button>
            <button className="btn edit" onClick={() => editTask(task._id, task.title, false)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
