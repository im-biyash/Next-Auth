"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-80 h-[400px] rounded-xl border-blue-300">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <form>
          <CardContent>
            <h1 className="p-1">Email</h1>
            <Input />
          </CardContent>
          <CardContent>
            <h1 className="p-1">Password</h1>
            <Input className="border-gray-500" />
          </CardContent>
          <CardFooter className="flex flex-col w-full gap-2 justify-center">
            <Button type="submit" variant={"default"} className="w-full">Login</Button>
             
            <p>Already have an account? Signup</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default login;
