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
            title
            desc
            timestamp
            images
            post_by {
                email
                role
                _id
            }
        }
    }
`

export const ALL_FORM = gql`
    {
        forms {
            title
            desc
            timestamp
            status
            post_by {
                email
            }
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

export const ALL_SUBMISSION = gql`
    query ($filter: FilterFindManySubmissionInput) {
        submissions(filter: $filter) {
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
