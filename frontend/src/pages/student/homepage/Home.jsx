import { Fragment } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { ALL_POST } from '../../../graphql/query'

const Home = () => {
    const { data, loading } = useQuery(ALL_POST)

    return (
        <Fragment>
            <div className="w-full h-fit flex flex-col items-center">
                {data?.posts?.map((item, index) => {
                    return (
                        <div className="w-3/4 my-5 placeholder:bg-white shadow sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <div className="inline-flex">
                                    {/* <img
                                        class="inline object-cover w-12 h-12 mr-2 rounded-full"
                                        src={item?.post_by?.password}
                                        alt="Profile image"
                                    /> */}
                                    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                        <svg
                                            className="absolute w-12 h-12 text-gray-400 -left-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="space-y-1 font-medium ml-3">
                                        <div>
                                            {item?.post_by?.email}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {item?.timestamp?.split('T')[0]}
                                        </div>
                                    </div>
                                </div>
                                <div className="py-3">
                                    <h2 className="font-semibold">
                                        {item?.title}
                                    </h2>
                                    <p> {item?.desc}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default Home
