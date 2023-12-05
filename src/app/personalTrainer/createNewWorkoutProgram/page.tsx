"use client";
import Link from "next/link";
import { Exercise, workoutProgram } from "../page";
import { useAuth } from "@/hooks/useAuth";

const createWorkoutProgram = async (_workoutProgram: workoutProgram) => {
  const auth = useAuth();
  const apiUrl = "https://afefitness2023.azurewebsites.net/api/Users";

  // Replace 'YOUR_ACCESS_TOKEN' with your actual authorization token
  const accessToken = auth.token;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Data:", data);
    alert("New workout program created");
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

const handleSubmit = async (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const exercise: Exercise = {
    exerciseId: parseInt(formData?.get("exerciseId")?.toString()!),
    name: formData.get("exName")?.toString()!,
    description: formData.get("exDescription")?.toString()!,
    sets: parseInt(formData?.get("sets")?.toString()!),
    repetitions: parseInt(formData?.get("repetitions")?.toString()!),
    time: formData.get("time")?.toString()!,
    workoutProgramId: parseInt(formData?.get("workoutProgramId")?.toString()!),
    personalTrainerId: parseInt(
      formData?.get("personalTrainerId")?.toString()!
    ),
  };
  var exerciseList: Exercise[] = [];
  exerciseList.push(exercise);
  const _workoutProgram: workoutProgram = {
    workoutProgramId: parseInt(formData?.get("workoutProgramId")?.toString()!),
    name: formData.get("name")?.toString()!,
    description: formData.get("description")?.toString()!,
    exercises: exerciseList,
    personalTrainerId: parseInt(
      formData?.get("personalTrainerId")?.toString()!
    ),
    clientId: parseInt(formData?.get("clientId")?.toString()!),
  };
  if (
    _workoutProgram.exercises != null &&
    _workoutProgram.workoutProgramId != null &&
    _workoutProgram.exercises[0].name.length > 0 &&
    _workoutProgram.workoutProgramId >= 0
  ) {
    const TOKEN = createWorkoutProgram(_workoutProgram);
    // router.push('TrainerAllExercises');
    // router.refresh();
  } else alert("failed creating user");
};

export default async function createNewWorkoutProgram() {
  return (
    <div>
      <h2>
        {" "}
        <Link href="/"> Home </Link>{" "}
      </h2>
      <h2>
        {" "}
        <Link href="/personalTrainer"> Back </Link>{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <li>
          <label>
            workoutProgramId:
            <input type="number" name="workoutProgramId" />
          </label>
        </li>
        <li>
          <label>
            Workout program name:
            <input type="text" name="name" />
          </label>
        </li>
        <li>
          <label>
            description:
            <input type="text" name="description" />
          </label>
        </li>
        <li>
          <label>
            clientId:
            <input type="number" name="clientId" />
          </label>
        </li>
        <li>
          <label>
            personalTrainerId:
            <input type="number" name="personalTrainerId" />
          </label>
        </li>
        <li>
          <label>
            exerciseId:
            <input type="number" name="exerciseId" />
          </label>
        </li>
        <li>
          <label>
            Exercise name:
            <input type="text" name="exname" />
          </label>
        </li>
        <li>
          <label>
            Exercise description:
            <input type="text" name="exDescription" />
          </label>
        </li>
        <li>
          <label>
            sets:
            <input type="number" name="sets" />
          </label>
        </li>
        <li>
          <label>
            repetitions:
            <input type="number" name="repetitions" />
          </label>
        </li>
        <li>
          <label>
            time:
            <input type="text" name="time" />
          </label>
        </li>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
