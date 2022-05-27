import { Fragment } from 'react'
import dayjs from 'dayjs'
const Card = ({ title, post_by, desc, timestamp, images, topic }) => {
    return (
        <Fragment>
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white px-6 py-6 space-y-4">
                <div className="inline-flex">
                    <p className="text-xl font-bold">{post_by?.fullname}</p>
                    <p className="pl-4">{dayjs().from(dayjs(timestamp))}</p>
                </div>
                <div className="flex space-x-6">
                    {images.length === 0 ? (
                        <img
                            src="https://dummyimage.com/245x245/E5E5E5/fff"
                            className="max-w-full h-auto"
                            alt="..."
                        />
                    ) : (
                        <img
                            src={images[0]}
                            className="max-w-full h-auto"
                            alt="..."
                        />
                    )}

                    <div className="space-y-4">
                        <span>
                            <div className="text-lg font-semibold ">
                                <p>{title}</p>
                            </div>
                            <div className="text-sm font-semibold text-blue-400">
                                <p>#{topic}</p>
                            </div>
                        </span>

                        <div className="text-md">
                            <p>{desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Card
