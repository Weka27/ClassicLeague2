import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

type LadderEntry = {
  id: string;
  elo: number;
  wins: number;
  losses: number;
  game: { name: string };
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [ladders, setLadders] = useState<LadderEntry[]>([]);

  useEffect(() => {
    async function fetchLadders() {
      if (!session?.user?.email) return;
      const res = await fetch(`/api/ladders/cs 1.6`);
      const data = await res.json();
      setLadders(data);
    }
    fetchLadders();
  }, [session]);

  if (!session) {
    return <p>Bitte einloggen...</p>;
  }

  return (
    <div className="min-h-screen bg-eslblack text-eslgrey font-sans p-6 max-w-4xl mx-auto">
      <header className="text-4xl font-bold mb-6 text-eslblue">Dashboard</header>
      <section>
        <h2 className="text-2xl mb-4">CS 1.6 Ladder</h2>
        <ul>
          {ladders.map((entry) => (
            <li key={entry.id} className="mb-2">
              {entry.game.name}: {entry.elo} Elo (W:{entry.wins} L:{entry.losses})
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <Link href="/games/cs 1.6/ladder">
          <a className="bg-eslblue px-4 py-2 rounded hover:bg-blue-700">Zur Ladder</a>
        </Link>
      </section>
    </div>
  );
}
