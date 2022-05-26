import { Fragment } from 'react'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

const ViewForm = () => {

    return (
        <Fragment>
            <div className="w-full h-fit flex justify-center">
                <div className="w-3/4 my-5 px-4 py-3 bg-white shadow sm:rounded-lg">
                    <div className="py-3 inline-flex">
                        <h2
                            className="font-semibold"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                toDescPage()
                            }}
                        >
                            แบบฟอร์มคำร้องขอ
                        </h2>
                        {/* click download icon and all docs of that form will be downloaded */}
                        <DownloadRoundedIcon
                            className="ml-96"
                            onClick={() => {
                                console.log('hi')
                            }}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ViewForm
