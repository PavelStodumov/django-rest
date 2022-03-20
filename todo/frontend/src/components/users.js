import React from 'react'
import { Link } from 'react-router-dom'


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                <Link to={`${user.uid}`}>
                    {user.firstName}
                </Link>
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <div className="table">
            <table>
                <th>
                    First name
                </th>
                <th>
                    Last Name
                </th>
                <th>
                    Email
                </th>
                {users.map((user) => <UserItem user={user} />)}
            </table>
        </div>
    )
}


export default UserList
