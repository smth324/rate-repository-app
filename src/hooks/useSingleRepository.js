import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = ({ repositoryId, first }) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPOSITORY, {
    variables: { repositoryId, first },
    fetchPolicy: 'cache-and-network',
  })
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        repositoryId,
        first
      }
    })
  }
  if (!data) {
    return { repository: data, loading }
  }
  return { repository: data.repository, loading, fetchMore: handleFetchMore, ...result }
};

export default useSingleRepository;