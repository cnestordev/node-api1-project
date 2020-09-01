import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Users from './Users';
import Form from './Form';
import Edit from './Edit';

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <Form />
      <Users users={users} />
      <Edit />
    </div>
  );
}

export default App;
