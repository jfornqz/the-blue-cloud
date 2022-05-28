import { useQuery } from '@apollo/client'
import { Fragment } from 'react'
import { useUserStorage } from '../../../contexts/UserContext'
import {
    ALL_FORM,
    ALL_POST,
    SUBMISSION_BY_USERID,
} from '../../../graphql/query'
import Card from './Card'

const Dashboard = () => {
    const { user } = useUserStorage()
    const {
        loading,
        error,
        data: submissionData,
    } = useQuery(SUBMISSION_BY_USERID)
    const { data: postData } = useQuery(ALL_POST)
    const { data: formData } = useQuery(ALL_FORM)

    return (
        <Fragment>
            <div className="w-full grow flex flex-col bg-gray-100 space-y-16">
                <div className="w-full h-1/4 flex flex-col pl-12 pr-12">
                    <div className="h-auto w-full pt-7 pb-4">
                        <h1 className="text-2xl text-gray-700 font-bold">
                            Dashboard
                        </h1>
                    </div>
                    <div className="w-full grow flex space-x-20">
                        <Card
                            color="bg-gray-200"
                            label="Posts"
                            count={postData?.posts?.length}
                        />
                        <Card
                            color="bg-gray-200"
                            label="Forms"
                            count={formData?.forms?.length}
                        />
                    </div>
                </div>
                <div className="w-full h-1/4 flex flex-col pl-12 pr-12">
                    <div className="h-auto w-full pt-7 pb-4">
                        <h1 className="text-xl text-gray-700 font-semibold">
                            Submission
                        </h1>
                    </div>
                    <div className="w-full grow flex space-x-20">
                        <Card
                            color="bg-yellow-200"
                            label="Waiting"
                            count={
                                submissionData?.submissions?.filter(
                                    (e) => e.status === 'Waiting'
                                ).length
                            }
                        />
                        <Card
                            color="bg-blue-200"
                            label="In progress"
                            count={
                                submissionData?.submissions?.filter(
                                    (e) => e.status === 'In_progress'
                                ).length
                            }
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard
