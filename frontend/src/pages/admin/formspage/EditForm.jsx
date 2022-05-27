import { Fragment, useCallback, useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery } from "@apollo/client";
import { FORM_BY_ID } from "../../../graphql/query";
import { UploadOutlined } from '@ant-design/icons'
import { storage } from '../../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { Button, Space, Upload, Typography } from 'antd'

import { Link } from 'react-router-dom'
import { UPDATE_FORM_BY_ID } from "../../../graphql/mutation";
import { useParams } from "react-router-dom";

import { useUserStorage } from "../../../contexts/UserContext";

const Postspage = () => {

    const { formId } = useParams()
    const { data, loading } = useQuery(FORM_BY_ID, {
        variables: { id: formId }
    })

    const [updateFormById] = useMutation(UPDATE_FORM_BY_ID)

    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const { user } = useUserStorage()
    const [active, setActive] = useState(false)

    const [form, setForm] = useState({
        title: '',
        desc: '',
    })

    useEffect(() => {
        setForm({
            title: data?.formId?.title,
            desc: data?.formId?.desc
        })
    }, [formId, data])


    const handleOnSubmit = useCallback(async (e) => {
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
                await updateFormById({ variables: { id: formId, record: { ...form, file: downloadUrlList, post_by: user?._id, status: (active ? 'Active' : 'Inactive') } } })
            } catch {
                console.log('error')
            }
        })


    }, [fileList, form])

    const handleOnChange = useCallback((e) => {
        const { id, value } = e.target

        setForm(prev => ({ ...prev, [id]: value }))

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
                    <h1 className="text-2xl font-bold">Edit Form</h1>

                    <div className="flex h-full items-center justify-end">

                        <input type='checkbox' className="mr-1" onSelect={() => setActive(prev => (prev ? false : true))} value={active} />
                        <h1 className="text-lg">Active</h1>
                    </div>
                </div>

                <div className="grow px-12">
                    <form className="w-full h-auto shadow-xl bg-white rounded-t-xl border border-gray-200 p-6" onSubmit={handleOnSubmit}>
                        <label>Title</label>
                        <input
                            onChange={handleOnChange}
                            id='title'
                            type="text"
                            value={form?.title}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <label>Description</label>
                        <textarea
                            id='desc'
                            onChange={handleOnChange}
                            value={form?.desc}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <label>Attachments</label>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        </Upload>
                        {/* <input type="file" placeholder="Enter your title" className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" /> */}
                        <div className="flex justify-end p-5">
                            <button
                                type='submit'
                                className="bg-blue-500 border-2 rounded text-white p-2 mr-2"
                            >
                                Upload now
                            </button>
                            <button className="p-2">Cancel</button>
                        </div>
                    </form>

                </div>

            </div>
        </Fragment>
    )
}

export default Postspage