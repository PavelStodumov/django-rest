import React from "react";

const ProjectsItem = ({ item }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>{item.link}</td>
            <td>{item.users}</td>
        </tr>
    )
}

const ProjectList = ({ items }) => {
    return (
        <div className="table">
            <table>
                <th>Name</th>
                <th>Link</th>
                <th>Users</th>
                {items.map((item) => <ProjectsItem item={item} />)}
            </table>
        </div>
    )
}

export default ProjectList