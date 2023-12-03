'use client';
import Link from 'next/link';
import { Exercise } from '../page';

type workoutProgram = {
  workoutProgramId: number;
  name: string;
  description: string;
  exercises: Exercise;
  personalTrainerId: number;
  clientId: number;
};

const createUser = async (_workoutProgram: workoutProgram) => {
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Users';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken = 'YOUR_ACCESS_TOKEN';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        workoutProgramId: _workoutProgram.workoutProgramId,
        name: _workoutProgram.name,
        description: _workoutProgram.description,
        exercises: _workoutProgram.exercises,
        personalTrainerId: _workoutProgram.personalTrainerId,
        clientId: _workoutProgram.clientId,
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
  const exercise: Exercise = {
    exerciseId: parseInt(formData?.get('exerciseId')?.toString()!),
    name: 'string',
    description: 'string',
    sets: undefined,
    repetitions: undefined,
    time: 'string',
    workoutProgramId: undefined,
    personalTrainerId: undefined,
  };

  const _workoutProgram: workoutProgram = {
    workoutProgramId: parseInt(formData?.get('workoutProgramId')?.toString()!),
    name: formData.get('name')?.toString()!,
    description: formData.get('description')?.toString()!,
    exercises: exercise,
    personalTrainerId: parseInt(
      formData?.get('personalTrainerId')?.toString()!
    ),
    clientId: parseInt(formData?.get('clientId')?.toString()!),
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

export default async function createNewWorkoutProgram() {
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
