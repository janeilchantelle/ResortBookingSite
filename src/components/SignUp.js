import { Auth } from 'aws-amplify';

async function handleSignUp({ username, password, email, firstName, lastName }) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        given_name: firstName,
        family_name: lastName,
      },
    });

    console.log('Sign up successful:', user);
  } catch (error) {
    console.error('Error signing up:', error);
  }
}

export default handleSignUp;  