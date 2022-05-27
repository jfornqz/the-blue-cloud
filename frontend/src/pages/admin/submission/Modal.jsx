import { Fragment } from "react";

const Modal = ({ setIsOpen, allData }) => {
    console.log(allData)

    return (
        <Fragment>
            <div className="w-full h-full absolute bg-gray-200 bg-opacity-60 top-0 left-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-white flex flex-col">
                    <div className="w-full grow flex flex-col">
                        <div className="w-full h-1/4 flex p-3 flex-wrap">
                            <h1 className="w-1/2 text-xl">คำร้องขอลงทะเบียนเรียน</h1>
                            <div className='w-1/2 flex justify-end pr-3'>
                                <h1>{allData?.status}</h1>
                            </div>
                            <h1 className="mr-2">{allData?.fullname ?? 'No data'}</h1>
                            <h1>{allData?.email ?? 'No data'}</h1>
                        </div>

                        <div className="w-full grow p-3 flex">
                            <div className="w-1/2 h-full flex flex-col">
                                <h1 className="text-lg font-medium">เอกสารที่อัพโหลด</h1>
                                <h1 className="text-sm font-medium pl-1 mt-1">เอกสารที่อัพโหลด.pdf</h1>

                                <div className="w-full grow pt-7">
                                    <h1 className="mb-2">Note</h1>
                                    <input type="text" className="w-full h-10 rounded-lg border border-gray-300 focus:outline-none pl-3" />

                                </div>
                            </div>
                            <div className="w-1/2 h-full ">
                                <select className="w-2/3 border border-gray-300 h-1/6 p-2 rounded-lg focus:outline-none">
                                    <option>Waiting</option>
                                    <option>In Progress</option>
                                    <option>Approve</option>
                                    <option>Reject</option>
                                </select>

                            </div>
                        </div>

                    </div>

                    <div className='w-full h-14 flex space-x-5 justify-center'>
                        <button>Save</button>
                        <button onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Modal