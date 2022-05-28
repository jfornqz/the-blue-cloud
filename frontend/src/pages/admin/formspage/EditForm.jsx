import { useMutation, useQuery } from '@apollo/client'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUserStorage } from '../../../contexts/UserContext'
import { UPDATE_FORM_BY_ID } from '../../../graphql/mutation'
import { FORM_BY_ID } from '../../../graphql/query'

const Postspage = () => {
    const { formId } = useParams()
    const { data, loading } = useQuery(FORM_BY_ID, {
        variables: { id: formId },
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
            desc: data?.formId?.desc,
        })
    }, [formId, data])

    const handleOnSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            try {
                await updateFormById({
                    variables: {
                        id: formId,
                        record: {
                            ...form,
                            post_by: user?._id,
                            status: active ? 'Active' : 'Inactive',
                        },
                    },
                })
                window.location = '/forms'
            } catch {
                console.log('error')
            }
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
                    <h1 className="text-2xl font-bold">Edit Form</h1>

                    {/* <div className="flex h-full items-center justify-end">
                        <input
                            type="checkbox"
                            className="mr-1"
                            onSelect={() =>
                                setActive((prev) => (prev ? false : true))
                            }
                            value={active}
                        />
                        <h1 className="text-lg">Active</h1>
                    </div> */}
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
                            value={form?.title}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label>Description</label>
                        <textarea
                            id="desc"
                            onChange={handleOnChange}
                            value={form?.desc}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <div className="flex justify-end p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 border-2 rounded text-white p-2 mr-2"
                            >
                                Save
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
