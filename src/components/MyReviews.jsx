import { FlatList, StyleSheet, View } from "react-native"
import useReviews from "../hooks/useReviews"
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    }
});

const MyReviews = () => {
    const { reviews, refetch, fetchMore } = useReviews()
    const reviewNodes = reviews
        ? reviews.edges.map(edge => edge.node)
        : [];
    const ItemSeparator = () => <View style={styles.separator} />
    const renderItem = ({ item }) => (
        <ReviewItem item={item} refetch={refetch} />
    )
    const onEndReach = () => {
        fetchMore()
    }
    return (
        <FlatList
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={x => x.id}
            renderItem={renderItem}
            onEndReachedThreshold={1}
            onEndReached={onEndReach}
        />
    )
}

export default MyReviews