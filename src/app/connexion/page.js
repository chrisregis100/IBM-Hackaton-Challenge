"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connexion, setConnexion] = useState(true);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setError(null);
    setLoading(true);
setConnexion(false)
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl:"/"
    });
    setLoading(false);
setConnexion(true)
    if (res?.error) {
      setError("Invalid email or password.");
      setConnexion(false)
    } else {
      
      redirect("/")
    }
  }

  return (
    <>
      <div className="text-center mt-[200px] bg-white/30 mx-auto max-w-2xl rounded-xl border border-white">
        {connexion && (
            <h1 className="text-2xl gap-3 mb-4 justify-center flex items-center text-center bg-[#1a8650] h-16 rounded-lg">
              <p>Connexion reussi! Vous pouvez vous</p>
              <Link href={"/"} className="flex items-center gap-4">
                <p className="underline">Continuer </p>
              </Link>{" "}
            </h1>
          )}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center bg-black">
            <h2 className="text-2xl font-semibold">Connexion</h2>
            <form className="flex flex-col items-center gap-4 p-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="ex: example@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />
              </div>
              <button
                type="submit"
                className="h-10 rounded-l w-[300px] bg-white text-black text-lg font-bold hover:bg-white/35"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
          <div className="flex flex-col gap-4 px-3">
            <p>You do not have an account?</p>
            <Link href="/inscription" className="button">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;