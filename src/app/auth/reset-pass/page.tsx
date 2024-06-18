import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="mx-auto max-w-md space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-36 mb-96">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Forgot Password</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email to reset your password
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        <div className="flex justify-between items-center">
          <Link
            href="/auth/login"
            className="inline-block text-sm underline"
            prefetch={false}
          >
            Remember your password? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
