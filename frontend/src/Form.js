import React, { useState } from 'react'
import axios from 'axios'

function Form(props) {
    const [data, setData] = useState({
        name: '',
        bio: ''
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
        axios.post('http://localhost:8000/api/users', data)
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
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleInputs} value={data.name} type="text" placeholder="name" name="name" />
                <input onChange={handleInputs} value={data.bio} type="text" placeholder="bio" name="bio" />
                <button>Add</button>
                {message && <h3 style={{ color: 'lightblue' }}>{message}</h3>}
            </form>
        </div>
    )
}

export default Form