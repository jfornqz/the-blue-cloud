import { Fragment } from 'react'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_FORM } from '../../../graphql/query'

import { NavLink } from 'react-router-dom'

const ViewForm = () => {
    const { data, loading } = useQuery(ALL_FORM)

    return (
        <Fragment>
            <div className="w-full h-full flex flex-col space-y-10 pt-10">
                <div className="w-full h-10 max-h-10 flex justify-center">
                    <div className="relative w-1/2 h-10">
                        <input
                            type="text"
                            className="h-full w-full focus:outline-none pl-3 rounded-xl border border-gray-400"
                            placeholder="ค้นหา"
                        />
                    </div>
                </div>
                {data?.forms?.map((form, index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            <div className="w-3/4 px-4 py-3 bg-white shadow sm:rounded-lg">
                                <div className="py-3 w-full flex">
                                    <div className="w-1/2">
                                        <NavLink
                                            to={`/description/${form?.title}`}
                                            className="font-semibold"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => console.log('1')}
                                        >
                                            {form?.title}
                                        </NavLink>
                                    </div>
                                    {/* click download icon and all docs of that form will be downloaded */}
                                    <div className="grow h-auto flex justify-end">
                                        <DownloadRoundedIcon
                                            onClick={() => {
                                                console.log('hi')
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Fragment>
    )
}

export default ViewForm
