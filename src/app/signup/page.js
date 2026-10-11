"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setError("অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>নতুন অ্যাকাউন্ট তৈরি করো</h1>
        <p>বাজার দর ব্যবহার করতে তোমার তথ্য দাও।</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">তোমার নাম</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="তোমার নাম"
            autoComplete="name"
            required
          />

          <label htmlFor="email">ইমেইল</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
          />

          <label htmlFor="password">পাসওয়ার্ড</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            autoComplete="new-password"
            minLength={8}
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <p className="auth-switch">
          আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin">সাইন ইন করো</Link>
        </p>
      </div>
    </section>
  );
}
