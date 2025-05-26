import Link from "next/link";

export default function RetroNav() {
  return (
    <nav className="bg-eslblue p-4 flex justify-between items-center">
      <Link href="/">
        <a className="text-white font-bold text-xl">Retro ESL Classic League</a>
      </Link>
      <div className="space-x-4">
        <Link href="/dashboard">
          <a className="text-eslgrey hover:text-white">Dashboard</a>
        </Link>
        <Link href="/login">
          <a className="text-eslgrey hover:text-white">Login</a>
        </Link>
      </div>
    </nav>
  );
}
