import React from 'react'


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.firstName}
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
        <div class="table">
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
