import axios from "axios";
import React from "react";


const MenuItem = ({ item }) => {
    return (
        <li><a href={item[1]}>{item[0]}</a></li>
    )
}



const Menu = ({ menuList }) => {
    let _menuList = Object.entries(menuList)
    return (
        <div className="menu">
            <ul>
                {_menuList.map((item) => <MenuItem item={item} />)}
            </ul>
        </div>
    )
}

export default Menu