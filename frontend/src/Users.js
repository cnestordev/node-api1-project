import React from 'react'
import User from './User'

function Users(props) {

    const usersList = props.users.map(usr => <User key={usr.id} data={usr} />)

    return (
        <div>
            {usersList}
        </div>
    )
}

export default Users