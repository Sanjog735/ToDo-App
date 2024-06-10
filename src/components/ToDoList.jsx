import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  sortTodo,
  updateTodo,
  toggleCompleted,
} from "../store/slices/TodoSlice";

import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import empty from "../assets/empty.gif";

const ToDoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) =>
    state.todo.todoList.slice().reverse()
  );
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  //input value is newTask
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todolist", JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todolist"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddToDo = (task) => {
    if (task.trim().length === 0) {
      alert("Please Enter a Task");
      setShowModal(true);
    } else {
      dispatch(
        addTodo({
          task: task,
          id: Date.now(),
        })
      );
      setNewTask("");
      setShowModal(false);
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddToDo(newTask);
    }
  };

  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todolist", JSON.stringify(updatedToDoList));
  };

  const handleUpdateToDo = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please Enter a Task");
      setShowModal(true);
    } else {
      dispatch(updateTodo({ task: task, id: id }));

      setShowModal(false);
    }
  };

  const handleSort = (sortCriteria) => {
    dispatch(sortTodo(sortCriteria));
  };

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;

    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      {showModal && (
        <div className=" fixed z-20 w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
          <div className=" bg-white p-8 rounded-md">
            <input
              type="text"
              onKeyDown={handleEnterKeyPress}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className=" border-2 p-2 rounded-md outline-none mb-8"
              placeholder={
                currentTodo ? "Update your task here" : "Enter your task here"
              }
            />
            <div className=" flex justify-between">
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateToDo(currentTodo.id, newTask);
                    }}
                    className=" bg-greenTeal rounded-md px-10 py-3 text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className=" bg-Tangaroa rounded-md text-white px-10 py-3"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className=" bg-Tangaroa rounded-md text-white px-10 py-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className=" bg-sunsetOragne rounded-md text-white px-10 py-3"
                    onClick={() => {
                      setShowModal(false);
                      handleAddToDo(newTask);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center  ">
        {todoList.length === 0 ? (
          <>
            <div className="mb-8">
              <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
                <img src={empty} alt="Empty" />
              </div>
              <p className=" text-center text-Gray">
                You have no todo's, please add one.
              </p>
            </div>
          </>
        ) : (
          <div className=" container mx-auto mt-6">
            <div className=" flex justify-center mb-6">
              <select
                className="p-1 outline-none"
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="All" className=" text-sm">
                  All
                </option>
                <option value="Completed" className=" text-sm">
                  Completed
                </option>
                <option value="Not Completed" className=" text-sm">
                  Not Completed
                </option>
              </select>
            </div>
            <div>
              {sortToDoList.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between  mb-4 w-full md:w-[75%]  bg-Tangaroa rounded-md p-4 mx-auto text-white ${
                    todo.completed
                      ? "text-black bg-greenTeal line-through "
                      : ""
                  }`}
                >
                  <div
                    className=" cursor-grab"
                    onClick={() => handleToggleCompleted(todo.id)}
                  >
                    {todo.task}
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setCurrentTodo(todo);
                        setNewTask(todo.task);
                      }}
                      className=" bg-blue-500 p-1 rounded-md ml-2"
                    >
                      <TiPencil />
                    </button>
                    <button
                      onClick={() => handleDeleteToDo(todo.id)}
                      className=" bg-sunsetOragne p-1 rounded-md ml-2"
                    >
                      <BsTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          className="group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-sunsetOragne px-10 py-3 text-neutral-50"
        >
          <span className="relative z-10">Add Task</span>
          <span className="absolute inset-0 overflow-hidden rounded-md">
            <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-neutral-950 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
