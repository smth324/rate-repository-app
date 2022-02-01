import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories
    from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    picker: {
        backgroundColor: "#D3D3D3",
        color: theme.colors.textPrimary
    },
    searchField: {
        margin: 10
    }
});

export const RepositoryListContainer = ({ repositories, setOrder, order, onEndReach }) => {
    const [search, setSearch] = useState()
    const [bouncedSearch] = useDebounce(search, 500)
    const navigate = useNavigate()
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    const ItemSeparator = () => <View style={styles.separator} />;

    useEffect(() => {
        setOrder({
            ...order, searchKeyword: bouncedSearch
        })
    },[bouncedSearch])

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} />
        </Pressable>
    )

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Searchbar
                        placeholder="Search repositories"
                        onChangeText={setSearch}
                        value={search}
                        style={styles.searchField}
                    />
                    <Picker
                        style={styles.picker}
                        selectedValue={order.picker}
                        onValueChange={(itemValue) => {
                            itemValue === "CREATED_AT" ?
                                setOrder({...order,
                                    orderBy: "CREATED_AT",
                                    orderDirection: "DESC",
                                    picker: "CREATED_AT"
                                })
                                :
                                setOrder({...order,
                                    orderBy: "RATING_AVERAGE",
                                    orderDirection: itemValue,
                                    picker: itemValue
                                })
                        }
                        }>
                        <Picker.Item label="Latest rated repositories" value="CREATED_AT" />
                        <Picker.Item label="Lowest rated repositories" value="ASC" />
                        <Picker.Item label="Highest rated repositories" value="DESC" />
                    </Picker>
                </>}
            onEndReached={onEndReach}
            onEndReachedThreshold={1}
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={x => x.id}
        />
    );
}

const RepositoryList = () => {
    const [order, setOrder] = useState({
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
        picker: "CREATED_AT",
        searchKeyword: undefined,
        first: 8
    })

    const onEndReach = () => {
        fetchMore()
    }

    const { repositories, fetchMore } = useRepositories(order);
    return <RepositoryListContainer repositories={repositories} setOrder={setOrder} order={order} onEndReach={onEndReach}/>
}

export default RepositoryList;