'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSortedPostsData } from '../lib/exercises';

// export async function getStaticProps() {
//   const allPostsData: any = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }: any) {
  const auth = useAuth();

  return (
    <>
      <h1>Public Home Page</h1>
      <header>
        <nav>{auth ? <p>logged in</p> : <Link href='/Login'>Login</Link>}</nav>
      </header>
      <div>
        <Link href='TrainerAllExercises'>Link</Link>
      </div>
      <ul>
        {/* {allPostsData.map(
          ({ id, name, description, sets, repetitions, time }: any) => (
            <li key={id}>
              {name}
              <br />
              {description}
              <br />
              {sets}
              <br />
              {repetitions}
              <br />
              {time}
            </li>
          )
        )} */}
      </ul>
    </>
  );
}
