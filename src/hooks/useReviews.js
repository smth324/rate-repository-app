import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';

const useReviews = () => {
    const { data, loading, refetch, fetchMore, ...result } = useQuery(CURRENT_USER, {
        variables: { includeReviews: true, first: 8 },
        fetchPolicy: 'cache-and-network'
    })
    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return
        }
        fetchMore({
            variables: {
                after: data.me.reviews.pageInfo.endCursor,
                includeReviews: true,
                first: 8
            }
        })
    }
    if (!data) {
        return { repositories: data, loading }
    }
    return { reviews: data.me.reviews, loading, refetch, fetchMore: handleFetchMore, ...result }
};

export default useReviews;