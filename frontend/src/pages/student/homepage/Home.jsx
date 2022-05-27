import { Fragment, useState } from 'react'

import Card from './Card'

import { useMutation, useQuery } from '@apollo/client'
import { ALL_POST } from '../../../graphql/query'

const Home = () => {
    const [items, SetItems] = useState([])
    const { data, loading } = useQuery(ALL_POST, {
        onCompleted: (data) => SetItems(data.posts),
    })
    const topics = [
        '#ข่าวสารเทคโนโลยี',
        '#ประกาศจากทางคณะ',
        '#กิจกรรม',
        '#ทุนการศึกษา',
        '#ประกาศรับสมัครงาน/ฝึกงาน',
        '#อื่นๆ',
    ]
    return (
        <Fragment>
            <div className="container mx-auto w-screen h-full pt-8">
                <div className="flex flex-row h-full space-x-4">
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
                                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                            <label className="form-check-label inline-block text-gray-800">
                                                {topic}
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
                            className=" h-10 w-full focus:outline-none pl-3 rounded-xl border border-gray-400"
                            placeholder="ค้นหา"
                            onChange={(e) => {
                                const newItem = Object.assign({}, data)
                                const itemFiltered = newItem.posts.filter(
                                    (form) => {
                                        return (
                                            form?.title.search(e.target.value) >
                                            -1
                                        )
                                    }
                                )
                                SetItems(itemFiltered)
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
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="container mx-auto">
                <div className="flex flex-row w-full h-full pt-10">
                    <div className="basis-1/4	 w-full h-1/3 shadow-2xl rounded-xl"></div>
                    <div className="px-4"></div>
                    <div className="basis-3/4">
                        <input
                            type="text"
                            className=" h-10 w-full focus:outline-none pl-3 rounded-xl border border-gray-400"
                            placeholder="ค้นหา"
                            onChange={(e) => {
                                const newItem = Object.assign({}, data)
                                const itemFiltered = newItem.posts.filter(
                                    (form) => {
                                        return (
                                            form?.title.search(e.target.value) >
                                            -1
                                        )
                                    }
                                )
                                SetItems(itemFiltered)
                            }}
                        />
                        {items.map((post, index) => {
                            return (
                                <div className="h-full w-full flex flex-col justify-start space-y-4 mt-3">
                                    <Card
                                        title={post?.title}
                                        desc={post?.desc}
                                        post_by={post?.post_by}
                                        images={post?.images}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> */}
            {/* <div className="w-full h-full flex space-x-10 overflow-y-auto">
                <div className="w-3/4 h-full pt-5 flex justify-center">
                    <div className="w-2/3 h-1/3 shadow-2xl rounded-xl"></div>
                </div>

                <div className="grow  h-full flex flex-col pt-5 space-y-5 flex-auto ">
                    <div className="w-full h-10 max-h-10 flex justify-start">
                        <div className="relative w-3/4 h-10">
                            <input
                                type="text"
                                className="h-full w-full focus:outline-none pl-3 rounded-xl border border-gray-400"
                                placeholder="ค้นหา"
                                onChange={(e) => {
                                    const newItem = Object.assign({}, data)
                                    const itemFiltered = newItem.posts.filter(
                                        (form) => {
                                            return (
                                                form?.title.search(
                                                    e.target.value
                                                ) > -1
                                            )
                                        }
                                    )
                                    SetItems(itemFiltered)
                                }}
                            />
                        </div>
                    </div>

                    {items.map((post, index) => {
                        return (
                            <div className="h-full w-full flex flex-col justify-start space-y-4 mt-3">
                                <Card
                                    title={post?.title}
                                    desc={post?.desc}
                                    post_by={post?.post_by}
                                    images={post?.images}
                                />
                            </div>
                        )
                    })}
                </div>
            </div> */}
        </Fragment>
    )
}

export default Home
