import { useQuery } from '@apollo/client'
import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ALL_SUBMISSION, FORM_BY_ID } from '../../../graphql/query'
import Modal from './Modal'

const Submissionpage = () => {
    const { formId } = useParams()
    const { data, loading } = useQuery(ALL_SUBMISSION)
    const { data: formData } = useQuery(FORM_BY_ID, {
        variables: {
            id: formId,
        },
    })

    const [isOpen, setIsOpen] = useState(false)
    const [allData, setAllData] = useState({})

    return (
        <Fragment>
            <div className="w-full grow flex flex-col relative">
                <div className="h-12 w-full flex justify-between py-8 px-12 mb-6 ">
                    <h1 className="text-2xl font-bold">SUBMISSION</h1>
                    <div className="text-xl font-bold">
                        {formData?.formId?.title}
                    </div>
                </div>

                <div className="grow px-12">
                    <div className="w-full h-full shadow-xl bg-white rounded-t-xl border border-gray-200">
                        <div className="w-full h-14 bg-gray-200 rounded-t-xl grid-cols-5 grid grid-rows-1">
                            <h1 className="w-full h-full flex justify-center items-center text-gray-500 font-bold">
                                EMAIL
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

                        <div className="grow w-full grid grid-cols-5 grid-rows-1 p-4">
                            {data?.submissions?.map((item, index) => {
                                if (item?.form_id?._id === formId) {
                                    return (
                                        <Fragment key={index}>
                                            <h1 className="text-center pb-3">
                                                {item?.submitted_by?.email ??
                                                    'default title for null value'}
                                            </h1>
                                            <h1 className="text-center pb-3">
                                                {item?.submitted_by?.fullname}
                                            </h1>
                                            <h1 className="text-center text-gray-500 h-6 justify-center w-full flex font-semibold">
                                                <div className="w-1/2 rounded-2xl shadow-2xl ">
                                                    {item?.status}
                                                </div>
                                            </h1>

                                            <h1 className="text-center pb-3 text-gray-500">
                                                {item?.timestamp?.split('T')[0]}
                                            </h1>
                                            <div className="w-full flex justify-center">
                                                <button
                                                    className="bg-gray-800 text-white text-center h-6 w-24 rounded-xl shadow-lg"
                                                    onClick={() => {
                                                        setIsOpen(true)
                                                        setAllData({ ...item })
                                                    }}
                                                >
                                                    DETAIL
                                                </button>
                                            </div>
                                        </Fragment>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
                {isOpen && <Modal setIsOpen={setIsOpen} allData={allData} />}
            </div>
        </Fragment>
    )
}

export default Submissionpage
