import React from "react";
import { useParams } from "react-router-dom";



const User = ({ items }) => {
    let { id } = useParams()
    let user = items.filter((user) => user.uid == id)[0]
    console.log(user)
    return (
        <div className="user">
            <h3>Name: {user.firstName}</h3>
            <h3>Last name: {user.lastName}</h3>
            <h3>Email: {user.email}</h3>
        </div>
    )
}

export default User