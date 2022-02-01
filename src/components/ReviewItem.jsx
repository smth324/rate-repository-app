import { View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { format, parseISO } from 'date-fns'
import * as Linking from 'expo-linking';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: theme.colors.textWhite
    },
    header: {
        flexDirection: 'row'
    },
    subHeader: {
        paddingLeft: 10,
        flex: 1
    },
    rating: {
        width: 50,
        height: 50,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        borderRadius: 25,
        color: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ratingText: {
        color: theme.colors.primary
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },
    viewButton: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        marginRight: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: theme.colors.errorMessage,
        padding: 5,
        marginLeft: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: theme.colors.textWhite,
        alignSelf: 'center',
        fontSize: 14,
        padding: 10,
        fontWeight: theme.fontWeights.bold
    },
});

const ReviewItem = ({ item, refetch }) => {
    const { deleteReview } = useDeleteReview()

    const deleteReviewConfirmation = () => {
        return (
            Alert.alert(
                "Delete Review?"
                , `Are you sure you want to delete this review? ${item.repository.fullName}`
                , [{
                    text: "CANCEL",
                }, {
                    text: "DELETE",
                    onPress: () => {
                        deleteReview({ reviewId: item.id })
                        refetch()
                    }
                }])
        )
    }
    return (
        <View style={styles.container} testID='reviewItem'>
            <View style={styles.header}>
                <View style={styles.rating}><Text style={styles.ratingText} fontWeight="bold">{item.rating}</Text></View>
                <View style={styles.subHeader}>
                    {item.repositoryId
                        ? <Text fontWeight="bold" color="textPrimary" fontSize={"subheading"}>{item.repository.fullName}</Text>
                        : <Text fontWeight="bold" color="textPrimary" fontSize={"subheading"}>{item.user.username}</Text>}
                    <Text color="textSecondary">{format(parseISO(item.createdAt), 'MM.dd.yy')}</Text>
                    <Text>{item.text}</Text>
                </View>
            </View>
            {item.repositoryId ?
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.viewButton} onPress={() => Linking.openURL(item.repository.url)}>
                        <Text style={styles.buttonText}>View repository</Text>
                    </Pressable>
                    <Pressable style={styles.deleteButton} onPress={deleteReviewConfirmation}>
                        <Text style={styles.buttonText}>Delete Review</Text>
                    </Pressable>
                </View>
                : null}
        </View>
    )
}


export default ReviewItem;