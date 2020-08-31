import React, { useState } from 'react'
import axios from 'axios'

import styled from 'styled-components'

const Container = styled.form`
    border-radius: 5px;
    background: #434443;
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;
    padding: 2%;

    input {
        border: 2px solid #171717;
        background: #171717;
        color: #fff;
        padding: 2% 4%;
        margin: 1%;
        font-size: 1rem;
    }

    button {
        background: #00630c;
        color: #fff;
        font-size: 1rem;
        border: none;
        width: 30%;
        margin: 1% auto 0;
        padding: 1%;
    }
`

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
            <Container onSubmit={handleSubmit}>
                <input onChange={handleInputs} value={data.name} type="text" placeholder="name" name="name" />
                <input onChange={handleInputs} value={data.bio} type="text" placeholder="bio" name="bio" />
                <button>Add</button>
                {message && <h3 style={{ color: 'lightblue' }}>{message}</h3>}
            </Container>
        </div>
    )
}

export default Form