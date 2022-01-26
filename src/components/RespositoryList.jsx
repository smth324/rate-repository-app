import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import RepositoryItem from './RepositoryItem'
import useRepositories
 from '../hooks/useRepositories';
const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: theme.colors.textSecondary
    },
});


const RepositoryList = () => {
    const { repositories } = useRepositories();
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    const renderItem = ({ item }) => (
        <RepositoryItem item={item} />
    )

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={x => x.id}
        />
    );
}

export default RepositoryList;