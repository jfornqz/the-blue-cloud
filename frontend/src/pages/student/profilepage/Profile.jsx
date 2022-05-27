import { Fragment } from 'react'
import logo from '../../../assets/images/logo.png'
import { useLocation, Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { SUBMISSION_BY_USERID } from '../../../graphql/query'
import { useUserStorage } from '../../../contexts/UserContext'
import Card from './Card'

const Profile = () => {
    const { pathname: currentPath } = useLocation()
    const { user } = useUserStorage()

    const { loading, error, data } = useQuery(SUBMISSION_BY_USERID, {
        variables: {
            submissionsFilter: {
                submitted_by: user._id,
            },
        },
    })

    return (
        <Fragment>
            <div className="container mx-auto mt-8 space-y-4">
                <p className="font-bold text-2xl">Dashboard</p>
                <div className="flex space-x-8 ">
                    <Card
                        color="bg-gray-200"
                        label="All Submission"
                        count={data?.submissions?.length}
                    />
                    <Card
                        color="bg-green-200"
                        label="Approved"
                        count={
                            data?.submissions?.filter(
                                (e) => e.status === 'Approved'
                            ).length
                        }
                    />
                    <Card
                        color="bg-red-200"
                        label="Reject"
                        count={
                            data?.submissions?.filter(
                                (e) => e.status === 'Reject'
                            ).length
                        }
                    />
                </div>
            </div>
            <div>
                {data?.submissions?.map((submission, index) => {
                    return (
                        <div key={index} className="flex pt-5">
                            <div className="w-full h-fit flex justify-center ml-10">
                                <div className="w-3/4 px-4 py-3 bg-white shadow sm:rounded-lg flex">
                                    <div className="py-3 flex h-full w-1/2">
                                        <Link
                                            to={`/description/${submission?.form_id?.title}`}
                                            className="font-semibold items-center flex"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {submission?.form_id?.title}
                                        </Link>
                                    </div>
                                    {submission?.status == 'Waiting' ? (
                                        <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                            <p className="bg-yellow-200 p-1.5 rounded-xl">
                                                Waiting
                                            </p>
                                        </div>
                                    ) : submission?.status == 'In progress' ? (
                                        <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                            <p className="bg-blue-200 p-1.5 rounded-xl">
                                                Approved
                                            </p>
                                        </div>
                                    ) : submission?.status == 'Approved' ? (
                                        <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                            <p className="bg-green-200 p-1.5 rounded-xl">
                                                Approved
                                            </p>
                                        </div>
                                    ) : submission?.status == 'Reject' ? (
                                        <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                            <p className="bg-red-200 p-1.5 rounded-xl">
                                                Approved
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {/* <div className="w-3/4 h-1/4 flex flex-col pl-12 pr-12">
                <div className="h-auto w-full pt-7 pb-4">
                    <h1 className="text-2xl text-gray-700 font-bold">
                        Dashboard
                    </h1>
                </div>
                <div className="w-full grow flex space-x-20">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            {data?.submissions?.map((submission, index) => {
                return (
                    <div key={index} className="flex pt-5">
                        <div className="w-full h-fit flex justify-center ml-10">
                            <div className="w-3/4 px-4 py-3 bg-white shadow sm:rounded-lg flex">
                                <div className="py-3 flex h-full w-1/2">
                                    <Link
                                        to={`/description/${submission?.form_id?.title}`}
                                        className="font-semibold items-center flex"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {submission?.form_id?.title}
                                    </Link>
                                </div>
                                {submission?.status == 'Waiting' ? (
                                    <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                        <p className="bg-yellow-100 p-1.5 rounded-xl">
                                            Waiting
                                        </p>
                                    </div>
                                ) : submission?.status == 'In progress' ? (
                                    <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                        <p className="bg-blue-100 p-1.5 rounded-xl">
                                            Approved
                                        </p>
                                    </div>
                                ) : submission?.status == 'Approved' ? (
                                    <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                        <p className="bg-green-100 p-1.5 rounded-xl">
                                            Approved
                                        </p>
                                    </div>
                                ) : submission?.status == 'Reject' ? (
                                    <div className="grow h-fit py-1 px-2 rounded-full flex justify-end">
                                        <p className="bg-red-100 p-1.5 rounded-xl">
                                            Approved
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )
            })} */}
        </Fragment>
    )
}

export default Profile
