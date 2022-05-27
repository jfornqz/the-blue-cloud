import { Fragment, useState } from 'react'

import Card from './Card'

import { useMutation, useQuery } from '@apollo/client'
import { ALL_POST } from '../../../graphql/query'

const Home = () => {
    const [items, SetItems] = useState([])
    const { data, loading } = useQuery(ALL_POST, {
        onCompleted: (data) => SetItems(data.posts),
    })

    return (
        <Fragment>
            <div className="w-full h-full flex space-x-10 overflow-y-auto">
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
            </div>
        </Fragment>
    )
}

export default Home
