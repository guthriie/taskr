import React from "react";

const headers = [
  {
    id: "completed",
    title: "✓"
  },
  {
    id: "id",
    title: "ID"
  },
  {
    id: "title",
    title: "Task"
  }
];

const TaskList = ({ tasks,  setFilter, updateCompleted }) => (
  <table>
    <thead>
      <tr>
        {headers.map(header => (
          <th
            key={header.id} 
            id={header.id}
            className="taskList__filterHeader"
            onClick={setFilter}>
            {header.title}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <tr key={task.id}>
          <td>
            <input
              id={task.id}
              onChange={updateCompleted}
              checked={task.completed}
              type="checkbox"
            />
          </td>
          <td>{task.id}</td>
          <td>{task.title}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TaskList;
