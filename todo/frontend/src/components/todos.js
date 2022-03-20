import React from "react";

const TodosItem = ({ item }) => {
    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.text}</td>
            <td>{item.user.firstName}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.isActive}</td>
        </tr>
    )
}

const TodosList = ({ items }) => {
    return (
        <div className="table">
            <table>
                <th>Project name</th>
                <th>Text</th>
                <th>User</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Active</th>
                {items.map((item) => <TodosItem item={item} />)}
            </table>
        </div>
    )
}

export default TodosList