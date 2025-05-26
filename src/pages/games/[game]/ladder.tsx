import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type LadderEntry = {
  id: string;
  elo: number;
  wins: number;
  losses: number;
  user: { name: string | null; email: string };
};

export default function GameLadder() {
  const router = useRouter();
  const { game } = router.query;
  const [ladder, setLadder] = useState<LadderEntry[]>([]);

  useEffect(() => {
    if (!game) return;
    fetch(`/api/ladders/${game}`)
      .then((res) => res.json())
      .then(setLadder);
  }, [game]);

  return (
    <div className="min-h-screen bg-eslblack text-eslgrey font-sans p-6 max-w-4xl mx-auto">
      <header className="text-3xl font-bold mb-4 text-eslblue">{game} Ladder</header>
      <table className="w-full table-auto border-collapse border border-eslgrey">
        <thead>
          <tr>
            <th className="border border-eslgrey p-2">Spieler</th>
            <th className="border border-eslgrey p-2">Elo</th>
            <th className="border border-eslgrey p-2">Wins</th>
            <th className="border border-eslgrey p-2">Losses</th>
          </tr>
        </thead>
        <tbody>
          {ladder.map((entry) => (
            <tr key={entry.id}>
              <td className="border border-eslgrey p-2">{entry.user.name || entry.user.email}</td>
              <td className="border border-eslgrey p-2">{entry.elo}</td>
              <td className="border border-eslgrey p-2">{entry.wins}</td>
              <td className="border border-eslgrey p-2">{entry.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
