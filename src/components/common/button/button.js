import React from "react";

export default function Button({
  onclick = () => {},
  width = "100%",
  children = "Tweet",
  style,
  disabled = false,
}) {
  return (
    <button
      className={`btn-primary`}
      onClick={onclick}
      style={style}
      disabled={disabled}
    >
      {children}

      <style jsx>{`
        .btn-primary {
          color: white;
          background-color: var(--primary-color);
          border-radius: 100000px;
          border: none;
          width: ${width};
          padding-block: 1rem;
          font-size: 1rem;
          font-weight: 700;
        }

        .btn-primary:hover {
          background-color: var(--hover-bg-color);
        }

        .btn-primary:disabled {
          background-color: var(--hover-primary-trans-color);
        }
      `}</style>
    </button>
  );
}
