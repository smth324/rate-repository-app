import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW)

    const deleteReview = async ({ reviewId }) => {
        const returned = await mutate({ variables: { reviewId } })
        return returned
    }

    return { deleteReview, result }
};

export default useDeleteReview;