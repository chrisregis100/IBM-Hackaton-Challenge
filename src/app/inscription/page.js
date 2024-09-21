"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Right from "../components/icons/Right";

function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connexion, setConnexion] = useState(false);
  const router=useRouter()

  async function handleSubmit(ev) {
    ev.preventDefault();
    const user = { username, email, password };
    setConnexion(false);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const user = await response.json();
      setConnexion(true);
      router.push('/connexion')
    } else {
      console.log("erreur");
      setConnexion(false);
    }
  }

  return (
    <>
      <div className="mt-[200px] ">
        <div className="mx-auto  max-w-2xl ">
          {connexion && (
            <h1 className="text-2xl gap-3 mb-4 justify-center flex items-center text-center bg-[#1a8650] h-16 rounded-lg">
              <p>Inscription reussi! Vous pouvez vous</p>
              <Link href={"/connexion"} className="flex items-center gap-4">
                <p className="underline">connecter </p> <Right />{" "}
              </Link>{" "}
            </h1>
          )}
        </div>
        <div className="text-center   bg-black  mx-auto max-w-2xl rounded-xl border border-white ">
          <h1 className="text-white font-bold text-3xl">X-vice</h1>
          <div className="flex  justify-between">
            <div className="flex flex-col items-center bg-black">
              <h2 className="text-2xl font-semibold">Inscription</h2>
              <form
                className="flex flex-col items-center gap-4 p-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="ex:example@.example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 rounded-l w-[300px] bg-white text-black text-lg font-bold hover:bg-white/35"
                >
                  Sign Up
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center rounded-lg bg-white/30">
              <p>You already have account ?</p>
              <Link href={"/connexion"} className="button">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
