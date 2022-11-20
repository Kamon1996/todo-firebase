import React, { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../..";
import { validate } from "./validation";
import "./index.scss";

const initTask = {
  title: "",
  description: "",
  isDone: false,
  completeDate: "",
  createdAt: "",
  updatedAt: "",
  attachments: [],
  errors: [],
};

export const ModalTask = ({ opened, onClose, onSave, action, task }) => {
  const [form, setForm] = useState(initTask);
  const modalWrapperRef = useRef();

  const onSaveWithValidation = (evt) => {
    evt.preventDefault();
    const errors = validate(form);
    if (Object.keys(errors).length) {
      return setForm((prev) => ({ ...prev, errors }));
    }
    const { title, description, isDone, completeDate, attachments } = form;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const task = {
      title,
      description,
      isDone,
      completeDate,
      attachments,
      createdAt,
      updatedAt,
    };
    onSave(task);
  };

  useEffect(() => {
    if (task) {
      setForm({ ...initTask, ...task });
    } else {
      setForm(initTask);
    }
  }, [opened]);

  const onClickOutside = (evt) => {
    if (evt.target === modalWrapperRef.current) {
      onClose();
    }
  };

  const onChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectFile = async (evt) => {
    const attachments = [];
    const uuid = Math.floor(Math.random() * 999999);
    await Promise.all([
      Object.values(evt.target.files).map((file) => {
        const fileRef = ref(storage, `files/${file.name}_${uuid}`);
        return uploadBytes(fileRef, file).then((snapshot) => {
          const { name, contentType } = snapshot.metadata;
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            attachments.push({ downloadURL, name, contentType });
          });
        });
      }),
    ]);
    setForm((prev) => ({ ...prev, attachments }));
  };

  if (!opened) return null;
  return (
    <div
      onMouseDown={onClickOutside}
      ref={modalWrapperRef}
      className="modal__wrapper"
    >
      <form onSubmit={onSaveWithValidation} className="modal">
        <h3 className="modal__title">Добавить Задачу</h3>
        <div className="modal__body">
          <input
            value={form.title}
            onChange={onChange}
            name="title"
            type="text"
            placeholder="title"
          />
          {form?.errors["title"] && (
            <p className="modal__error">{form?.errors["title"]}</p>
          )}
          <textarea
            value={form.description}
            onChange={onChange}
            name="description"
            placeholder="description"
          />
          <input
            required
            value={form.completeDate}
            onChange={onChange}
            name="completeDate"
            type="date"
            placeholder="set date"
          />
          {form?.errors["date"] && (
            <p className="modal__error">{form?.errors["date"]}</p>
          )}
          <input
            onChange={onSelectFile}
            name="attachments"
            type="file"
            accept="image/*, text/*"
            multiple
          />
        </div>
        <div className="modal__actions">
          <button className="btn btn--red" onClick={onClose}>
            Close
          </button>
          <button className="btn btn--green" type="submit">
            {action}
          </button>
        </div>
      </form>
    </div>
  );
};
