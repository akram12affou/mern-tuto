
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
   
    axios.post("http://localhost:3001/createUser", {
      name,
      age,
      username,
    }).then((res) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    })
      
    
  };
  const deleteuser =(id,i) => {
    axios.delete("http://localhost:3001/deleteUser/" + id)
     
  }

  return (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user,i) => {
          return (
            <div>
              <hr />
              <h3>Name: {user.name}</h3>
              <h3>Age: {user.age}</h3>
              <h3>Username: {user.username}</h3>
              <button onClick={() => deleteuser(user._id,i)}>delete</button>
              <hr />
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User </button>
      </div>
    </div>
  );
}

export default App;