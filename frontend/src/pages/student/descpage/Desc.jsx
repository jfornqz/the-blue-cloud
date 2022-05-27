import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Button, Space, Steps, Typography, Upload } from 'antd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUserStorage } from '../../../contexts/UserContext'
import { storage } from '../../../firebase'
import { CREATE_SUBMISSION, UPDATE_SUBMISSION } from '../../../graphql/mutation'
import { FORM_BY_ID } from '../../../graphql/query'

const DescPage = () => {
    const { id } = useParams()
    const { user } = useUserStorage()
    const [fileList, setFileList] = useState()
    const [uploading, setUploading] = useState(false)

    const queryFormIdOpt = {
        variables: {
            submissionsFilter: {
                submitted_by: user._id,
            },
            id: id,
        },
    }
    const { loading, error, data } = useQuery(FORM_BY_ID, queryFormIdOpt)

    const [createSubmission] = useMutation(CREATE_SUBMISSION, {
        refetchQueries: [
            {
                query: FORM_BY_ID,
                ...queryFormIdOpt,
            },
        ],
    })

    const [updateSubmission] = useMutation(UPDATE_SUBMISSION, {
        refetchQueries: [
            {
                query: FORM_BY_ID,
                ...queryFormIdOpt,
            },
        ],
    })

    const handleSubmit = () => {
        setUploading(true)
        Promise.all(
            fileList.slice().map((file) => {
                return new Promise((resolve, reject) => {
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
            setUploading(false)
            if (data?.formId?.submissions.length === 0) {
                return createSubmission({
                    variables: {
                        record: {
                            file: downloadUrlList,
                            submitted_by: user._id,
                            form_id: id,
                        },
                    },
                })
            } else {
                return updateSubmission({
                    variables: {
                        id: data?.formId?.submissions[0]._id,
                        record: {
                            file: downloadUrlList,
                        },
                    },
                })
            }
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
    const STATUS = {
        Waiting: 0,
        ['In_progress']: 1,
        Reject: 1,
        Approved: 2,
    }

    return (
        <Fragment>
            <div className="w-full h-full">
                <div className="w-full h-20 py-4 px-4">
                    <Steps
                        size="small"
                        initial={0}
                        current={
                            data?.formId?.submissions[0]?.status
                                ? STATUS[data?.formId?.submissions[0]?.status]
                                : -1
                        }
                        status={
                            data?.formId?.submissions[0]?.status === 'Reject'
                                ? 'error'
                                : data?.formId?.submissions[0]?.status ===
                                  'Approved'
                                ? 'finish'
                                : 'process'
                        }
                    >
                        <Steps.Step title="Waiting" />
                        <Steps.Step title="In Progress" />
                        <Steps.Step title="Approved" />
                    </Steps>
                </div>
                <div className="ml-4">
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
                </div>
                <div className=" h-100 mt-5 mx-10 flex justify-end	">
                    <Button
                        size="large"
                        style={{
                            marginTop: 16,
                        }}
                        shape="round"
                    >
                        Cancel
                    </Button>
                    <div className="px-1"></div>
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
                        {uploading ? 'Submitting' : 'Submit'}
                    </Button>
                </div>
            </div>
        </Fragment>
    )
}

export default DescPage
