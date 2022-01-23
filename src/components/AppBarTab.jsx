import { StyleSheet, Pressable, Alert } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
    tabs: {
        paddingTop: 10,
        padding: 15,
    }
});
const AppBarTab = ({ name, link }) => {
    return (
        <Pressable style={styles.tabs}>
            <Link to={link}><Text color="white" fontWeight="bold">{name}</Text></Link>
        </Pressable>
    )
}

export default AppBarTab