import { gql } from '@apollo/client';

export const GET_SINGLE_REPOSITORY = gql`
  query getRepository($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      description
      fullName
      ratingAverage
      reviewCount
      forksCount
      stargazersCount
      language
      ownerAvatarUrl
      id
      url
      reviews(after: $after, first: $first) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`
export const GET_REPOSITORIES = gql`
query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
  pageInfo {
    endCursor
    startCursor
    hasNextPage
  }
  }
}
`

export const CURRENT_USER = gql`
query Me($includeReviews: Boolean = false, $after: String, $first: Int) {
  me {
      username
      id
      reviews(after: $after, first: $first) @include(if: $includeReviews) {
        edges {
          node {
            rating
            text
            createdAt
            repositoryId
            id
            user {
              username
            }
            repository {
              fullName
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
  }
}
`