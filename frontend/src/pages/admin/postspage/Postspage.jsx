import { Fragment } from 'react'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_POST } from '../../../graphql/query'

const Postspage = () => {
    const { data, loading } = useQuery(ALL_POST)

    return (
        <Fragment>
            <div className="w-full grow flex flex-col space-y-8">
                <div className="h-12 w-full grid grid-cols-2 py-8 px-12">
                    <h1 className="text-2xl font-bold">ALL Posts</h1>
                    <div className="w-full h-full flex justify-end">
                        <button
                            type="button"
                            className="p-2 h-full rounded-xl bg-gray-700 text-white hover:duration-100 transition hover:bg-gray-900 shadow-lg"
                        >
                            NEW POST
                        </button>
                    </div>
                </div>

                <div className="grow px-12">
                    <div className="w-full h-full shadow-xl bg-white rounded-t-xl border border-gray-200">
                        <div className="w-full h-14 bg-gray-200 rounded-t-xl grid-cols-4 grid grid-rows-1">
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                TITLE
                            </h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                POST BY
                            </h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                CREATED DATE
                            </h1>
                        </div>

                        <div className="grow w-full grid grid-cols-4 grid-rows-1 p-4">
                            {data?.posts?.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <h1 className="text-center pb-3 truncate">
                                            {item?.title ??
                                                'default title for null value'}
                                        </h1>
                                        <h1 className="text-center pb-3">
                                            {item?.post_by?.email}
                                        </h1>
                                        <h1 className="text-center pb-3 text-gray-500">
                                            {item?.timestamp?.split('T')[0]}
                                        </h1>
                                        <div className="flex">
                                            <IconButton aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton aria-label="eye">
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
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
