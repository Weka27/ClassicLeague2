import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) {
      setError("Login fehlgeschlagen");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-eslblack text-eslgrey font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-eslblue p-8 rounded shadow max-w-md w-full space-y-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Passwort"
          className="w-full p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-eslgrey text-eslblack font-bold py-2 rounded hover:bg-gray-300"
        >
          Anmelden
        </button>
      </form>
    </div>
  );
}
