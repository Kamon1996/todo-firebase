import React, { useState } from "react";
import { db } from "../..";
import { Attachment } from "../Attachment/Attachment";
import { ModalTask } from "../ModalTask/ModalTask";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import "./index.scss";

export const Task = ({ task, afterSave }) => {
  const [opened, setOpen] = useState(false);
  const isExpired = new Date() > Date.parse(task.completeDate);

  const updateTask = async (newTask) => {
    const docRef = doc(db, "tasks", task.id);
    await setDoc(docRef, newTask);
    afterSave();
    setOpen(false);
  };

  const deleteTask = async () => {
    const docRef = doc(db, "tasks", task.id);
    await deleteDoc(docRef);
    afterSave();
  };

  const toggleCompleteTask = async () => {
    const docRef = doc(db, "tasks", task.id);
    await setDoc(docRef, { ...task, isDone: !task.isDone });
    afterSave();
  };

  return (
    <div
      className={`task ${
        task.isDone ? "task--completed" : isExpired ? "task--expired" : ""
      }`}
    >
      <div className="task__header">
        <div className="task__status">{`${
          task.isDone ? "Завершено" : "В процессе"
        }`}</div>
        <button
          onClick={toggleCompleteTask}
          className={`btn ${task.isDone ? "btn--gray" : "btn--blue"}`}
        >
          {task.isDone ? "Вернуть" : "Завершить"}
        </button>
        <button onClick={() => setOpen(true)} className="btn--orange">
          Изменить
        </button>
        <button onClick={deleteTask} className="btn--red">
          Удалить
        </button>
        <ModalTask
          opened={opened}
          onClose={() => setOpen(false)}
          onSave={updateTask}
          action="Изменить"
          task={task}
        />
      </div>
      <div className="task__body">
        <h3 className="task__title">{task.title}</h3>
        <p className="task__description">{task.description}</p>
        {task.attachments.length ? (
          <>
            <h5>Вложения</h5>
            <div className="task__attachments">
              {task.attachments.map((data) => (
                <Attachment key={data.name} data={data} />
              ))}
            </div>
          </>
        ) : null}

        <div className="task__complete-date">{`Выполнить до ${task.completeDate}`}</div>
      </div>
    </div>
  );
};
