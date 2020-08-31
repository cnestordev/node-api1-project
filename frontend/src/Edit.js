import React, { useState } from 'react'
import axios from 'axios'

function Edit(props) {

    const [data, setData] = useState({
        name: '',
        bio: '',
        id: ''
    })

    const [message, setMessage] = useState(null)

    const handleInputs = e => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        const id = data.id || 'null'
        axios.put(`http://localhost:8000/api/users/${id}`, data)
            .then(res => {
                console.log(res)
                setMessage(res.status)
            })
            .catch(err => {
                console.dir(err.response.data.message)
                setMessage(err.response.data.message)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleInputs} value={data.name} type="text" placeholder="name" name="name" />
            <input onChange={handleInputs} value={data.bio} type="text" placeholder="bio" name="bio" />
            <input onChange={handleInputs} value={data.id} type="text" placeholder="id" name="id" />
            <button>Edit</button>
            {message && <h3 style={{ color: "skyblue" }}>{message}</h3>}
        </form>
    )
}

export default Edit