import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup"

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
    marginTop: 2
  }
})

const initialValues = {
  Username: '',
  Password: ''
}

const onSubmit = (values) => {
  console.log(values)
}

const validationSchema = yup.object().shape({
  Username: yup
    .string()
    .required(),
  Password: yup
    .string()
    .required()
})

const SignIn = () => {
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
              <FormikTextInput name="Username" placeholder="Username" />
              <FormikTextInput name="Password" placeholder="Password" secureTextEntry={true} />
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
};

export default SignIn