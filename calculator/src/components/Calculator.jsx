import React, { useState } from "react";
import "../styles/Calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("");

  const keys = [
    { id: 1, label: "+" },
    { id: 2, label: "7" },
    { id: 3, label: "8" },
    { id: 4, label: "9" },
    { id: 5, label: "-" },
    { id: 6, label: "4" },
    { id: 7, label: "5" },
    { id: 8, label: "6" },
    { id: 9, label: "/" },
    { id: 10, label: "1" },
    { id: 11, label: "2" },
    { id: 12, label: "3" },
    { id: 13, label: "*" },
    { id: 14, label: "." },
    { id: 15, label: "0" },
    { id: 16, label: "=" },
    { id: 17, label: "C" },
  ];
  const operators = ["+", "-", "*", "/", "C"];
  const isOperator = (ch) => ["+", "-", "*", "/"].includes(ch);

  const safeEvaluate = (expr) => {
    // Only allow digits, operators, parentheses and dots
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) throw new Error("Invalid characters");
    // Quick safety: disallow sequences like "++" or "--" etc (shouldn't occur but double-check)
    if (/[+\-*/]{2,}/.test(expr.replace(/\s+/g, "")))
      throw new Error("Invalid operator sequence");
    // Use Function after validation; safer than raw eval but still treat carefully
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${expr})`)();
  };

  const handleKeys = (label) => {
    if (label === "C") {
      setDisplay("");
      return;
    }

    if (label === "=") {
      try {
        const result = safeEvaluate(display || "0");
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    // If previously errored, start new input only when user types number or dot
    if (display === "Error") {
      if (/[0-9.]/.test(label)) {
        setDisplay(label);
      }
      return;
    }

    const lastChar = display.slice(-1);

    // Prevent starting with an operator (allow leading "-" for negative numbers)
    if (display === "" && isOperator(label) && label !== "-") return;

    // Prevent consecutive operators
    if (isOperator(label) && isOperator(lastChar)) {
      // allow replacing the last operator with the new one (UX choice)
      setDisplay((prev) => prev.slice(0, -1) + label);
      return;
    }

    // Prevent multiple dots in the same number
    if (label === ".") {
      const lastNumber = display.split(/[\+\-\*\/]/).pop() || "";
      if (lastNumber.includes(".")) return;
      // if display is empty and user presses ".", prepend "0"
      if (display === "" || isOperator(lastChar)) {
        setDisplay((prev) => prev + "0.");
        return;
      }
    }

    setDisplay((prev) => prev + label);
  };

  return (
    <div className="calculator" role="application" aria-label="calculator">
      <input type="text" readOnly aria-readonly value={display} />
      <div className="keys">
        {keys.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleKeys(label)}
            className={operators.includes(label) ? "operators" : ""}
            aria-label={`key-${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
