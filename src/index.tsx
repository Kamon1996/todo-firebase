import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp({
  apiKey: "AIzaSyCzCkhQ7U3T2fqRWBJdgm3ukCZA2ZV_ViQ",
  authDomain: "todo-react-9c687.firebaseapp.com",
  projectId: "todo-react-9c687",
  storageBucket: "todo-react-9c687.appspot.com",
  messagingSenderId: "491449162453",
  appId: "1:491449162453:web:83e62aa1e81fd7c1d0205c",
  measurementId: "G-Q59FM6QHT0",
});

export const db = getFirestore(app);
export const storage = getStorage(app)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
