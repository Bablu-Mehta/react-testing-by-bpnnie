import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
      <button
        className={buttonColor}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {newButtonColor}
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
