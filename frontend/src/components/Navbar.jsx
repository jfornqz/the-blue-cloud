import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useUserStorage } from '../contexts/UserContext'

const Navbar = () => {
    const [leave, setLeave] = useState(true)
    const { handleOnLogout, user } = useUserStorage()

    return (
        <Fragment>
            <div className="w-full h-16 max-h-20 bg-white shadow-xl flex justify-end items-center pr-9 space-x-5 relative">
                {user?.role !== 'Admin' && (
                    <Fragment>
                        <div className="justify-start pl-10 h-10 max-h-10 w-2/5 flex items-center">
                            <h1 className="text-2xl font-bold">BLUE CLOUD</h1>
                        </div>
                        <div className="grow h-10 max-h-10 flex space-x-6 pl-12">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-black underline text-2xl '
                                        : ' text-gray-400 text-2xl'
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/view"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-black underline text-2xl '
                                        : ' text-gray-400 text-2xl'
                                }
                            >
                                Form
                            </NavLink>
                        </div>
                    </Fragment>
                )}
                <div
                    className="h-2/4 w-8 bg-black rounded-full border border-gray-200 relative"
                    onMouseLeave={() => setLeave(true)}
                    onMouseEnter={() => setLeave(false)}
                >
                    {!leave && (
                        <div className="absolute shadow-xl rounded-md w-36 max-w-md h-auto top-full pt-1 right-0 flex justify-start bg-white flex-col">
                            {user?.role === 'Student' && (
                                <NavLink
                                    to="/profile"
                                    className="select-none font-light pt-1 pl-3 pb-1 cursor-pointer border-b hover:bg-gray-100 transition duration-100"
                                >
                                    Profile
                                </NavLink>
                            )}
                            <h1
                                className="select-none font-light pt-1 pl-3 pb-1 cursor-pointer hover:bg-gray-100 transition duration-100"
                                onClick={handleOnLogout}
                            >
                                Logout
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default Navbar
