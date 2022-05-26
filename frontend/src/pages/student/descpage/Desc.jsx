import { Fragment } from 'react'
import { Steps } from 'rsuite'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'

const DescPage = () => {
    return (
        <Fragment>
            <div>
                <div className="w-3/4 my-5 ml-10 py-3">
                    <div className="">
                        {/* มันแตกค่า */}
                        <Steps current={1}>
                            <Steps.Item title="Waiting" />
                            <Steps.Item title="In Progress" />
                            <Steps.Item title="Approved" />
                        </Steps>
                    </div>
                </div>
                <div className="ml-4">
                    {/* ชื่อคำร้อง + เอกสารที่เกีี่ยวข้องทางขวามือ */}
                    <div className="flex">
                        <div className="w-2/3 ml-10 mr-10 h-fit px-4 bg-slate-100 rounded-xl">
                            <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                                ชื่อคำร้อง
                            </h2>
                            <div className="my-4">
                                <p>คำอธิบาย</p>
                            </div>
                        </div>
                        <div className="w-1/4 h-fit px-4 bg-slate-100 rounded-xl">
                            <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                                เอกสารที่เกี่ยวข้อง
                            </h2>
                            <div className="my-4">
                                <DownloadForOfflineIcon
                                    onClick={() => {
                                        console.log('clicked')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* เอกสารที่เกีี่ยวข้องที่นศต้องอัปโหลด */}
                    <div className="w-2/3 h-fit ml-10 mt-5 px-4 bg-slate-100 rounded-xl">
                        <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                            เอกสารที่เกี่ยวข้อง
                        </h2>
                        <div className="my-4">
                            <Upload>
                                <Button icon={<UploadOutlined />}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </div>
                    </div>

                    <div className="mt-5 mx-10">
                        <button
                            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-10 rounded-xl"
                            onClick={() => {
                                console.log('clicked')
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DescPage
