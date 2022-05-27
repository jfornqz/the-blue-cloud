import { Fragment } from 'react'

import Card from './Card'

const Dashboard = () => {
    return (
        <Fragment>
            <div className="w-full grow flex flex-col bg-gray-100">
                <div className='w-full h-1/4 flex flex-col pl-12 pr-12'>
                    <div className='h-auto w-full pt-7 pb-4'>
                        <h1 className='text-2xl text-gray-700 font-semibold'>Dashboard</h1>
                    </div>
                    <div className='w-full grow flex space-x-20'>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>

                <div className='w-full grow p-12'>
                    <div className='shadow-lg rounded-xl w-full h-full bg-white'>

                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
