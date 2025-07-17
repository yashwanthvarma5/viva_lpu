import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskItem from "../components/TaskItem.jsx";
import api from "../services/api.js";

const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Tasks</h2>
        <button
          className="bg-red-500 text-white px-4 py-1 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow border rounded p-2"
          placeholder="Enter a new task"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} refresh={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
