import { UploadOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Button, Space, Upload, Typography } from 'antd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Fragment, useState } from 'react'
import { useUserStorage } from '../../../contexts/UserContext'
import { storage } from '../../../firebase'
import { FORM_BY_ID, QUERY_ME } from '../../../graphql/query'
import { useParams } from 'react-router-dom'
const DescPage = () => {
    const { id } = useParams()
    const { user } = useUserStorage()
    const { loading, error, data } = useQuery(FORM_BY_ID, {
        variables: {
            submissionsFilter: {
                submitted_by: user._id,
            },
            id: id,
        },
    })
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [progressPercent, setProgressPercent] = useState(0)

    const handleSubmit = () => {
        setUploading(true)
        Promise.all(
            fileList.slice().map((file) => {
                return new Promise((resolve, reject) => {
                    console.log(file)
                    file.status = 'uploading'
                    file.percent = 0
                    const storageRef = ref(storage, `files/${file.name}`)
                    const uploadTask = uploadBytesResumable(
                        storageRef,
                        file.originFileObj
                    )
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round(
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                    100
                            )
                            file.percent = progress
                            const index = fileList.indexOf(file)
                            const newFileList = fileList.slice()
                            fileList[index] = file
                            setFileList(newFileList)
                        },
                        (error) => {
                            file.status = 'error'
                            alert(error)
                            reject(error)
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                (downloadURL) => {
                                    file.status = 'success'
                                    const index = fileList.indexOf(file)
                                    const newFileList = fileList.slice()
                                    fileList[index] = file
                                    setFileList(newFileList)
                                    resolve(downloadURL)
                                }
                            )
                        }
                    )
                })
            })
        ).then((downloadUrlList) => {
            // TODO: call mutation for update file list in submission
            console.log(downloadUrlList)
            setUploading(false)
        })
    }

    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            setFileList(newFileList)
        },
        beforeUpload: () => {
            return false
        },
        fileList,
        onChange: ({ fileList }) => {
            setFileList(fileList)
            return false
        },
        multiple: true,
    }

    return (
        <Fragment>
            {/* {data?.formId?.map((form, index) => {
                return (
                    <div>
                        <div></div>
                    </div>
                )
            })} */}

            <div className="w-full h-full">
                <div className="w-full h-20 py-3 px-4">
                    <div className="w-full h-full">
                        {/* มันแตกค่า */}
                        <div className="flex items-center justify-center">
                            <h1>Waiting</h1>
                            <div className="w-1/4 border-b border-gray-300 h-0" />
                            <h1>In progress</h1>
                            <div className="w-1/4 border-b border-gray-300 h-0" />
                            <h1>Approved</h1>
                            <div className="w-1/4 border-b border-gray-300 h-0" />
                            <h1>Reject</h1>
                        </div>
                    </div>
                </div>
                <div className="ml-4">
                    {/* ชื่อคำร้อง + เอกสารที่เกีี่ยวข้องทางขวามือ */}
                    <div className="flex">
                        <div className="flex-1">
                            <div className=" ml-10 mr-10 h-fit px-4 bg-slate-100 rounded-xl">
                                <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                                    {data?.formId?.title}
                                </h2>
                                <div className="my-4">
                                    <p> {data?.formId?.desc}</p>
                                </div>
                            </div>
                            <div className="mr-10 h-fit ml-10 mt-5 px-4 bg-slate-100 rounded-xl">
                                <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                                    อัพโหลดเอกสาร
                                </h2>
                                <div className="py-5">
                                    <Upload {...uploadProps}>
                                        <Button icon={<UploadOutlined />}>
                                            Select File
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/4 h-fit px-4 bg-slate-100 rounded-xl mr-10">
                            <h2 className="pt-5 font-medium leading-7 text-gray-900 text-xl">
                                เอกสารที่เกี่ยวข้อง
                            </h2>
                            <div className="my-4 ">
                                <Space direction="vertical">
                                    {data?.formId?.file.map((file, index) => {
                                        return (
                                            <Space key={index}>
                                                <DownloadForOfflineIcon
                                                    onClick={() => {
                                                        window.open(file)
                                                    }}
                                                />
                                                <Typography.Text
                                                    ellipsis
                                                    style={{ width: 200 }}
                                                >
                                                    {
                                                        file
                                                            .replace(
                                                                'https://firebasestorage.googleapis.com/v0/b/the-blue-cloud.appspot.com/o/files%2F',
                                                                ''
                                                            )
                                                            .split('?')[0]
                                                    }
                                                </Typography.Text>
                                                <p className="truncate overflow-hidden"></p>
                                            </Space>
                                        )
                                    })}
                                </Space>
                            </div>
                        </div>
                    </div>
                    {/* เอกสารที่เกีี่ยวข้องที่นศต้องอัปโหลด */}
                    <div className="mt-5 mx-10">
                        <Button
                            className="bg-slate-500 hover:bg-slate-700 text-white font-bold hover:text-white"
                            size="large"
                            onClick={handleSubmit}
                            loading={uploading}
                            style={{
                                marginTop: 16,
                            }}
                            shape="round"
                        >
                            {uploading ? `${progressPercent} %` : 'Submit'}
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DescPage
