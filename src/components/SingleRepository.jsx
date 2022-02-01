import RepositoryItem from "./RepositoryItem"
import { useParams } from 'react-router-native';
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";
import useSingleRepository from "../hooks/useSingleRepository";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

export const SingleRepositoryContainter = ({ repository, onEndReach }) => {

    const ItemSeparator = () => <View style={styles.separator} />;
    const renderItem = ({ item }) => (
        <ReviewItem item={item} />
    )
    if (!repository) {
        return null
    }
    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map(edge => edge.node)
        : [];
    return (
        <FlatList
            data={reviewNodes}
            ListHeaderComponent={() => <View><RepositoryItem item={repository} showLink={true} /><View style={styles.separator} /></View>}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReach}
            ItemSeparatorComponent={ItemSeparator}
        />
    )
}

const SingleRepository = () => {
    const { repositoryId } = useParams()
    const { repository, fetchMore } = useSingleRepository({ repositoryId, first: 5 })
    const onEndReach = () => {
        fetchMore()
    }
    return (<SingleRepositoryContainter repository={repository} onEndReach={onEndReach} />);
}

export default SingleRepository