import { useMutation, useQuery } from '@apollo/client'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UPDATE_POST_BY_ID } from '../../../graphql/mutation'
import { POST_BY_ID } from '../../../graphql/query'

const Postspage = () => {
    const { postId } = useParams()
    const { data, loading } = useQuery(POST_BY_ID, {
        variables: {
            id: postId,
        },
    })
    const [post, setPost] = useState({})

    const [updatePostById] = useMutation(UPDATE_POST_BY_ID)

    useEffect(() => {
        setPost({
            title: data?.postId?.title,
            desc: data?.postId?.desc,
            topic: data?.postId?.topic,
        })
    }, [data])

    const sortTopic = useMemo(() => {
        let topics = {
            activity: 'กิจกรรม',
            announcement: 'ประกาศจากทางคณะ',
            informationTech: 'ข่าวสารเทคโนโลยี',
            job: 'ประกาศรับสมัครงาน/ฝึกงาน',
            scholarship: 'ทุนการศึกษา',
            other: 'อื่นๆ',
        }

        let otherTopic = []
        Object.keys(topics).forEach((topic) => {
            if (topic !== post?.topic) {
                otherTopic.push(topics[topic])
            }
        })
        return [topics[post?.topic], ...otherTopic]
    }, [data, post])

    const handleOnChange = useCallback((e) => {
        const { id, value } = e.target
        let topics = {
            กิจกรรม: 'activity',
            ประกาศจากทางคณะ: 'announcement',
            ข่าวสารเทคโนโลยี: 'informationTech',
            ประกาศรับสมัครงานฝึกงาน: 'job',
            ทุนการศึกษา: 'scholarship',
            อื่นๆ: 'other',
        }

        setPost((prev) => ({
            ...prev,
            [id]: id === 'topic' ? topics[value] : value,
        }))
    }, [])

    const handleOnSubmit = useCallback(
        async (e) => {
            e.preventDefault()

            try {
                await updatePostById({
                    variables: { id: postId, record: { ...post } },
                })
                window.location = '/posts'
            } catch {
                console.log('error')
            }
        },
        [post]
    )

    return (
        <Fragment>
            <div className="w-full grow flex flex-col space-y-8">
                <div className="h-12 w-full grid grid-cols-2 py-8 px-12">
                    <h1 className="text-2xl font-bold">Edit Post</h1>
                </div>

                <form className="grow px-12" onSubmit={handleOnSubmit}>
                    <div className="w-full h-auto shadow-xl bg-white rounded-t-xl border flex flex-col border-gray-200 p-6 space-y-2">
                        <label>Title</label>
                        <input
                            value={post?.title}
                            id="title"
                            onChange={handleOnChange}
                            type="text"
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <label>Description</label>
                        <textarea
                            onChange={handleOnChange}
                            value={post?.desc}
                            id="desc"
                            placeholder="Enter your title"
                            className="border-2 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                        <h1>Topic</h1>
                        <select
                            className="w-1/6 focus:outline-none p-2 rounded-xl border border-gray-300"
                            onChange={handleOnChange}
                            id="topic"
                        >
                            {sortTopic.map((item, index) => {
                                return index === 0 ? (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ) : (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                        <div className="flex justify-end p-5">
                            <button
                                type="submit"
                                className="bg-blue-500 border-2 rounded text-white p-2 mr-2"
                            >
                                Save
                            </button>
                            <Link className="p-2" to="/posts">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Postspage
