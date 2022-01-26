import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges {
      node {
        description
        fullName
        ratingAverage
        reviewCount
        forksCount
        stargazersCount
        language
        ownerAvatarUrl
        id
      }
    }
  }
}
`

export const CURRENT_USER = gql`
query {
  me {
      username
  }
}
`