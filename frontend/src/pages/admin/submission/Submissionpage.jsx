import { Fragment, useCallback, useState } from "react";
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery } from "@apollo/client";
import { ALL_SUBMISSION } from "../../../graphql/query";

import { useParams } from "react-router-dom";

import Modal from './Modal'

const Submissionpage = () => {

    const { formId } = useParams()
    const { data, loading } = useQuery(ALL_SUBMISSION)

    const [isOpen, setIsOpen] = useState(false)
    const [allData, setAllData] = useState({})

    return (
        <Fragment>
            <div className="w-full grow flex flex-col relative">
                <div className="h-12 w-full grid grNewPostid-cols-2 py-8 px-12 mb-6">
                    <h1 className="text-2xl font-bold">SUBMISSION</h1>
                    <div className="w-full h-full flex justify-end">
                    </div>
                </div>

                <div className="grow px-12">
                    <div className="w-full h-full shadow-xl bg-white rounded-t-xl border border-gray-200">
                        <div className="w-full h-14 bg-gray-200 rounded-t-xl grid-cols-5 grid grid-rows-1">
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">EMAIL</h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">NAME</h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">STATUS</h1>
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">DATE SUBMITTED</h1>
                        </div>

                        <div className="grow w-full grid grid-cols-5 grid-rows-1 p-4">
                            {
                                data?.submissions?.map((item, index) => {

                                    if (item?.form_id?._id === formId) {

                                        return (
                                            <Fragment key={index}>
                                                <h1 className="text-center pb-3">{item?.email ?? 'default title for null value'}</h1>
                                                <h1 className="text-center pb-3">{item?.fullname}</h1>
                                                <h1 className="text-center pb-3 text-gray-500">{item?.status}</h1>
                                                <h1 className="text-center pb-3 text-gray-500">{item?.timestamp.split('T')[0]}</h1>
                                                <button onClick={() => {
                                                    setIsOpen(true)
                                                    setAllData({ ...item })
                                                }}>DETAIL</button>
                                            </Fragment>
                                        )
                                    }
                                })
                            }
                        </div>

                    </div>
                </div>
                {
                    isOpen && (
                        <Modal setIsOpen={setIsOpen} allData={allData} />
                    )
                }

            </div>
        </Fragment>
    )
}

export default Submissionpage