import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Mutation($password: String!, $email: String) {
        login(password: $password, email: $email) {
            token
            user {
                email
            }
        }
    }
`

export const CREATE_ONE_POST = gql`
    mutation Mutation($record: CreateOnePostInput!) {
        createOnePost(record: $record) {
            record {
                title
                desc
                topic
                post_by {
                    _id
                }
            }
        }
    }
`

export const CREATE_ONE_FORM = gql`
    mutation CreateOneForm($record: CreateOneFormInput!) {
        createOneForm(record: $record) {
            record {
                title
                desc
                post_by {
                    _id
                }
                file
                status
            }
        }
    }
`
export const CREATE_SUBMISSION = gql`
    mutation CreateOneSubmission($record: CreateOneSubmissionInput!) {
        createOneSubmission(record: $record) {
            record {
                _id
            }
        }
    }
    `


export const UPDATE_SUBMISSION = gql`
    mutation UpdateSubmissionId(
        $id: MongoID!
        $record: UpdateByIdSubmissionInput!
    ) {
        updateSubmissionId(_id: $id, record: $record) {
            record {
                _id
            }
        }
    }`