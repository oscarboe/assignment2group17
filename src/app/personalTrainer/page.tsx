'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type Exercise = {
  exerciseId: number;
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  time: string;
  workoutProgramId: number;
  personalTrainerId: number;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  personalTrainerId: number;
};

export type workoutProgram = {
  workoutProgramId?: number;
  name?: string;
  description: string;
  exercises: Exercise[];
  personalTrainerId: number;
  clientId: number;
};

const personalTrainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [workOuts, setWorkOuts] = useState<workoutProgram[]>([]);
  const [workOutOnId, setWorkOutOnId] = useState<workoutProgram>();

  useEffect(() => {
    const getUsers = async () => {
      const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Users';

      // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU3VwZXJtYW4iLCJSb2xlIjoiUGVyc29uYWxUcmFpbmVyIiwiVXNlcklkIjoiMiIsIm5iZiI6IjE3MDE2MzAxNDciLCJleHAiOiIxNzAxNzE2NTQ3In0.IXDIIdizeUqFHs_yv4kFQ4lt0MLdxPT1uiAHh3okXmc';

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: any = await response.json();
        console.log('Client Data:', data);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getWorkOuts = async () => {
      const apiUrl =
        'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms';

      // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU3VwZXJtYW4iLCJSb2xlIjoiUGVyc29uYWxUcmFpbmVyIiwiVXNlcklkIjoiMiIsIm5iZiI6IjE3MDE2MzAxNDciLCJleHAiOiIxNzAxNzE2NTQ3In0.IXDIIdizeUqFHs_yv4kFQ4lt0MLdxPT1uiAHh3okXmc';

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: any = await response.json();
        console.log('Workout Data:', data);
        setWorkOuts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getUsers();
    getWorkOuts();

    const x: workoutProgram = {
      description: '',
      exercises: [],
      personalTrainerId: 0,
      clientId: 0,
    };

    setWorkOutOnId(x);
  }, []);

  const getWorkOutOnId = async (workoutProgramId: number) => {
    const apiUrl =
      'https://afefitness2023.azurewebsites.net/api/WorkoutPrograms';

    // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOYW1lIjoiU3VwZXJtYW4iLCJSb2xlIjoiUGVyc29uYWxUcmFpbmVyIiwiVXNlcklkIjoiMiIsIm5iZiI6IjE3MDE2MzAxNDciLCJleHAiOiIxNzAxNzE2NTQ3In0.IXDIIdizeUqFHs_yv4kFQ4lt0MLdxPT1uiAHh3okXmc';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          WorkoutProgramId: workoutProgramId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: any = await response.json();
      console.log('Workout Data:', data);
      setWorkOutOnId(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const workoutProgramId = parseInt(
      formData?.get('workoutProgramId')?.toString()!
    );
    try {
      await getWorkOutOnId(workoutProgramId);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };
  return (
    <div>
      <div>
        <h2>
          {' '}
          <Link href='/'> Home </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link href='/personalTrainer/addclient'> Add client </Link>{' '}
        </h2>
        <h2>
          {' '}
          <Link href='/personalTrainer/createNewWorkoutProgram'>
            {' '}
            Add workout program{' '}
          </Link>{' '}
        </h2>
        <h1>Exercises in use:</h1>
        {/* <div>
        {users?.map((user: any) => {
          return <userFunc key={user.userId} users={user} />;
        })}
      </div> */}
      </div>
      <h1>Users List:</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId}>
            {user.firstName}
            {user.lastName}
            {user.email}
            {user.personalTrainerId}
          </li>
        ))}
      </ul>
      <h1>Workout program List:</h1>
      <ul>
        {workOuts.map((workOut) => (
          <li key={workOut.workoutProgramId}>
            {workOut.name}
            {workOut.description}
            {workOut.exercises.map((exercise) => (
              <li key={exercise.exerciseId}>
                {exercise.name}
                {exercise.description}
                {exercise.sets}
                {exercise.repetitions}
                {exercise.time}
              </li>
            ))}
          </li>
        ))}
      </ul>
      <h1>Specific workout program</h1>
      <form onSubmit={handleSubmit}>
        <label>
          workoutProgramId:
          <input type='number' name='workoutProgramId' />
        </label>
        <button type='submit'>Create</button>
      </form>
      <li key={workOutOnId!.workoutProgramId}>
        {workOutOnId.name}
        {workOutOnId.description}
        {workOutOnId!.exercises.map((exercise) => (
          <li key={exercise.exerciseId}>
            {exercise.name}
            {exercise.description}
            {exercise.sets}
            {exercise.repetitions}
            {exercise.time}
          </li>
        ))}
      </li>
    </div>
  );
};

export default personalTrainer;

const fpost = async (exerciseData: Exercise) => {
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Exercises';

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
        exerciseId: exerciseData.exerciseId,
        name: exerciseData.name,
        description: exerciseData.description,
        sets: exerciseData.sets,
        repetitions: exerciseData.repetitions,
        time: exerciseData.time,
        workoutProgramId: exerciseData.workoutProgramId,
        personalTrainerId: exerciseData.personalTrainerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// function userFunc({ user }: any) {
//   const {
//     userId,
//     firstName,
//     lastName,
//     email,
//     password,
//     personalTrainerId,
//     accountType,
//   } = user || {};
//   return (
//     <Link href={'/exercises/${id}'}>
//       <div>
//         <h2>{userId}</h2>
//         <h5>{firstName}</h5>
//         <h5>{lastName}</h5>
//         <h5>{email}</h5>
//         <h5>{password}</h5>
//         <h5>{accountType}</h5>
//         <h5>{personalTrainerId}</h5>
//       </div>
//     </Link>
//   );
// }

// export default async function TrainerPage() {
//   const users: any = await getUsers();
//   // console.log(exercisesUsed);
//   return (
//     <div>
//       <h2>
//         {' '}
//         <Link href='/'> Home </Link>{' '}
//       </h2>
//       <h2>
//         {' '}
//         <Link href='/personalTrainer/addclient'> Add client </Link>{' '}
//       </h2>
//       <h2>
//         {' '}
//         <Link href='/personalTrainer/createNewWorkoutProgram'>
//           {' '}
//           Add workout program{' '}
//         </Link>{' '}
//       </h2>
//       <h1>Exercises in use:</h1>
//       <div>
//         {users?.map((user: any) => {
//           return <userFunc key={user.userId} users={user} />;
//         })}
//       </div>
//     </div>
//   );
// }
