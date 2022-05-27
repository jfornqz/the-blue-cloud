import { UploadOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Upload } from 'antd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Fragment, useCallback, useState } from 'react'
import { useUserStorage } from '../../../contexts/UserContext'
import { storage } from '../../../firebase'
import { CREATE_ONE_POST } from '../../../graphql/mutation'
import { ALL_FORM } from '../../../graphql/query'

const Postspage = () => {
    const { data, loading } = useQuery(ALL_FORM)
    const { user } = useUserStorage()
    const [fileList, setFileList] = useState([])

    const [createOnePost] = useMutation(CREATE_ONE_POST)

    const [post, setPost] = useState({
        title: '',
        desc: '',
        topic: 'activity',
    })

    const handleOnChange = useCallback((e) => {
        const { id, value } = e.target

        setPost((prev) => ({ ...prev, [id]: value }))
    }, [])

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
                    await createOnePost({
                        variables: {
                            record: {
                                ...post,
                                post_by: user?._id,
                                images: downloadUrlList,
                            },
                        },
                    })
                } catch {
                    console.log('error')
                }
                setPost({
                    title: '',
                    desc: '',
                })
            })
        },
        [fileList, post]
    )

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
                    <h1 className="text-2xl font-bold">New Post</h1>
                </div>

                <form className="grow px-12" onSubmit={handleOnSubmit}>
                    <div className="w-full h-auto shadow-xl bg-white rounded-t-xl border border-gray-200 p-6 flex flex-col space-y-2">
                        <label>Title</label>
                        <input
                            onChange={handleOnChange}
                            value={post?.title}
                            type="text"
                            id="title"
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label>Description</label>
                        <textarea
                            id="desc"
                            value={post?.desc}
                            onChange={handleOnChange}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <h1>Topic</h1>
                        <select
                            className="w-1/6 focus:outline-none p-2 rounded-xl border border-gray-300"
                            id="topic"
                            onChange={handleOnChange}
                        >
                            <option>activity</option>
                            <option>announcement</option>
                            <option>informationTech</option>
                            <option>job</option>
                            <option>scholarship</option>
                            <option>other</option>
                        </select>
                        <label>Attachments</label>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        </Upload>
                        <div className="flex justify-end p-5">
                            <button
                                className="bg-blue-500 border-2 rounded text-white p-2 mr-2"
                                type="submit"
                            >
                                SAVE
                            </button>
                            <button className="p-2">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Postspage
