'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Signup = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  const onSignup = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response);
      router.push("/login");
    } catch (err:any) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-80 h-[500px] rounded-xl border-blue-300">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <form onSubmit={onSignup}>
          <CardContent>
            <h1 className="p-1">Email</h1>
            <Input
              placeholder="Enter your email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </CardContent>
          <CardContent>
            <h1 className="p-1">Username</h1>
            <Input
              placeholder="Enter your username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </CardContent>
          <CardContent>
            <h1 className="p-1">Password</h1>
            <Input
              placeholder="Enter your password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-2 justify-center">
            <Button type="submit" className="w-full" disabled={loading || buttonDisabled}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <p>Login with an existing account</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
