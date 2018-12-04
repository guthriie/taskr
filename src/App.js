import React, { Component } from "react";

const restfulAPI = "https://jsonplaceholder.typicode.com/todos";

class App extends Component {
  constructor(props) {
    this.state = { filter: "id", tasks: [] };
  }

  getTasks = () => {
    fetch(`${restfulAPI}`)
      .then(response => response.json())
      .then(tasks => this.setState({ tasks }));
  };

  uncompleteTask = id => {
    fetch(`${restfulAPI}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: false
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
          newTasks.push(
            json.id === this.state.tasks[i].id
              ? { ...this.state.tasks[i], completed: false }
              : this.state.tasks[i]
          );
        }
        this.setState({
          tasks: newTasks
        });
      });
  };

  completeTask = id => {
    fetch(`${restfulAPI}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: true
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        const newTasks = [];
        for (let i = 0; i < this.tasks.length; i++) {
          newTasks.push(
            json.id === this.state.tasks[i].id
              ? { ...this.state.tasks[i], completed: false }
              : this.state.tasks[i]
          );
        }
        this.setState({
          tasks: newTasks
        });
      });
  };

  getSortedTasks = () => {
    return this.state.tasks.sort((a, b) => {
      if (this.state.filter === "id") {
        return a.id > b.id ? 1 : -1;
      }

      if (this.state.filter === "completed") {
        return a.completed ? -1 : 1;
      }

      if (this.state.filter === "title") return 1;
    });
  };

  setFilterCompleted() {
    this.setState({ filter: "completed" });
  }

  setFilterId() {
    this.setState({ filter: "id" });
  }

  setFilterTitle() {
    this.setState({ filter: "title" });
  }

  addTask = () => {
    const task = document.getElementById("newTask").value;
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: task,
        userId: 1,
        completed: false
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ tasks: this.state.tasks.concat(json) }));
  };

  render() {
    this.getTasks();
    const tasks = this.getSortedTasks();

    return (
      <div className="main">
        <div>
          Add Task: <input id="newTask" />
          <button onClick={this.addTask}>Add</button>
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={this.setFilterCompleted}>✓</th>
              <th onClick={this.setFilterId}>ID</th>
              <th onClick={this.setFilterTitle}>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr>
                <td>
                  {task.completed ? (
                    <input
                      onChange={this.uncompleteTask}
                      checked
                      type="checkbox"
                    />
                  ) : (
                    <input type="checkbox" onChange={this.completeTask} />
                  )}
                </td>
                <td>{task.id}</td>
                <td>{task.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
