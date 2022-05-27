import { Fragment } from "react";

const Modal = ({ setIsOpen, allData }) => {
    console.log(allData)

    return (
        <Fragment>
            <div className="w-full h-full absolute bg-gray-200 bg-opacity-60 top-0 left-0 flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-white flex flex-col shadow-lg rounded-xl pl-5 pt-2">
                    <div className="w-full grow flex flex-col">
                        <div className="w-full h-1/4 flex p-3 flex-wrap">
                            <h1 className="w-1/2 text-2xl font-bold font-serif -mb-1">{allData?.title ?? 'No title'}</h1>
                            <div className='w-1/2 flex justify-end pr-3'>
                                <div className="bg-blue-100 rounded-md h-6 px-1.5 ">
                                    <h1 className=" font-semibold">{allData?.status}</h1>
                                </div>
                            </div>
                            <h1 className="mr-2">{allData?.fullname ?? 'No data'}</h1>
                            <h1>{allData?.email ?? 'No data'}</h1>
                        </div>

                        <div className="w-full grow p-3 flex">
                            <div className="w-1/2 h-full flex flex-col">
                                <h1 className="text-xl font-bold">เอกสารที่อัพโหลด</h1>
                                {
                                    allData?.file?.map((item) => {
                                        return <h1 className="text-sm font-medium mt-1">{item}</h1>
                                    })
                                }

                                <div className="w-full grow pt-7">
                                    <h1 className="mb-2">Note</h1>
                                    <input
                                        type="text"
                                        id=''
                                        value={allData?.note}
                                        className="w-full h-10 rounded-lg border border-gray-300 focus:outline-none pl-3"
                                    />

                                </div>
                            </div>

                            <div className="w-1/2 pl-5 h-full">
                                <div className="font-bold mb-1">
                                    Status
                                </div>
                                <select className="w-11/12 border border-gray-300 p-2 rounded-lg focus:outline-none">
                                    <option className="">Waiting</option>
                                    <option className="">In Progress</option>
                                    <option className="">Approve</option>
                                    <option className="">Reject</option>
                                </select>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-14 flex space-x-5 justify-center'>
                        <div>
                            <button className="bg-black rounded-md text-white w-36 py-2 mr-5 text-medium font-semibold">Save</button>
                            <button className="bg-slate-200 rounded-md w-36 py-2 text-medium font-semibold" onClick={() => setIsOpen(false)}>Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Modal