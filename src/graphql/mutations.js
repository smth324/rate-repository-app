import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation authenticate($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password}) {
            accessToken
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation($review: CreateReviewInput) {
       createReview(review: $review) {
        repositoryId
      }
     }
`

export const SIGN_UP = gql`
     mutation createUser($username: String!, $password: String!) {
         createUser(user: { username: $username, password: $password}) {
             username
         }
     }
`

export const DELETE_REVIEW = gql`
     mutation deleteReview($reviewId: ID!) {
         deleteReview(id: $reviewId)
     }
`