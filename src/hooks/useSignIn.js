import { useMutation, useApolloClient } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage'
import { useNavigate } from 'react-router-native'

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);  
    const authStorage = useAuthStorage()
    const navigate = useNavigate()
    const client = useApolloClient()

    const signIn = async ({ username, password }) => {
        const returned = await mutate({ variables: { username, password } })
        await authStorage.setAccessToken(returned.data.authenticate.accessToken)
        client.resetStore()
        navigate('/')
        return returned
    };
    return [signIn, result];
};

export default useSignIn