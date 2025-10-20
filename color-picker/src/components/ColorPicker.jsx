import { useState } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff");

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="container">
      <input type="color" value={color} onChange={handleColorChange} />
      <p>{color}</p>
    </div>
  );
};

export default ColorPicker;
