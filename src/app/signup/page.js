"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "রেজিস্ট্রেশন করা যায়নি।");
      return;
    }

    window.location.href = "/profile";
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">নতুন অ্যাকাউন্ট</p>
        <h1>রেজিস্টার</h1>

        <label htmlFor="name">আপনার নাম</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <label htmlFor="email">ইমেইল</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">পাসওয়ার্ড</label>
        <input
          id="password"
          type="password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-primary full-width" disabled={loading}>
          {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>

        <p>
          আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin">লগইন করুন</Link>
        </p>
      </form>
    </section>
  );
}
