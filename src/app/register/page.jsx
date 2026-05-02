"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Form, TextField, Label, Input, Description, FieldError, Button, Card } from "@heroui/react";
import { Person, Envelope, Lock, Link as LinkIcon } from "@gravity-ui/icons";
import { UserPlus } from "lucide-react";
import googleIcon from "@/assets/light/web_light_rd_na@1x.png";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const photoUrl = formData.get("photoUrl");

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
      });

      if (result.error) {
        setError(result.error.message || "Registration failed. Please try again.");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    try {
      await authClient.signUp.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google sign-up failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#1e3a5f]/5 to-[#c8a97e]/10 py-12 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-[#1e3a5f] rounded-full flex items-center justify-center">
              <UserPlus className="h-7 w-7 text-[#c8a97e]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1e3a5f]">Create Account</h1>
          <p className="text-gray-500 mt-2">Join TilesGallery today</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <Form
          className="flex flex-col gap-4"
          onSubmit={handleRegister}
          validationBehavior="native"
        >
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (!value || value.trim().length < 2) {
                return "Name must be at least 2 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Your full name" startContent={<Person className="h-4 w-4 text-gray-400" />} variant="bordered" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="you@example.com" startContent={<Envelope className="h-4 w-4 text-gray-400" />} variant="bordered" />
            <FieldError />
          </TextField>

          <TextField name="photoUrl" type="url">
            <Label>Photo URL</Label>
            <Input placeholder="https://example.com/photo.jpg" startContent={<LinkIcon className="h-4 w-4 text-gray-400" />} variant="bordered" />
            <Description>Optional profile image link</Description>
          </TextField>

          <TextField
            isRequired
            minLength={6}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Create a password" startContent={<Lock className="h-4 w-4 text-gray-400" />} variant="bordered" />
            <Description>Must be at least 6 characters with 1 uppercase and 1 number</Description>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#1e3a5f] text-white font-semibold hover:bg-[#2d5a8e]"
            size="lg"
            isLoading={loading}
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Button>
        </Form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        <Button
          onPress={handleGoogleRegister}
          variant="bordered"
          className="w-full border-gray-300 hover:bg-gray-50"
          size="lg"
          startContent={<Image src={googleIcon} alt="Google" className="h-5 w-5" />}
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1e3a5f] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
}