"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function SignInForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "লগইন করা যায়নি।");
      return;
    }

    const next = searchParams.get("next");
    window.location.href =
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/profile";
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">আবার স্বাগতম</p>
        <h1>লগইন</h1>
        <p>আপনার অ্যাকাউন্টে প্রবেশ করুন।</p>

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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-primary full-width" disabled={loading}>
          {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
        </button>

        <button
          type="button"
          className="btn btn-outline full-width"
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          Google দিয়ে লগইন
        </button>

        <button
          type="button"
          className="btn btn-outline full-width"
          onClick={() => authClient.signIn.social({ provider: "github" })}
        >
          GitHub দিয়ে লগইন
        </button>

        <p>
          অ্যাকাউন্ট নেই? <Link href="/signup">রেজিস্টার করুন</Link>
        </p>
      </form>
    </section>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<p className="container">লোড হচ্ছে...</p>}>
      <SignInForm />
    </Suspense>
  );
}
