import { View, StyleSheet } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RespositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import theme from '../theme';
import SignInForm from './SignInForm';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.textSecondary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
      <Route path="/myreviews" element={<MyReviews/>}/>
        <Route path="/createReview" element={<ReviewForm/>}/>
        <Route path="/:repositoryId" element={<SingleRepository/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        <Route path="/signin" element={<SignInForm/>}/>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;