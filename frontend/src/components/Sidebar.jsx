import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import Link from './Link'

import logo from '../assets/images/logo.png'

const Sidebar = () => {

    const { pathname: currentPath } = useLocation()

    return (
        <Fragment>
            <div className="w-80 h-full bg-gray-800 flex flex-col">
                <div className='w-full h-36 flex justify-center items-center'>
                    <div className='w-1/2 mr-2 flex justify-end'>
                        <img src={logo} alt="" className='w-20 h-auto' />
                    </div>
                    <h1 className='text-2xl font-bold text-white w-1/2 pr-14'>
                        BLUE CLOUD
                    </h1>
                </div>

                <div className='w-full grow flex flex-col space-y-3 font-semibold pt-2.5'>
                    <Link path='/dashboard' name='Dashboard' currentPath={currentPath} />
                    <Link path='/posts' name='Posts' currentPath={currentPath} />
                    <Link path='/forms' name='Forms' currentPath={currentPath} />
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar
