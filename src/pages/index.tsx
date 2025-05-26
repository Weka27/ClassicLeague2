import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-eslblack text-eslgrey font-sans">
      <header className="bg-eslblue p-4 text-center text-white text-3xl font-bold">
        Retro ESL Classic League
      </header>
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4">Willkommen zur Retro Classic League</h2>
        <p>Spiele wie CS 1.6, Warcraft 3, Starcraft 2 im Retro-ESL Look.</p>
        <div className="mt-6 space-x-4">
          <Link href="/login">
            <a className="bg-eslblue px-4 py-2 rounded hover:bg-blue-700">Login</a>
          </Link>
          <Link href="/dashboard">
            <a className="bg-eslblue px-4 py-2 rounded hover:bg-blue-700">Dashboard</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
