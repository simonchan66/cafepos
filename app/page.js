"use client";
import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  function handleSignIn() {
    gitHubSignIn()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error("Sign in failed", error);
      });
  }

  function handleSignOut() {
    firebaseSignOut()
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.error("Sign out failed", error);
      });
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Welcome to Connexion Cafe
        </h1>
        {!user && (
          <button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out"
          >
            Sign In with GitHub
          </button>
        )}
        {user && (
          <>
            <div className="text-center mb-6">
              <p className="text-white text-xl font-semibold">
                Welcome, {user.displayName || "Anonymous User"}
              </p>
              <p className="text-gray-400">{user.email || "Anonymous"}</p>
            </div>
            <Link
              href="/Home"
              className="block bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 px-6 rounded-full mb-4 transition duration-300 ease-in-out"
            >
              Go to POS System
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full w-full transition duration-300 ease-in-out"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </main>
  );
}