import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import NotFound from '../pages/notfound/NotFound'
import LoginPage from '../pages/loginpage/Loginpage'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import Postspage from '../pages/admin/postspage/Postspage'
import Formspage from '../pages/admin/formspage/Formspage'
import HomePage from '../pages/student/homepage/Home'
import ViewFormPage from '../pages/student/viewform/Viewform'
import DescPage from '../pages/student/descpage/Desc'
import ProfilePage from '../pages/student/profilepage/Profile'

const Router = ({ user, cookie }) => {
    return (
        <Fragment>
            <Routes>
                {!user && !cookie.token && (
                    <Route path="/login" element={<DescPage />} />
                )}

                {user?.email === 'admin' ? (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/posts" element={<Postspage />} />
                        <Route path="/forms" element={<Formspage />} />
                        <Route path="*" element={<NotFound />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<NotFound />} />
                    </>
                )}
            </Routes>
        </Fragment>
    )
}

export default Router
