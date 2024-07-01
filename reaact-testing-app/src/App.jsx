import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("medium-violet-red");
  const [disabled, setDisabled] = useState(false);
  const nextColor = buttonColor === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";
  const className = disabled ? "grey" : buttonColor;

  return (
    <div>
      <button
        className={className}
        disabled={disabled}
        onClick={() => setButtonColor(nextColor)}
      >
        Change to {nextColor}
      </button>
      <br />
      <input
        type="checkbox"
        id="disable-button=checkbox"
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e?.target?.checked)}
      />
      <label htmlFor="disable-button=checkbox">Disable Button</label>
    </div>
  );
}

export default App;
