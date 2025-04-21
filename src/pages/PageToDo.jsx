import { useEffect, useState } from "react";
import supabase from "../utils/supabase-client";

function PageToDo() {
  const [todoList, setToDoList] = useState([]);
  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    fetchToDos();
  }, []);

  // Get items from database
  const fetchToDos = async () => {
    const { data, error } = await supabase.from("ToDoList").select("*");
    if (error) {
      console.log("Error fetching data: ", error);
    } else {
      setToDoList(data);
    }
  };

  const addToDo = async () => {
    if (!newToDo.trim()) {
      console.log("Can not add empty item");
      return; // Don't add empty todos
    }

    const newTask = {
      name: newToDo,
      isCompleted: false,
    };

    // Send request
    const { error } = await supabase.from("ToDoList").insert([newTask]);

    // Handle failure
    if (error) {
      console.error("Error adding todo: ", error);
    } else {
      setNewToDo("");
      fetchToDos();
    }
  };

  // Updating task status
  const completeTask = async (id, isCompleted) => {
    const { error } = await supabase.from("ToDoList").update({ isCompleted: !isCompleted }).eq("id", id);

    if (error) {
      console.log("Error updating status: ", error);
    } else {
      const updatedToDoList = todoList.map((task) => (task.id === id ? { ...task, isCompleted: !isCompleted } : task));
      setToDoList(updatedToDoList);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    const { error } = await supabase.from("ToDoList").delete().eq("id", id);

    if (error) {
      console.log("Error deleting task: ", error);
    } else {
      setToDoList((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div>
      {" "}
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="New ToDo..." value={newToDo} onChange={(e) => setNewToDo(e.target.value)} />
        <button onClick={addToDo}>Add ToDo Item</button>
      </div>
      <ul>
        {todoList.map((task) => (
          <li key={task.id}>
            <p>{task.name}</p>
            <button
              onClick={() => {
                completeTask(task.id, task.isCompleted);
              }}
            >
              {task.isCompleted ? "Undo" : "Complete Task"}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageToDo;
