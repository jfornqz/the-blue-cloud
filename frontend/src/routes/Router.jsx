import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import NotFound from '../pages/notfound/NotFound'
import LoginPage from '../pages/loginpage/Loginpage'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import HomePage from '../pages/student/homepage/Home'
import ViewFormPage from '../pages/student/viewform/Viewform'
import DescPage from '../pages/student/descpage/Desc'
import ProfilePage from '../pages/student/profilepage/Profile'
import Formspage from '../pages/admin/formspage/Formspage'
import Postspage from '../pages/admin/postspage/Postspage'
import NewPost from '../pages/admin/postspage/NewPost'
import Submissionpage from '../pages/admin/submission/Submissionpage'
import EditPost from '../pages/admin/postspage/EditPost'
import NewForm from '../pages/admin/formspage/NewForm'
import EditForm from '../pages/admin/formspage/EditForm'

const Router = ({ user, cookie }) => {
    return (
        <Fragment>
            <Routes>
                {!user && !cookie.token && (
                    <Route path="/login" element={<LoginPage />} />
                )}

                {user?.role === 'Admin' && (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/posts" element={<Postspage />} />
                        <Route path="/forms" element={<Formspage />} />
                        <Route
                            path="/submission/:formId"
                            element={<Submissionpage />}
                        />
                        <Route path="/newPost" element={<NewPost />} />
                        <Route path="/editPost" element={<EditPost />} />
                        <Route path="/newForm" element={<NewForm />} />
                        <Route path="/editForm" element={<EditForm />} />
                    </>
                )}
                {user?.role === 'Student' && (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/view" element={<ViewFormPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/description/:id" element={<DescPage />} />
                    </>
                )}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Fragment>
    )
}

export default Router
