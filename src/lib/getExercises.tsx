import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

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

export const getServerSideProps = (async (context) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { repo } };
}) satisfies GetServerSideProps<{
  repo: Exercise;
}>;

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return repo.stargazers_count;
}
