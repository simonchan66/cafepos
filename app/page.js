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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">WEEK 8 Assignment - OAuth Practice</h1>
        {!user && (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
          >
            Sign In with GitHub
          </button>
        )}
        {user && (
          <>
            <div className="text-center mb-4">
              <p className="text-gray-800 font-semibold">Welcome,</p>
              <p className="text-gray-800 font-semibold">{user.displayName || "Anonymous User"}</p>
              <p className="text-gray-800 font-semibold">Your Email: {user.email || "Anonymous"}</p>
              <h2 className="text-xl" >
          <Link href="/Home" className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
           You are authenticated to go to shopping list
          </Link>
        </h2>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </main>
  );
}