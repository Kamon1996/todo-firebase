import React, { useEffect, useState } from "react";
import { Task } from "../Task/Task";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../..";
import { ModalTask } from "../ModalTask/ModalTask";
import "./index.scss";

export const TodoMain = () => {
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    const colRef = collection(db, "tasks");
    const docsSnap = await getDocs(colRef);
    const requestedTasks = [];
    docsSnap.forEach((res) => {
      requestedTasks.push({ ...res.data(), id: res.id });
    });
    setTasks(requestedTasks);
  };

  const createTask = async (newTask) => {
    await addDoc(collection(db, "tasks"), newTask);
    getData();
    setModal(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const [opened, setModal] = useState(false);

  return (
    <div className="todo">
      <div className="todo__header">
        <h1 className="todo__title">Todo List</h1>
        <button onClick={() => setModal(true)} className="btn btn--green">
          Add Task
        </button>
        <ModalTask
          opened={opened}
          onClose={() => setModal(false)}
          onSave={createTask}
          action="Создать"
        />
      </div>
      <div className="todo__tasks">
        {tasks.length ? tasks.map((task) => (
          <Task key={task.id} task={task} afterSave={getData} />
        )) : <div className="no-content">No Data Fount</div>}
      </div>
    </div>
  );
};
