import { Fragment, useState } from 'react'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_FORM } from '../../../graphql/query'

import { NavLink } from 'react-router-dom'

const ViewForm = () => {
    const [items, SetItems] = useState([])
    const { data, loading } = useQuery(ALL_FORM, {
        onCompleted: (data) => SetItems(data.forms),
    })

    return (
        <Fragment>
            <div className="w-full h-full flex flex-col space-y-10 pt-10">
                <div className="w-full h-10 max-h-10 flex justify-center">
                    <div className="relative w-1/2 h-10">
                        <input
                            type="text"
                            className="h-full w-full focus:outline-none pl-3 rounded-xl border border-gray-300"
                            onChange={(e) => {
                                const newItem = Object.assign({}, data)
                                const itemFiltered = newItem.forms.filter(
                                    (form) => {
                                        return (
                                            form?.title?.search(
                                                e.target.value
                                            ) > -1
                                        )
                                    }
                                )
                                SetItems(itemFiltered)
                            }}
                            placeholder="ค้นหา"
                        />
                    </div>
                </div>
                {items.map((form, index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            <div className="w-3/4 px-4 py-3 bg-white shadow-xl sm:rounded-lg hover:bg-slate-100">
                                <div className="py-3 w-full flex">
                                    <div className="w-1/2 text-xl">
                                        <NavLink
                                            to={`/description/${form?._id}`}
                                            className="font-semibold"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => console.log('1')}
                                        >
                                            {form?.title}
                                        </NavLink>
                                    </div>
                                    <div className="grow h-auto flex justify-end">
                                        <a
                                            target="_blank"
                                            onClick={() => {
                                                form?.file.forEach((f) => {
                                                    window.open(f)
                                                })
                                            }}
                                        >
                                            <DownloadRoundedIcon />
                                        </a>
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
