import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client'
import { Button, Upload } from 'antd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Fragment, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStorage } from '../../../contexts/UserContext'
import { storage } from '../../../firebase'
import { CREATE_ONE_FORM } from '../../../graphql/mutation'

const Postspage = () => {
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const { user } = useUserStorage()
    const [createOneForm] = useMutation(CREATE_ONE_FORM)

    const [form, setForm] = useState({
        title: '',
        desc: '',
    })

    const handleOnSubmit = useCallback(
        async (e) => {
            e.preventDefault()
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
            ).then(async (downloadUrlList) => {
                try {
                    await createOneForm({
                        variables: {
                            record: {
                                ...form,
                                file: downloadUrlList,
                                post_by: user?._id,
                            },
                        },
                    })
                    window.location = '/forms'
                } catch {
                    console.log('error')
                }
            })
        },
        [fileList, form]
    )

    const handleOnChange = useCallback((e) => {
        const { id, value } = e.target

        setForm((prev) => ({ ...prev, [id]: value }))
    }, [])

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
            <div className="w-full grow flex flex-col space-y-8">
                <div className="h-12 w-full grid grid-cols-2 py-8 px-12">
                    <h1 className="text-2xl font-bold">New Form</h1>
                </div>

                <div className="grow px-12">
                    <form
                        className="w-full h-auto shadow-xl bg-white rounded-t-xl border border-gray-200 p-6"
                        onSubmit={handleOnSubmit}
                    >
                        <label>Title</label>
                        <input
                            onChange={handleOnChange}
                            id="title"
                            type="text"
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label>Description</label>
                        <textarea
                            id="desc"
                            onChange={handleOnChange}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label>Attachments</label>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        </Upload>
                        <div className="flex justify-end p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 border-2 rounded text-white p-2 mr-2"
                            >
                                Upload now
                            </button>
                            <Link className="p-2" to="/forms">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Postspage
