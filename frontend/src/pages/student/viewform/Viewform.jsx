import { Fragment } from 'react'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

import { NavLink } from 'react-router-dom'

const ViewForm = () => {

    return (
        <Fragment>
            <div className="w-full h-full flex justify-center">
                <div className="w-3/4 my-5 px-4 py-3 bg-white shadow sm:rounded-lg">
                    <div className="py-3 w-full flex">
                        <div className='w-1/2'>

                            <NavLink
                                to='/description/แบบฟอร์มคำร้องขอ'
                                className="font-semibold"
                                style={{ cursor: 'pointer' }}
                                onClick={() => console.log('1')}
                            >
                                แบบฟอร์มคำร้องขอ
                            </NavLink>
                        </div>
                        {/* click download icon and all docs of that form will be downloaded */}
                        <div className='grow h-auto flex justify-end'>
                            <DownloadRoundedIcon
                                onClick={() => {
                                    console.log('hi')
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewForm
