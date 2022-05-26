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

export const ALL_FORM = gql`
    {
        forms {
            title
            desc
            timestamp
            post_by
            file
            submission
        }
    }
`
