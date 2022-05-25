import { Fragment, useEffect, useState } from 'react'

import { useUserStorage } from '../contexts/UserContext'

const Navbar = () => {
    const [leave, setLeave] = useState(true)
    const { handleOnLogout } = useUserStorage()

    return (
        <Fragment>
            <div className="w-full h-16 max-h-16 bg-white shadow-xl flex justify-end items-center pr-9">
                <div
                    className="h-2/4 w-8 bg-black rounded-full border border-gray-200 relative"
                    onMouseLeave={() => setLeave(true)}
                    onMouseEnter={() => setLeave(false)}
                >
                    {!leave && (
                        <div className="absolute shadow-xl rounded-md w-36 max-w-md h-auto top-full pt-1 right-0 flex justify-start bg-white flex-col">
                            <h1 className="select-none font-light pt-1 pl-3 pb-1 cursor-pointer border-b hover:bg-gray-100 transition duration-100">
                                Setting
                            </h1>
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
