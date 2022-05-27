import { useQuery } from '@apollo/client'
import { Fragment, useMemo, useState } from 'react'
import { ALL_POST } from '../../../graphql/query'
import Card from './Card'

const Home = () => {
    const [selectTopics, SetSelectTopic] = useState([])
    const [search, SetSearch] = useState('')
    const { data, loading } = useQuery(ALL_POST)

    const items = useMemo(
        () =>
            data?.posts?.filter((e) => {
                if (selectTopics.length > 0) {
                    return (
                        selectTopics.includes(e.topic) &&
                        e?.title?.search(search) > -1
                    )
                } else {
                    return e?.title?.search(search) > -1
                }
            }) || [],
        [selectTopics, search, data]
    )

    const enumTopic = {
        informationTech: 'ข่าวสารเทคโนโลยี',
        announcement: 'ประกาศจากทางคณะ',
        activity: 'กิจกรรม',
        scholarship: 'ทุนการศึกษา',
        job: 'ประกาศรับสมัครงาน/ฝึกงาน',
        other: 'อื่นๆ',
    }
    const topics = Object.keys(enumTopic)
    return (
        <Fragment>
            <div className="container mx-auto w-screen h-full pt-8">
                <div className="flex flex-row h-full space-x-4 ">
                    <div className="basis-1/4">
                        <div className="w-full  shadow-2xl rounded-xl px-4 py-4">
                            <p className="text-center text-lg font-semibold ">
                                Select Topic:
                            </p>
                            <div className="space-y-2 pt-4">
                                {topics.map((topic, index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <input
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-300 checked:border-blue-300 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                                onChange={(e) => {
                                                    let newSelectTopics =
                                                        selectTopics.slice()
                                                    if (e.target.checked) {
                                                        newSelectTopics.push(
                                                            topic
                                                        )
                                                        SetSelectTopic(
                                                            newSelectTopics
                                                        )
                                                    } else {
                                                        const index =
                                                            selectTopics.findIndex(
                                                                (e) =>
                                                                    e === topic
                                                            )

                                                        newSelectTopics.splice(
                                                            index,
                                                            1
                                                        )
                                                        SetSelectTopic(
                                                            newSelectTopics
                                                        )
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label inline-block text-gray-800">
                                                # {enumTopic[topic]}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="basis-3/4">
                        <input
                            type="text"
                            className=" h-10 w-full focus:outline-none pl-3 rounded-xl border border-gray-300"
                            placeholder="ค้นหา"
                            onChange={(e) => {
                                SetSearch(e.target.value)
                            }}
                        />
                        <div className="space-y-4 pt-4">
                            {items.map((post, index) => {
                                return (
                                    <Card
                                        key={index}
                                        title={post?.title}
                                        desc={post?.desc}
                                        post_by={post?.post_by}
                                        images={post?.images}
                                        timestamp={post?.timestamp}
                                        topic={enumTopic[post?.topic]}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
