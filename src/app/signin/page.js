"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn.email({ email, password });

      if (result?.error) {
        setError(result.error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>সাইন ইন</h1>
        <p>তোমার বাজার দর অ্যাকাউন্টে প্রবেশ করো।</p>

        <form onSubmit={handleSubmit}>
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
            placeholder="তোমার পাসওয়ার্ড"
            autoComplete="current-password"
            required
          />

          {error ? <p className="auth-error">{error}</p> : null}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <p className="auth-switch">
          অ্যাকাউন্ট নেই? <Link href="/signup">সাইন আপ করো</Link>
        </p>
      </div>
    </section>
  );
}
