import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        margin: 5,
        fontSize: 20,
        padding: 8,
        borderRadius: 5,
        borderColor: '#D3D3D3'
    },
    error: {
        borderColor: theme.colors.errorMessage
    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [
        styles.input,
        error && styles.error,
        style,
    ];
console.log(error)
return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;