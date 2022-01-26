import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
    },
    tabs: {
        paddingTop: 10,
        padding: 15,
    }
});

const AppBar = () => {
    const { data } = useQuery(CURRENT_USER, {
        fetchPolicy: 'cache-and-network'
    })
    const authStorage = useAuthStorage()
    const client = useApolloClient()

    const signOut = async () => {
        await authStorage.removeAccessToken()
        client.resetStore()
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab link="/" name="Repositories" />
                {data ?
                    data.me ?
                        <Pressable onPress={signOut} style={styles.tabs}>
                            <Text color="white" fontWeight="bold">Sign Out</Text>
                        </Pressable>
                        : <AppBarTab link="/signin" name="Sign In" />
                    : null}
            </ScrollView>
        </View>
    )
};


export default AppBar;  