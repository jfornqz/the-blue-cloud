import { Fragment } from 'react'

const Card = () => {
    return (
        <Fragment>
            <div className="w-1/3 max-w-full h-6/7 bg-white shadow-md rounded-xl flex flex-row">
                <div className="ml-7 my-5">
                    <div className="h-16 w-16 bg-gray-300 rounded-full relative"></div>
                </div>
                <div className="ml-7 my-3">
                    <h1 className="text-xl text-gray-700 font-bold mt-3">77</h1>
                    <p className="text-l text-gray-400 font-medium mt-1">
                        All Posts
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default Card
