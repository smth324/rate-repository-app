import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        backgroundColor: '#ffcccb',
        color: theme.colors.errorMessage,
        borderColor: theme.colors.errorMessage,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        marginHorizontal: 5
    },
    errorInput: {
        borderColor: theme.colors.errorMessage
    }
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
                multiline={name === 'review'}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;