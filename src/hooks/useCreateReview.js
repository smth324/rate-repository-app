import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from 'react-router-native'

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate()

    const createReview = async (review) => {
        const returned = await mutate({ variables: { review: {...review, rating: parseInt(review.rating)} } })
        navigate(`/${returned.data.createReview.repositoryId}`)
        return returned
    };
    return [createReview, result];
};

export default useCreateReview