import { Fragment } from 'react'
import logo from '../../../assets/images/logo.png'
import { useLocation, Link } from 'react-router-dom'

const Profile = () => {
    const { pathname: currentPath } = useLocation()

    return (
        <Fragment>
            <div className='h-full flex'>

                <div className="w-full h-fit flex justify-center ml-10">
                    <div className="w-3/4 my-5 px-4 py-3 bg-white shadow sm:rounded-lg flex">
                        <div className="py-3 flex h-full w-1/2">
                            <Link
                                to='/description/แบบฟอร์มที่ submit ไป'
                                className="font-semibold items-center flex"
                                style={{ cursor: 'pointer' }}
                            >
                                แบบฟอร์มที่ submit ไป
                            </Link>
                        </div>
                        <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                            <p className='bg-green-100 p-1.5 rounded-xl'>Approved</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
