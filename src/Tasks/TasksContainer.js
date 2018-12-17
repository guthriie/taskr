import React, { Component } from "react";
import { tasksApi } from "../api";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./tasks.css";

class TasksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      filter: "id",
      tasks: [],
      newTask: ""
    };
  }

  getTasks = () => {
    tasksApi
      .get("/")
      .then(tasks => {
        const sortedTasks = this.sortTasksByFilter(this.state.filter, tasks); 
        this.setState({ tasks: sortedTasks })
      })
      .catch(err => window.alert(`There was an error getting the tasks.\n${err}`));
  }

  addTask = () => {
    const task = this.state.newTask.trim();
    if (task.length > 0) {
      tasksApi
        .post("/", {
          title: task,
          userId: 1,
          completed: false
        })
        .then(json => {
          this.setState(prevState => {
            const { tasks } = prevState;
            // There is a server side issue here -- post always creates task with id: 201
            // I spoofed a better response here so it didn't cause issues in the UI
            const newTask = Object.assign({}, json, { id: tasks.length + 1 })
            return { tasks: tasks.concat(newTask), newTask: "" }
          })
        })
        .catch(err => window.alert(`There was an error adding the new task.\n${err}`));
    }
  }

  updateCompleted = event => {
    const { id, checked } = event.target;
    tasksApi
      .patch(`/${id}`, { completed: checked })
      .then(json => {
        this.setState((prevState) => {
          const tasks = prevState.tasks.map(task => {
            return json.id === task.id
              ? Object.assign({}, task, { completed: !task.completed })
              : task
          });
          return { tasks };
        });
      })
      // There is a server side issue here -- new tasks don't actually get saved in the database.
      // This catch will execute if you try to complete a newly created task.
      .catch(err => window.alert(`There was an error updating completed status.\n${err}`));
  }

  setFilter = event => {
    const { id: filter } = event.target;
    this.setState((prevState) => {
      return { filter, tasks: this.sortTasksByFilter(filter, prevState.tasks) };
    });
  }

  sortTasksByFilter = (filter, tasks = []) => {
    return tasks.concat().sort((a, b) => {
      switch (filter) {
        case 'completed':
          return a[filter] > b[filter] ? -1 : 1;
        case 'title':
          return a[filter].toLowerCase() > b[filter].toLowerCase()
            ? 1 : -1;
        default:
          return a[filter] > b[filter] ? 1 : -1;
      }
    });
  }

  handleValueChange = event => {
    return this.setState({
      newTask: event.target.value
    });
  }

  componentDidMount() {
    this.getTasks();
  }

  render() {
    return (
      <div className="tasks">
        <AddTask
          buttonText="Add"
          onClick={this.addTask}
          onChange={this.handleValueChange}
          title="Add Task"
          value={this.state.newTask}
        />
        { this.state.tasks.length > 0 &&
          <TaskList
            setFilter={this.setFilter}
            tasks={this.state.tasks}
            updateCompleted={this.updateCompleted}
          />
        }
      </div>
    );
  }
}

export default TasksContainer;
