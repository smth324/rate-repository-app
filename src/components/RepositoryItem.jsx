import { View, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.colors.textWhite
    },
    header: {
        flexDirection: 'row'
    },
    subHeader: {
        paddingLeft: 10,
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50
    },
    statConainter: {
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    statStack: {
        alignItems: 'center',
        paddingTop: 15
    },
    language: {
        backgroundColor: theme.colors.primary,
        padding: 3,
        margin: 2,
        alignSelf: 'flex-start',
        borderRadius: 5
    },
    submit: {
        backgroundColor: theme.colors.primary,
        padding: 3,
        margin: 2,
        borderRadius: 5,
        marginTop: 5
    },
    buttonText: {
        color: theme.colors.textWhite,
        alignSelf: 'center',
        fontSize: 15,
        padding: 10,
        fontWeight: theme.fontWeights.bold
    },
});

const StatStack = ({ name, value }) => {
    var stat = value
    if (value >= 1000) {
        const rounded = Math.round(value / 100) / 10
        stat = `${rounded}k`
    }

    return (
        <View testID={`${name}`} style={styles.statStack}>
            <Text color="primary" fontWeight={"bold"}>{stat}</Text>
            <Text color="textSecondary">{name}</Text>
        </View>
    )
}
const RepositoryItem = ({ item, showLink }) => (
    <View style={styles.container} testID='repositoryItem'>
        <View style={styles.header}>
            <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
            <View style={styles.subHeader}>
                <Text fontWeight="bold" color="textPrimary" fontSize={"subheading"}>{item.fullName}</Text>
                <Text color="textSecondary">{item.description}</Text>
                <Text color="white" style={styles.language}>{item.language}</Text>
            </View>
        </View>
        <View testID='stats' style={styles.statConainter}>
            <StatStack name="Stars" value={item.stargazersCount} />
            <StatStack name="Forks" value={item.forksCount} />
            <StatStack name="Reviews" value={item.reviewCount} />
            <StatStack name="Ratings" value={item.ratingAverage} />
        </View>
        {showLink
            ?
            <Pressable style={styles.submit} onPress={() => Linking.openURL(item.url)}>
                <Text style={styles.buttonText}>Open in GitHub</Text>
            </Pressable>
            :
            null
        }
    </View>
)


export default RepositoryItem;