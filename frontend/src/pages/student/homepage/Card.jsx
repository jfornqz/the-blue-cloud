import { Fragment } from 'react'

const Card = ({ title, post_by, desc, timestamp, images }) => {
    return (
        <Fragment>
            <div className="rounded-xl shadow-lg border border-gray-200 px-8 py-8 space-y-4">
                <div className="inline-flex">
                    <p className="text-xl font-bold">{post_by?.fullname}</p>
                    <p className="pl-4">{timestamp?.split('T')[0]}</p>
                </div>
                <div className="flex space-x-6">
                    <img
                        src="https://dummyimage.com/245x245/E5E5E5/fff"
                        class="max-w-full h-auto"
                        alt="..."
                    />
                    <div className="space-y-4">
                        <div className="text-lg font-semibold ">
                            <p>{title}</p>
                        </div>
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
