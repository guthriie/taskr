import React from "react";

const AddTask = ({ title, onClick, buttonText, value, onChange }) => (
  <div className="addTask">
    {title}: <input type="text" id="newTask" value={value} onChange={onChange} />
    <button onClick={onClick}>{buttonText}</button>
  </div>
);

export default AddTask;
