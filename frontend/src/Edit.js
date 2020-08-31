import React, { useState } from 'react'
import axios from 'axios'

import styled from 'styled-components'

const Container = styled.form`
    border: 3px solid black;
    border-radius: 5px;
    font-family: 'Rubik', sans-serif;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;
    padding: 2%;

    input {
        border: 2px solid #171717;
        background: #fff;
        color: #333;
        padding: 2% 4%;
        margin: 1%;
        font-size: 1rem;
    }

    button {
        background: #d48d0d;
        color: #fff;
        font-size: 1rem;
        border: none;
        width: 30%;
        margin: 1% auto 0;
        padding: 1%;
    }
`

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
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })
            .catch(err => {
                console.dir(err.response.data.message)
                setMessage(err.response.data.message)
            })
    }

    return (
        <Container onSubmit={handleSubmit}>
            <input onChange={handleInputs} value={data.name} type="text" placeholder="name" name="name" />
            <input onChange={handleInputs} value={data.bio} type="text" placeholder="bio" name="bio" />
            <input onChange={handleInputs} value={data.id} type="text" placeholder="id" name="id" />
            <button>Edit</button>
            {message && <h3 style={{ color: "#795548" }}>{message}</h3>}
        </Container>
    )
}

export default Edit