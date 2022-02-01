import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup"
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
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
    fontSize: 20,
    padding: 10,
    fontWeight: theme.fontWeights.bold
  },
  form: {
    padding: 10,
    marginTop: 2,
    backgroundColor: theme.colors.textWhite
  }
})

const initialValues = {
  username: '',
  password: ''
}



const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required(),
  password: yup
    .string()
    .required()
})
export const SignInContainer = ({ signIn }) => {
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => {
        return (
          <View >
            <View style={styles.form}>
              <FormikTextInput name="username" placeholder="Username" />
              <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
              <Pressable onPress={handleSubmit} style={styles.submit}>
                <Text style={styles.buttonText}>Sign in</Text>
              </Pressable>
            </View>
          </View>
        )
      }
      }
    </Formik>
  )
}
const SignInForm = () => {
  const [signIn] = useSignIn()
  return <SignInContainer signIn={signIn} />
};

export default SignInForm