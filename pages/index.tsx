// pages/index.tsx
import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
  const [userProfiles, setTodos] = useState<Schema['UserProfile'][]>([]);

  async function listTodos() {
    // fetch all todos
    const { data } = await client.models.UserProfile.list();
    setTodos(data);
  }

  useEffect(() => {
    listTodos();
  }, []);

  return (
    <main>
      <h1>Hello, Amplify 👋</h1>
      <ul>
        {userProfiles.map((userProfile) => (
          <li key={userProfile.id}>{userProfile.email}</li>
        ))}
      </ul>
    </main>
  );
}