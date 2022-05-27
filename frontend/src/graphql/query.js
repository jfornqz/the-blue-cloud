import { gql } from '@apollo/client'

export const QUERY_ME = gql`
    query ($id: MongoID!) {
        me(_id: $id) {
            email
            role
            _id
        }
    }
`

export const ALL_POST = gql`
    {
        posts {
            _id
            title
            desc
            timestamp
            images
            post_by {
                email
                role
                _id
                fullname
            }
            topic
        }
    }
`

export const ALL_FORM = gql`
    {
        forms {
            _id
            title
            desc
            timestamp
            status
            post_by {
                email
            }
            file
            submissions {
                status
                file
                timestamp
                submitted_by {
                    email
                    role
                    _id
                }
                form_id {
                    title
                    desc
                    timestamp
                    post_by {
                        forms {
                            _id
                            desc
                            title
                        }
                    }
                }
            }
        }
    }
`

export const POST_BY_ID = gql`
    query PostId($id: MongoID!) {
        postId(_id: $id) {
            _id
            title
            desc
            timestamp
            images
            topic
            post_by {
                _id
                fullname
                email
            }
        }
    }
`

export const FORM_BY_ID = gql`
    query FormId(
        $id: MongoID!
        $submissionsFilter: FilterFindManySubmissionInput
    ) {
        formId(_id: $id) {
            _id
            title
            desc
            timestamp
            file
            status
            post_by {
                _id
                email
                fullname
            }
            submissions(filter: $submissionsFilter) {
                _id
                status
                file
                timestamp
                note
            }
        }
    }
`

export const SUBMISSION_BY_ID = gql`
    query ($id: MongoID!) {
        submissionId(_id: $id) {
            _id
            file
            note
            status
            submitted_by {
                email
                fullname
            }
        }
    }
`

export const SUBMISSION_BY_USERID = gql`
    query Submissions($submissionsFilter: FilterFindManySubmissionInput) {
        submissions(filter: $submissionsFilter) {
            _id
            status
            file
            timestamp
            note
            form_id {
                _id
                title
                desc
                file
            }
        }
    }
`

export const ALL_SUBMISSION = gql`
    query ($filter: FilterFindManySubmissionInput) {
        submissions(filter: $filter) {
            _id
            file
            note
            status
            form_id {
                _id
                title
                desc
                timestamp
            }
            submitted_by {
                email
                fullname
            }
        }
    }
`
