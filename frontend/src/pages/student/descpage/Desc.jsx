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
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [newUpload, setNewUpload] = useState(false)
    const [submissions, SetSubmission] = useState([])
    const queryFormIdOpt = {
        variables: {
            id: id,
        },
        onCompleted: (data) => {
            const submissionFiltered =
                data?.formId?.submissions.filter(
                    (e) => e.submitted_by?._id === user._id
                ) || []
            SetSubmission(submissionFiltered)
            if (submissionFiltered.length > 0) {
                const { file: files } = submissionFiltered[0]
                setFileList(
                    files.map((file) => ({
                        name: file
                            .replace(
                                'https://firebasestorage.googleapis.com/v0/b/the-blue-cloud.appspot.com/o/files%2F',
                                ''
                            )
                            .split('?')[0],
                    }))
                )
            }
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
        )
            .then((downloadUrlList) => {
                // TODO: call mutation for update file list in submission
                if (submissions.length === 0) {
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
                            id: submissions[0]._id,
                            record: {
                                file: downloadUrlList,
                            },
                        },
                    })
                }
            })
            .then(() => {
                setNewUpload(false)
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
            if (fileList.length > 0) {
                setFileList([])
            }
            setNewUpload(true)
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
            <div className="w-full h-full container mx-auto space-y-8">
                <div className="pt-16 px-6">
                    <Steps
                        size="small"
                        initial={0}
                        current={
                            submissions[0]?.status
                                ? STATUS[submissions[0]?.status]
                                : -1
                        }
                        status={
                            submissions[0]?.status === 'Reject'
                                ? 'error'
                                : submissions[0]?.status === 'Approved'
                                ? 'finish'
                                : 'process'
                        }
                    >
                        <Steps.Step title="Waiting" />
                        <Steps.Step title="In Progress" />
                        <Steps.Step title="Approved" />
                    </Steps>
                </div>
                <div>
                    <div className="flex space-x-4">
                        <div className="flex-1 space-y-4">
                            <div className="h-fit px-8 py-4 bg-slate-100 rounded-xl">
                                <h2 className="leading-7 text-gray-900 text-xl font-bold">
                                    {data?.formId?.title}
                                </h2>
                                <div className="">
                                    <p> {data?.formId?.desc}</p>
                                </div>
                            </div>
                            <div className=" h-fit px-8 py-4 bg-slate-100 rounded-xl space-y-4">
                                <h2 className="font-bold leading-7 text-gray-900 text-xl">
                                    อัพโหลดเอกสาร
                                </h2>
                                <div>
                                    <Upload {...uploadProps}>
                                        <Button
                                            disabled={[
                                                'In Progress',
                                                'Approved',
                                            ].includes(submissions[0]?.status)}
                                            icon={<UploadOutlined />}
                                        >
                                            Select File
                                        </Button>
                                    </Upload>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="w-full h-fit bg-slate-100 rounded-xl mr-10 space-y-4 py-4 px-8">
                                <h2 className="font-bold leading-7 text-gray-900 text-xl">
                                    เอกสารที่เกี่ยวข้อง
                                </h2>
                                <div className="">
                                    <Space direction="vertical">
                                        {data?.formId?.file.map(
                                            (file, index) => {
                                                return (
                                                    <Space key={index}>
                                                        <DownloadForOfflineIcon
                                                            onClick={() => {
                                                                window.open(
                                                                    file
                                                                )
                                                            }}
                                                        />
                                                        <Typography.Text
                                                            ellipsis
                                                            style={{
                                                                width: 200,
                                                            }}
                                                        >
                                                            {
                                                                file
                                                                    .replace(
                                                                        'https://firebasestorage.googleapis.com/v0/b/the-blue-cloud.appspot.com/o/files%2F',
                                                                        ''
                                                                    )
                                                                    .split(
                                                                        '?'
                                                                    )[0]
                                                            }
                                                        </Typography.Text>
                                                        <p className="truncate overflow-hidden"></p>
                                                    </Space>
                                                )
                                            }
                                        )}
                                    </Space>
                                </div>
                            </div>
                            {submissions[0]?.status === 'Reject' ? (
                                <div className="w-full h-fit bg-slate-100 rounded-xl mr-10 space-y-4 py-4 px-8">
                                    <p className="font-bold text-xl">Note : </p>
                                    <p>{submissions[0]?.note}</p>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    {/* เอกสารที่เกีี่ยวข้องที่นศต้องอัปโหลด */}
                </div>
                {newUpload ? (
                    <div className=" h-100 mt-5 mx-10 flex justify-end">
                        <Button
                            size="large"
                            style={{
                                marginTop: 16,
                            }}
                            onClick={() => window.location.reload()}
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
                ) : (
                    <></>
                )}
            </div>
        </Fragment>
    )
}

export default DescPage
