import React from 'react'
import axios from 'axios'

function User({ data }) {

    const deleteUser = user => {
        axios.delete(`http://localhost:8000/api/users/${user.id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h3>{data.name}</h3>
            <h4>{data.bio}</h4>
            <h5>{data.id}</h5>
            <button onClick={() => deleteUser(data)}>Delete</button>
        </div>
    )
}

export default User