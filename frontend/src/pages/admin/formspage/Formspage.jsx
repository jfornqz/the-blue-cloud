import { Fragment } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { ALL_FORM } from '../../../graphql/query'

const Postspage = () => {
    const { data, loading } = useQuery(ALL_FORM)

    return (
        <Fragment>
            <div className="w-full grow flex flex-col space-y-8">
                <div className="h-12 w-full grid grid-cols-2 py-8 px-12">
                    <h1 className="text-2xl font-bold">Submission</h1>
                    <div className="w-full h-full flex justify-end"></div>
                </div>

                <div className="grow px-12">
                    <div className="w-full h-full shadow-xl bg-white rounded-t-xl border border-gray-200">
                        <div className="w-full h-14 bg-gray-200 rounded-t-xl grid-cols-4 grid grid-rows-1">
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                STUDENT ID
                            </h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                NAME
                            </h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                STATUS
                            </h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                DATE SUBMITTED
                            </h1>
                        </div>

                        <div className="grow w-full grid grid-cols-4 grid-rows-1 p-4">
                            {data?.forms?.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <h1 className="text-center pb-3">
                                            action
                                        </h1>
                                        <h1 className="text-center pb-3">
                                            action
                                        </h1>
                                        <h1 className="text-center pb-3 text-gray-500">
                                            action
                                        </h1>
                                        <h1 className="text-center pb-3">
                                            action
                                        </h1>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Postspage
