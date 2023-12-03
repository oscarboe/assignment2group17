import Link from 'next/link';

type Exercise = {
  exerciseId: Int16Array;
  name: 'string';
  description: 'string';
  sets: Int16Array;
  repetitions: Int16Array;
  time: 'string';
  workoutProgramId: Int16Array;
  personalTrainerId: Int16Array;
};

const fetchData = async () => {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to call
  const apiUrl =
    'https://afefitness2023.azurewebsites.net/api/Exercises/unassigned';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken = 'YOUR_ACCESS_TOKEN';

  try {
    const response = await fetch(apiUrl, {
      method: 'GET', // or 'POST' or any other HTTP method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('username:password')}`,
      },
      body: 'grant_type=password&username=boss@fitness.moon&password=asdfQWER',
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

const fpost = async (exerciseData: any) => {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint you want to call
  const apiUrl = 'https://afefitness2023.azurewebsites.net/api/Exercises';

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken = 'YOUR_ACCESS_TOKEN';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST', // or 'POST' or any other HTTP method
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('username:password')}`,
      },
      body: 'grant_type=password&username=boss@fitness.moon&password=asdfQWER&${JSON.stringify(exerciseData)}',
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
  // const exercisesUsed = await getAllExercisesUsed();
  // fpost(exercise)2;
  // const exercisesUsed = await fetchData();
  // console.log('hi');
  // console.log(exercisesUsed);
  return (
    <div>
      <h2>
        {' '}
        <Link href='/'> Home </Link>{' '}
      </h2>
      <h1>Exercises in use:</h1>
      <div>
        {/* {exercisesUsed?.map((exercise: any) => {
          return <Exercise key={exercise.exerciseId} exercise={exercise} />;
        })} */}
      </div>
    </div>
  );
}

function Exercise({ exercise }: any) {
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
