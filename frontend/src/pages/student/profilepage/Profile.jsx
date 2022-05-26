import { Fragment } from 'react'
import Link from '../../../components/Link'
import logo from '../../../assets/images/logo.png'
import { useLocation } from 'react-router-dom'

const Profile = () => {
    const { pathname: currentPath } = useLocation()

    return (
        <Fragment>
            <div className='h-full flex flex-row'>
                <div className="w-1/6 h-full bg-gray-800 flex flex-col">
                    <div className="w-full h-36 flex justify-center items-center">
                        <div className="w-1/2 mr-2 flex justify-end">
                            <img src={logo} alt="" className="w-20 h-auto" />
                        </div>
                        <h1 className="text-2xl font-bold text-white w-1/2 pr-14">
                            BLUE CLOUD
                        </h1>
                    </div>
                    {/* ยังไม่ได้แก้ path */}
                    <div className="w-full grow flex flex-col space-y-3 font-semibold pt-2.5">
                        <Link
                            path="/dashboard"
                            name="Track Status"
                            currentPath={currentPath}
                        />
                        <Link
                            path="/login"
                            name="Logout"
                            currentPath={currentPath}
                        />
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col-2 justify-center ml-10">
                    <div className="w-3/4 my-5 px-4 py-3 bg-white shadow sm:rounded-lg">
                        <div className="py-3 inline-flex">
                            <h2
                                className="font-semibold"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    toDescPage()
                                }}
                            >
                                แบบฟอร์มที่ submit ไป
                            </h2>
                            <div className="bg-green-100 w-fit h-fit py-1 px-2 rounded-full">
                                <p>Approved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile
