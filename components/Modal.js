import React from "react";
import style from "../styles/modal.module.css";
import { useRouter } from "next/router";

function Modal({ children }) {
  const router = useRouter();
  return (
    <div className={style.modalMain}>
      <div className={style.modalContainer}>
        <div
          className={style.close}
          onClick={() => {
            router.replace("/");
          }}
        >
          &times;
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
