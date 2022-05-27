import { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStorage } from './contexts/UserContext'

import './App.css'

import Router from './routes/Router'

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const App = () => {
    const { pathname } = useLocation()
    const { user, cookie } = useUserStorage()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user && !cookie?.token) {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <Fragment>
            <div className="w-screen h-screen flex ">
                <div className={`${user?.role === 'Admin' && 'w-1/6 h-full'}`}>
                    {user?.role === 'Admin' && <Sidebar />}
                </div>

                <div className={`${pathname !== '/login' ? 'h-full grow flex flex-col' : 'w-full h-full'}`}>
                    {pathname !== '/login' && <Navbar />}
                    <Router user={user} cookie={cookie} />
                </div>
            </div>
        </Fragment>
    )
}

export default App
