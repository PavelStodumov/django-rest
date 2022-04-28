import React from "react";
import { Link } from "react-router-dom"

const TodosItem = ({ item, deleteTodo }) => {

    return (
        <tr>
            <td>{item.project.name}</td>
            <td>{item.text}</td>
            <td>{item.user.firstName}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>{item.isActive == true ? "+" : "-"}</td>
            <td><button onClick={() => deleteTodo(item.id)} type="button">delete</button></td>
        </tr>
    )
}

const TodosList = ({ items, deleteTodo }) => {
    return (
        <div className="table">
            <table>
                <th>Project name</th>
                <th>Text</th>
                <th>User</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Active</th>
                <th></th>
                {items.map((item) => <TodosItem item={item} deleteTodo={deleteTodo} />)}
            </table>
            <button>
                <Link to="/todos/create">create</Link>
            </button>
        </div>
    )
}

export default TodosList