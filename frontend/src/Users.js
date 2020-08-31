import React from 'react'
import User from './User'

function Users(props) {

    const usersList = props.users.map(usr => <User key={usr.id} data={usr} />)

    return (
        <div style={{ textAlign: 'center', margin: '3%' }}>
            {usersList}
        </div>
    )
}

export default Users