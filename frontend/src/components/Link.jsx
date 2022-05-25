import { Fragment } from "react";

import { NavLink } from 'react-router-dom'

const Link = ({ path, name, currentPath }) => {

    return (
        <Fragment>
            <NavLink
                to={path}
                className={`pt-2 font-medium pl-16 pb-2 w-full flex text-md ${currentPath === path && 'bg-gray-600'} text-white cursor-pointer hover:bg-gray-600 transition duration-100`}>
                {name}
            </NavLink>
        </Fragment>
    )
}

export default Link