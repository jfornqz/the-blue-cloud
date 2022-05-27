import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery } from "@apollo/client";

import { POST_BY_ID } from "../../../graphql/query";

import { useParams } from "react-router-dom";

const Postspage = () => {

    const { postId } = useParams()
    const { data, loading } = useQuery(POST_BY_ID, {
        variables: {
            id: postId
        }
    })
    const [post, setPost] = useState({})

    useEffect(() => {
        setPost({
            title: data?.postId?.title,
            desc: data?.postId?.desc,
            topic: data?.postId?.topic
        })
    }, [data])

    const sortTopic = useMemo(() => {
        let topics = {
            'activity': 'กิจกรรม',
            'announcement': 'ประกาศ',
            'informationTech': 'ข่าวเทคโนโลยี',
            'job': 'งาน',
            'scholarship': 'ทุนการศึกษา',
            'other': 'อื่น'
        }

        let otherTopic = []
        Object.keys(topics).forEach((topic) => {
            if (topic !== post?.topic) {
                otherTopic.push(topics[topic])
            }
        })


        return [topics[post?.topic], ...otherTopic]

    }, [post])


    const handleOnChange = useCallback((e) => {

        const { id, value } = e.target

        setPost({ [id]: value })

    }, [])

    console.log(sortTopic)


    return (
        <Fragment>
            <div className="w-full grow flex flex-col space-y-8">
                <div className="h-12 w-full grid grid-cols-2 py-8 px-12">
                    <h1 className="text-2xl font-bold">Edit Post</h1>

                </div>

                <div className="grow px-12">
                    <div className="w-full h-auto shadow-xl bg-white rounded-t-xl border flex flex-col border-gray-200 p-6 space-y-2">
                        <label>Title</label>
                        <input
                            value={data?.postId?.title}
                            id='title'
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <label>Description</label>
                        <textarea
                            onChange={handleOnChange}
                            value={post?.desc}
                            id='desc'
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
                        <h1>Topic</h1>
                        <select className="w-1/6 focus:outline-none p-2 rounded-xl border border-gray-300 ">
                            {
                                sortTopic.map(item => {
                                    return <option>{item}</option>
                                })
                            }
                        </select>
                        <div className="flex justify-end p-5">
                            <button className="bg-blue-500 border-2 rounded text-white p-2 mr-2">Save</button>
                            <button className="p-2">Cancel</button>
                        </div>
                    </div>

                </div>

            </div>
        </Fragment>
    )
}

export default Postspage