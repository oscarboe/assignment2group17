import Link from 'next/link';

export type Exercise = {
  exerciseId: number;
  name: 'string';
  description: 'string';
  sets: number;
  repetitions: number;
  time: 'string';
  workoutProgramId: number;
  personalTrainerId: number;
};

const fetcUnsasignedExercises = async () => {
  const apiUrl =
    'https://afefitness2023.azurewebsites.net/api/Exercises/unassigned';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken = 'YOUR_ACCESS_TOKEN';

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

    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fpost = async (exerciseData: Exercise) => {
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Exercises';

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

async function getAllExercisesUsed() {
  const res = await fetch(
    'https://afefitness2023.azurewebsites.net/api/Exercises'
  );
  console.log(res);
  const exercise = await res.json();
  return exercise?.items as any[];
}

export default async function TrainerPage() {
  // const exercisesUsed = await fetchData();
  // console.log(exercisesUsed);
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <h2>
        {' '}
        <Link href='/personalTrainer/addclient'> Add client </Link>{' '}
      </h2>
      <h1>Exercises in use:</h1>
      <div>
        {/* {exercisesUsed?.map((exercise: any) => {
          return <ExerciseFunc key={exercise.exerciseId} exercise={exercise} />;
        })} */}
      </div>
    </div>
  );
}

function ExerciseFunc({ exercise }: any) {
  const {
    exerciseId,
    name,
    description,
    sets,
    repetitions,
    time,
    workoutProgramId,
    personalTrainerId,
  } = exercise || {};
  return (
    <Link href={'/exercises/${id}'}>
      <div>
        <h2>{name}</h2>
        <h5>{description}</h5>
        <h5>{sets}</h5>
        <h5>{repetitions}</h5>
        <h5>{time}</h5>
        <h5>{workoutProgramId}</h5>
        <h5>{personalTrainerId}</h5>
      </div>
    </Link>
  );
}
