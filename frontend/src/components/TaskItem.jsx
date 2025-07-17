import React from "react";
import api from "../services/api";

const TaskItem = ({ task, refresh }) => {
  const toggleComplete = async () => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
          className="mr-3"
        />
        <span
          className={
            task.completed ? "line-through text-gray-500" : "text-black"
          }
        >
          {task.title}
        </span>
      </div>
      <button onClick={deleteTask} className="text-red-500 hover:text-red-700">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
