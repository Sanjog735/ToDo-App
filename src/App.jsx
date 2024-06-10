import React from "react";
import Heading from "./components/Heading";
import ToDoList from "./components/ToDoList";

const App = () => {
  return (
    <div className=" font-Poppins container py-16 px-6 mx-auto min-h-screen">
      <Heading />
      <ToDoList />
    </div>
  );
};

export default App;
