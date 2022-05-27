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
    }
`
