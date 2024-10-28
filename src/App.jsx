import { useState } from "react";
import "./App.css";

function App() {
  const [appear, setAppear] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      title: "title 1",
      status: "TODO",
    },
    {
      id: "2",
      title: "title 2",
      status: "PROGRESS",
    },
    {
      id: "3",
      title: "title 3",
      status: "Done",
    },
    {
      id: "4",
      title: "title 4",
      status: "TODO",
    },
    {
      id: "5",
      title: "title 5",
      status: "PROGRESS",
    },
    {
      id: "6",
      title: "title 6",
      status: "DONE",
    },
  ]);

  const toggleDisplay = () => {
    setAppear(!appear);
  };

  const initialData = {
    title: "",
    status: "TODO",  //Default Value
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

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  }

  // Filter the todoList based on searchTerm
  const filteredTodoList = todoList.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="search-box">
            <input type="text" name="search" className="search-bar" placeholder="Search here..." value={searchTerm} onChange={searchHandler} />
            <div className="search-btn">Search</div>
          </div>
          <div className={`add-dialog dialog ${!appear ? "hide" : ""}`}>
            <div className="backdrop" onClick={toggleDisplay}></div>
            <div className="todo-card">
              <div>Add Task</div>
              <div className="input-box">
                <input type="text" name="title" placeholder="task......" onChange={inputHandler} />
              </div>
              <div className="checkbox">
                <select name="status" value={formData.status} onChange={inputHandler}>
                  <option value="TODO">Todo</option>
                  <option value="PROGRESS">Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
              <div>
                <button onClick={addTask}>Save</button>
                <button onClick={toggleDisplay}>Cancel</button>
              </div>
            </div>
          </div>

          <div className="content-box">
            {filteredTodoList.map((v, key) => (
              <div key={key} className="todo-content">
                <div>{v.title}</div>
                <div>{v.status}</div>
                
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
