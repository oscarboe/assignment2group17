async function getAllExercisesUsed() {
  const res = await fetch(
    'https://afefitness2023.azurewebsites.net/api/Exercises',
    { cache: 'no-store' }
  );
  if (res.then.length == 0) {
    console.log('hi');
    return 0;
  }
  console.log(res);
  const data = await res.json();
  return data?.items as any[];
}

async function getAllExercisesNotUsed() {
  const res = await fetch(
    'https://afefitness2023.azurewebsites.net/api/Exercises/unassigned'
  );
  const data = await res.json();
  return data?.items as any[];
}

async function createExercises() {
  const res = await postMessage(
    'https://afefitness2023.azurewebsites.net/api/Exercises'
  );
}

export default async function TrainerPage() {
  const exercisesUsed = await getAllExercisesUsed();
  return (
    <div>
      <h1>Exercises in use:</h1>
      <div>
        {exercisesUsed?.map((exercise) => {
          return <Exercise key={exercise.exerciseId} exercise={exercise} />;
        })}
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
