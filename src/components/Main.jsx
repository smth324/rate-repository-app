import { View, StyleSheet } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RespositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textWhite,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;