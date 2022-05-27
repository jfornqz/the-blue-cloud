import { Fragment, useCallback, useState } from "react";
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery } from "@apollo/client";
import { ALL_FORM } from "../../../graphql/query";

import { CREATE_ONE_POST } from "../../../graphql/mutation";

import { useUserStorage } from "../../../contexts/UserContext";

const Postspage = () => {

    const { data, loading } = useQuery(ALL_FORM)
    const { user } = useUserStorage()

    const [createOnePost] = useMutation(CREATE_ONE_POST)

    const [post, setPost] = useState({
        title: '',
        desc: '',
    })

    const handleOnChange = useCallback((e) => {
        const { id, value } = e.target

        setPost(prev => ({ ...prev, [id]: value }))

    }, [])

    const handleOnSubmit = useCallback(async (e) => {
        e.preventDefault()

        try {
            await createOnePost({ variables: { record: { ...post, post_by: user?._id } } })
        } catch {
            console.log('error')
        }

        setPost({
            title: '',
            desc: ''
        })

    }, [])


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
                            id='title'
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <label>Description</label>
                        <textarea
                            id='desc'
                            value={post?.desc}
                            onChange={handleOnChange}
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <h1>Topic</h1>
                        <select className="w-1/6 focus:outline-none p-2 rounded-xl border border-gray-300" id='topics' onChange={handleOnChange}>
                            <option>activity</option>
                            <option>announcement</option>
                            <option>informationTech</option>
                            <option>job</option>
                            <option>scholarship</option>
                            <option>other</option>
                        </select>
                        <div className="flex justify-end p-5">
                            <button className="bg-blue-500 border-2 rounded text-white p-2 mr-2" type='submit'>SAVE</button>
                            <button className="p-2">Cancel</button>
                        </div>
                    </div>

                </form>

            </div>
        </Fragment>
    )
}

export default Postspage