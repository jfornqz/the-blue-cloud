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

export const CREATE_POST = gql`
    mutation Mutation($record: CreateOnePostInput!) {
        createPost(record: $record) {
            record {
                create_by
                desc
                images
                title
            }
        }
    }
`

export const CREATE_FORM = gql`
    mutation CreatePost($record: CreateOneFormInput!) {
        createForm(record: $record) {
            record {
                title
                desc
                timestamp
                post_by
                file
                submission
            }
        }
    }
`
