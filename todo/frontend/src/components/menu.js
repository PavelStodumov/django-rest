import React from "react";
import { Link } from "react-router-dom";


const MenuItem = ({ item }) => {
    let link = `/${item[0]}`
    let name = item[0]
    return (
        <li>
            <Link to={link}>{name}</Link>
        </li >
    )
}



const Menu = ({ menuList }) => {
    let _menuList = Object.entries(menuList)
    return (
        // <nav className="menu">
        //     <ul>
        _menuList.map((item) => <MenuItem item={item} />)
        //     </ul>
        // </nav>
    )
}

export default Menu