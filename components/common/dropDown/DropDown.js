import React, { useState } from "react";
import TwitterLogo from "../svg/TwitterLogo";

export default function DropDown({
  children,
  options = [],
  childWidth = "25px",
  width,
  style = { right: "0px", top: "0px" },
}) {
  // useState(initialState)
  const [display, setDisplay] = useState(false);
  TwitterLogo;
  return (
    <div
      className="dropdown"
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseLeave={() => {
        setDisplay(false);
      }}
      style={style}
    >
      <div
        style={{ display: display ? "none" : "inline-block" }}
        className="children-wrapper"
        onMouseEnter={() => {
          setDisplay(true);
        }}
      >
        {children}
      </div>
      <div className="option-wrapper" style={{ display: !display && "none" }}>
        {options.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>
      <style jsx>{`
        .dropdown {
          position: absolute;
          transition: all 0.4s ease;
          z-index: ${display ? 200 : 1};
          width: ${display ? width ?? width : "fit-content"};
        }
        .children-wrapper {
          position: relative;
          transition: all 0.4s ease;
          width: ${childWidth};
        }
        .children-wrapper > * {
          width: 100%;
          position: relative;
          right: 0;
          top: 0;
        }
        .option-wrapper {
          padding: 1rem;
          backdrop-filter: blur(4px);

          display: flex;
          flex-direction: column;
          background-color: var(--bg-op);
          border-radius: 1rem;
        }

        .option-wrapper > * {
          margin-bottom: 1rem;
           {
            /* width: 150px; */
          }
        }
      `}</style>
    </div>
  );
}
