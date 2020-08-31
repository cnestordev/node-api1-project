import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
    border: 2px solid #191919;
    border-radius: 10px;
    font-family: 'Rubik', sans-serif;
    display: inline-block;
    padding: 1%;
    text-align: center;
    margin: 2%;
    width: 20%;

    h5 {
        background: #5a5a5a;
        color: #fff;
        width: 45%;
        margin: 6% auto;
        border-radius: 50px;
        padding: 0.5% 1.5%;
    }

    button {
        background: #b13232;
        border: none;
        border-radius: 2px;
        font-family: 'Rubik', sans-serif;
        padding: 2% 4%;
        color: #020202;
    }
`

function User({ data }) {

    const deleteUser = user => {
        axios.delete(`http://localhost:8000/api/users/${user.id}`)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Container>
            <h3>{data.name}</h3>
            <h4>{data.bio}</h4>
            <h5>id: {data.id}</h5>
            <button onClick={() => deleteUser(data)}>Delete</button>
        </Container>
    )
}

export default User