import { useState } from "react";
import "./App.css";

function App() {
  const [appear, setAppear] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      title: "title 1",
    },
    {
      id: "2",
      title: "title 2",
    },
    {
      id: "3",
      title: "title 3",
    },
    {
      id: "4",
      title: "title 4",
    },
  ]);

  const toggleDisplay = () => {
    setAppear(!appear);
  };

  const initialData = {
    title: "",
  }

  const [ formData, setFormData ] = useState({
    ...initialData
  })

  const inputHandler = (e) => {
    setFormData({
      ...formData,
    [e.target.name]: e.target.value,
    })
  }

  const addTask = () => {
    if(selectedIndex === -1){
      setTodoList([
        ...todoList,
        {
          id: (new Date()).toString(),
          ...formData
        }
      ]);
    }else{
      const tempTodoList = [...todoList];
      tempTodoList[selectedIndex] = {...formData};
      setTodoList(tempTodoList);
    }
    setFormData({...initialData});
    setSelectedIndex(-1);
    toggleDisplay(false)
  }

  const editTask = (id) => {
    console.log(id);
    const selectData = todoList.findIndex( v => v.id === id );
    setSelectedIndex(selectData);
    setFormData({
      ...todoList[selectData]
    })
    toggleDisplay(true)
  }

  const deleteTask = (id) => {
    console.log(id);
    setTodoList(todoList.filter((v) => v.id !== id));
  }

  return (
    <>
      <section className="todo-section">
        <div className="cointainer">
          <div className="logo">
            <div className="header">Todo List</div>
            <div>
              <button onClick={toggleDisplay}>Add Task</button>
            </div>
          </div>
          <div>
            <input type="text" name="search" placeholder="Search here..." />
            <button>Search</button>
          </div>
          <div className={`add-dialog dialog ${!appear ? "hide" : ""}`}>
            <div className="backdrop" onClick={toggleDisplay}></div>
            <div className="todo-card">
              <div>Add Task</div>
              <div className="input-box">
                <input type="text" name="title" placeholder="task......" onChange={inputHandler} />
              </div>
              <div className="checkbox">
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Todo</label>
                </div>
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Progress</label>
                </div>
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Done</label>
                </div>
              </div>
              <div>
                <button onClick={addTask}>Save</button>
                <button onClick={toggleDisplay}>Cancel</button>
              </div>
            </div>
          </div>

          <div className="content-box">
            {todoList.map((v, key) => (
              <div key={key} className="todo-content">
                <div>{v.title}</div>
                <div className="checkbox">
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Todo</label>
                </div>
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Progress</label>
                </div>
                <div>
                  <input type="radio" name="checkbox" />
                  <label>Done</label>
                </div>
              </div>
                {/* <select name="dropdown" id="dropdown">
                  <option name="todo" value="todo">Todo</option>
                  <option name="progress" value="progress">Progress</option>
                  <option name="done" value="done">Done</option>
                </select> */}
                <div>
                  <button onClick={() => editTask(v.id)}>Edit</button>
                  <button onClick={() => deleteTask(v.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
