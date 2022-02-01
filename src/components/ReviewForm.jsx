import { Formik } from "formik"
import { View, StyleSheet, Pressable } from "react-native"
import theme from "../theme"
import FormikTextInput from "./FormikTextInput"
import Text from "./Text"
import * as yup from "yup"
import useCreateReview from "../hooks/useCreateReview"

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
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required(),
    repositoryName: yup
        .string()
        .required(),
    rating: yup
        .number()
        .min(0)
        .max(100)
        .required()
        .typeError('Rating must be a number between 0-100'),
})

const ReviewForm = () => {
    const [createReview] = useCreateReview()
    const onSubmit = async (values) => {
        try {
            await createReview(values)
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
                    <View style={styles.form}>
                        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
                        <FormikTextInput name="repositoryName" placeholder="Repository name" />
                        <FormikTextInput name="rating" placeholder="Rating" />
                        <FormikTextInput name="text" placeholder="Review" />
                        <Pressable onPress={handleSubmit} style={styles.submit}>
                            <Text style={styles.buttonText}>Create a review</Text>
                        </Pressable>
                    </View>
                )
            }}
        </Formik>
    )
}

export default ReviewForm