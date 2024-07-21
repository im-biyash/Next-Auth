
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl">Verify Email</h1>
        <h2 className="p-2 text-xl">{token ? `Token: ${token}` : "No token provided"}</h2>
        {verified ? (
          <>
            <h1 className="text-2xl text-green-500">Email verified</h1>
            <Link href="/login">
              <a className="text-blue-500 underline">Login</a>
            </Link>
          </>
        ) : (
          <h1 className="text-2xl text-red-500">Email not verified</h1>
        )}
        {error && <p className="text-red-500">There was an error verifying your email.</p>}
      </div>
    </div>
  );
}
