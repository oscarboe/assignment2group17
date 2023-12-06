'use client';
import Link from 'next/link';
import { User } from '../personalTrainer/page';

const createUser = async (user: User, accountType: string) => {
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Users';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiTWFuYWdlciIsIlJvbGUiOiJNYW5hZ2VyIiwiVXNlcklkIjoiMSIsIm5iZiI6IjE3MDE3ODcwNjgiLCJleHAiOiIxNzAxODczNDY4In0.6yumfqHVVS4qCKgP_B4EIube-Qx624nhS35qmfUdDow';

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
        accountType: accountType,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data:', data);
    alert('New user created');
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

const handleSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const user: User = {
    userId: 0,
    firstName: formData.get('firstName')?.toString()!,
    lastName: formData.get('lastName')?.toString()!,
    email: formData.get('email')?.toString()!,
    password: formData.get('password')?.toString()!,
    personalTrainerId: parseInt(
      formData?.get('personalTrainerId')?.toString()!
    ),
  };
  const accountType = formData.get('accountType')?.toString()!;
  if (
    user.password != null &&
    user.email != null &&
    user.password.length > 0 &&
    user.email.length > 0
  ) {
    createUser(user, accountType);
    // router.push('TrainerAllExercises');
    // router.refresh();
  } else alert('failed creating user set right parameters');
};

export default async function AddClient() {
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <form onSubmit={handleSubmit}>
        <li>
          <label>
            firstName:
            <input type='text' name='firstName' />
          </label>
        </li>
        <li>
          <label>
            lastName:
            <input type='text' name='lastName' />
          </label>
        </li>
        <li>
          <label>
            email:
            <input type='text' name='email' />
          </label>
        </li>
        <li>
          <label>
            Password:
            <input type='password' name='password' />
          </label>
        </li>
        <li>
          <label>
            personalTrainerId:
            <input type='number' name='personalTrainerId' />
          </label>
        </li>
        <li>
          <label>
            PersonalTrainer/Client:
            <input type='text' name='accountType' />
          </label>
        </li>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}
