import { Formik } from "formik"
import { View, Pressable, StyleSheet } from "react-native"
import FormikTextInput from "./FormikTextInput"
import theme from "../theme"
import Text from "./Text"
import * as yup from "yup"
import useSignUp from "../hooks/useSignUp"

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
    password: '',
    passwordConfirmation: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1)
        .max(30)
        .required(),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required(),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords don't match")
        .required()
})
const SignUpForm = () => {
    const [signUp] = useSignUp()
    const onSubmit = async (values) => {
        try {
            await signUp(values)
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => {
                return (
                    <View style={styles.form}>
                        <FormikTextInput name='username' placeholder='Username' />
                        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
                        <FormikTextInput name='passwordConfirmation' placeholder='Password Confirmation' secureTextEntry={true} />
                        <Pressable onPress={handleSubmit} style={styles.submit}>
                            <Text style={styles.buttonText}>Sign up</Text>
                        </Pressable>
                    </View>
                )
            }}
        </Formik>
    )
}

export default SignUpForm