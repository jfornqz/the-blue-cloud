import { Fragment } from 'react'
import logo from '../../../assets/images/logo.png'
import { useLocation, Link } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { SUBMISSION_BY_USERID } from '../../../graphql/query'

const Profile = () => {
    const { pathname: currentPath } = useLocation()
    const { loading, error, data } = useQuery(SUBMISSION_BY_USERID, {
        variables: {
            submissionsFilter: {
                submitted_by: '628fa74bfed3027e4d538ccc',
            },
        },
    })

    return (
        <Fragment>
            {/* <div className="w-full h-10 max-h-10 pt-5 flex ">
                <p className="text-2xl font-bold">Track Status</p>
            </div> */}
            {data?.submissions?.map((submission, index) => {
                return (
                    <div key={index} className="h-full flex pt-5">
                        <div className="w-full h-fit flex justify-center ml-10">
                            <div className="w-3/4 my-5 px-4 py-3 bg-white shadow sm:rounded-lg flex">
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
            })}
        </Fragment>
    )
}

export default Profile
