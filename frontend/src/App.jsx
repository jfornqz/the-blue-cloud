import { Fragment, useEffect } from 'react'
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
                <div className={`${user?.email === 'admin' && 'w-1/6 h-full'}`}>
                    {user?.email === 'admin' && <Sidebar />}
                </div>

                <div className={`${pathname !== '/login' ? 'h-full w-5/6 flex flex-col' : 'w-full h-full'}`}>
                    {pathname !== '/login' && <Navbar />}
                    <Router user={user} cookie={cookie} />
                </div>
            </div>
        </Fragment>
    )
}

export default App
