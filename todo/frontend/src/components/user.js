import React from "react";
import { useParams } from "react-router-dom";

const UserProjects = (project) => project.name

const User = ({ users, projects }) => {
    let { id } = useParams()
    let user = users.filter((user) => user.uid == id)[0]
    let userProjects = projects.filter((project) => project.users.includes(user.username))

    return (
        <div className="user">
            <h3>Name: {user.firstName}</h3>
            <h3>Last name: {user.lastName}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Projects: {userProjects.map(el => el.name + ' ')}</h3>
        </div>
    )
}

export default User