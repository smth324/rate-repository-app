import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        alignItems: 'center'
    },
    tabs: {
        paddingTop: 10,
        padding: 15,
    }
});

const AppBar = () => {
    const navigate = useNavigate()
    const { data } = useQuery(CURRENT_USER, {
        fetchPolicy: 'cache-and-network'
    })
    const authStorage = useAuthStorage()
    const client = useApolloClient()

    const signOut = async () => {
        await authStorage.removeAccessToken()
        client.resetStore()
        navigate('/')
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab link="/" name="Repositories" />
                {data ?
                    data.me ?
                        <>
                            <AppBarTab link="/createReview" name="Create a review" />
                            <AppBarTab link="/myreviews" name="My reviews" />
                            <Pressable onPress={signOut} style={styles.tabs}>
                                <Text color="white" fontWeight="bold">Sign Out</Text>
                            </Pressable>
                        </>
                        :
                        <>
                            <AppBarTab link="/signin" name="Sign in" />
                            <AppBarTab link="/signup" name="Sign up"/>
                        </>
                    : null}
            </ScrollView>
        </View>
    )
};


export default AppBar;  