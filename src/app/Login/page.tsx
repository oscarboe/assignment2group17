'use client';
import { useRouter } from 'next/navigation';

const getAccessToken = async (_password: string, _username: string) => {
  const username = _username;
  const password = _password;

  try {
    const response = await fetch(
      'https://afefitness2023.azurewebsites.net/api/Users/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await response.json();
    const accessToken = tokenData.jwt;

    // Use the obtained access token in your application
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    alert('Login failed');
  }
};

// const router = useRouter();

const handleSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();
  if (
    password != null &&
    username != null &&
    password.length > 0 &&
    username.length > 0
  ) {
    const TOKEN = getAccessToken(password, username); //GET THE TOKEN
    // router.push('TrainerAllExercises');
    // router.refresh();
  } else alert('login failed');
};

export default function LoginPage() {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' name='username' />
      </label>
      <label>
        Password:
        <input type='password' name='password' />
      </label>
      <button type='submit'>Login</button>
    </form>
  );
}
