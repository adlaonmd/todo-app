import { useState, useEffect } from 'react';
import './App.css';
import './Tasks';
import Tasks from './Tasks';

function App() {
  function usePersistentState(defaultValue, key) {
    const [value, setValue] = useState(() => {
      const persistentValue = window.localStorage.getItem(key);
      return persistentValue !== null
        ? JSON.parse(persistentValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const [tasks, setTasks] = usePersistentState([]);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    document.querySelector("#task-form").reset();
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const new_task = e.target.querySelector("#new-task");

    if (new_task.value !== "") {
      setTasks(tasks => ([...tasks, { title: new_task.value, id: Date.now() }]));
      setShowError(false);
    }
    else setShowError(true);
  }

  const deleteItem = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div className="App">
      <h1 className="title">To-Do App</h1>
      <h2 className="subtitle">using ReactJS</h2>
      { tasks.length === 0 ? <p className="no-task">You have no task/s</p> : <Tasks tasks={ tasks } deleteItem={ deleteItem }/> }
      <form id="task-form"onSubmit={handleSubmit}>
        <input id="new-task" type="text" placeholder="What are you going to do today?"></input>
        <button id="add-task">Add task</button>
        <p className={`${showError ? "error-visible" : "error-hidden"} error-message`}>Field cannot be empty!</p>
      </form>
      <footer>
        <small>Copyright { new Date().getFullYear() } | <a href="https://facebook.com/adlaonmde" target="blank">MD Adlaon</a></small>
      </footer>
    </div>
  );
}

export default App;
