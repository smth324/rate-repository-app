import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn'

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const signIn = jest.fn()
            const { getByPlaceholderText, getByText } = render(<SignInContainer signIn={signIn}/>)
            fireEvent.changeText(getByPlaceholderText('Username'), 'kalle')
            fireEvent.changeText(getByPlaceholderText('Password'), 'password')
            fireEvent.press(getByText('Sign in'))
            await waitFor(() => {
                expect(signIn).toHaveBeenCalledTimes(1)
                expect(signIn.mock.calls[0][0]).toEqual({username: 'kalle', password: 'password'})
            });
        });
    });
});