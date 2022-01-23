import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    }
});

const Stat = ({ number }) => {
    if (number >= 1000) {
        const rounded = Math.round(number / 100) / 10
        return (
            `${rounded}k`
        )
    }
    return (
        number
    )
}

const StatStack = ({ name, value }) => {
    return (
        <View style={styles.statStack}>
            <Text color="primary" fontWeight={"bold"}><Stat number={value} /></Text>
            <Text color="textSecondary">{name}</Text>
        </View>
    )
}
const RepositoryItem = ({ item }) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
            <View style={styles.subHeader}>
                <Text fontWeight="bold" color="textPrimary" fontSize={"subheading"}>{item.fullName}</Text>
                <Text color="textSecondary">{item.description}</Text>
                <Text color="white" style={styles.language}>{item.language}</Text>
            </View>
        </View>
        <View>
            <View style={styles.statConainter}>
                <StatStack name="Stars" value={item.stargazersCount} />
                <StatStack name="Forks" value={item.forksCount} />
                <StatStack name="Review" value={item.reviewCount} />
                <StatStack name="Rating" value={item.ratingAverage} />
            </View>
        </View>
    </View>
)


export default RepositoryItem;