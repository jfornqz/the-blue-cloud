import { gql } from '@apollo/client'

export const QUERY_ME = gql`
    query ($id: MongoID!) {
        me(_id: $id) {
            username
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
                _id
                email
            }
        }
    }
`

export const QUERY_POST = gql`
    query PostId($id: MongoID!) {
        postId(_id: $id) {
            _id
            title
            desc
            timestamp
            images
            post_by {
                _id
                email
            }
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
            file
            status
            post_by {
                _id
                email
            }
            submissions {
                _id
                file
                status
                timestamp
                submitted_by {
                    _id
                    email
                }
            }
        }
    }
`

export const QUERY_FORM = gql`
    query FormId($id: MongoID!) {
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
            }
            submissions {
                _id
                file
                status
                timestamp
                submitted_by {
                    _id
                    email
                }
            }
        }
    }
`

export const QUERY_SUBMISSIONS = gql`
    query Submissions($filter: FilterFindManySubmissionInput) {
        submissions(filter: $filter) {
            _id
            status
            file
            timestamp
            form_id {
                _id
                title
            }
        }
    }
`
