'use client';
import Link from 'next/link';
import { User } from '../page';

const createUser = async (user: User) => {
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Users';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU3VwZXJtYW4iLCJSb2xlIjoiUGVyc29uYWxUcmFpbmVyIiwiVXNlcklkIjoiMiIsIm5iZiI6IjE3MDE2MzAxNDciLCJleHAiOiIxNzAxNzE2NTQ3In0.IXDIIdizeUqFHs_yv4kFQ4lt0MLdxPT1uiAHh3okXmc';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        personalTrainerId: user.personalTrainerId,
        accountType: 'Client',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

const handleSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const user: User = {
    userId: parseInt(formData?.get('personalTrainerId')?.toString()!),
    firstName: formData.get('firstName')?.toString()!,
    lastName: formData.get('lastName')?.toString()!,
    email: formData.get('email')?.toString()!,
    password: formData.get('password')?.toString()!,
    personalTrainerId: parseInt(
      formData?.get('personalTrainerId')?.toString()!
    ),
  };
  if (
    user.password != null &&
    user.email != null &&
    user.password.length > 0 &&
    user.email.length > 0
  ) {
    const TOKEN = createUser(user);
    // router.push('TrainerAllExercises');
    // router.refresh();
  } else alert('failed creating user');
};

export default async function AddClient() {
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <h2>
        {' '}
        <Link href='/personalTrainer'> Back </Link>{' '}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          userId:
          <input type='number' name='userId' />
        </label>
        <label>
          firstName:
          <input type='text' name='firstName' />
        </label>
        <label>
          lastName:
          <input type='text' name='lastName' />
        </label>
        <label>
          email:
          <input type='text' name='email' />
        </label>
        <label>
          Password:
          <input type='password' name='password' />
        </label>
        <label>
          personalTrainerId:
          <input type='number' name='personalTrainerId' />
        </label>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
