import { Fragment } from 'react'

const Home = () => {
    return (
        <Fragment>
            <div className="w-full h-fit flex justify-center">
                <div className="w-3/4 my-5 placeholder:bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <span className="inline-flex">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Post Creator Name
                            </h3>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 ml-3">
                                17/5/2022
                            </h3>
                        </span>
                        <div className="py-3">
                            <h2 className="font-semibold">
                                ประชาสัมพันธ์โครงการ JTS Young Blood Startup
                                Sandbox
                            </h2>
                            <p>
                                description
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home