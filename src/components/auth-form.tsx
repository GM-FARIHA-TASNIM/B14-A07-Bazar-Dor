"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSignup && !name.trim()) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    setBusy(true);

    try {
      if (isSignup) {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        if (result.error) {
          throw new Error(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        }

        toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (result.error) {
          throw new Error(result.error.message || "সাইন ইন করা যায়নি।");
        }

        toast.success("সাইন ইন সফল হয়েছে!");
      }

      router.replace(isSignup ? "/profile" : "/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "কিছু একটা সমস্যা হয়েছে।",
      );
    } finally {
      setBusy(false);
    }
  }

  async function socialSignIn(provider: "google" | "github") {
    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        throw new Error(result.error.message || "Social sign-in করা যায়নি।");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Social sign-in চালু করা যায়নি।",
      );
    }
  }

  return (
    <section className="auth-card">
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          color: "#236b43",
          fontWeight: 800,
        }}
      >
        ← বাজার দর
      </Link>

      <div style={{ fontSize: 38, marginTop: 22 }}>
        {isSignup ? "🌱" : "🛒"}
      </div>

      <h1 className="page-title" style={{ fontSize: 29, marginTop: 10 }}>
        {isSignup ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আবার স্বাগতম!"}
      </h1>

      <p className="page-subtitle">
        {isSignup
          ? "বাজারদর জানতে আপনার তথ্য দিয়ে নিবন্ধন করুন।"
          : "আপনার অ্যাকাউন্টে সাইন ইন করুন।"}
      </p>

      <form onSubmit={submit}>
        {isSignup && (
          <>
            <label className="form-label" htmlFor="name">
              আপনার নাম
            </label>
            <input
              className="form-input"
              id="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পূর্ণ নাম"
              required
            />
          </>
        )}

        <label className="form-label" htmlFor="email">
          ইমেইল
        </label>
        <input
          className="form-input"
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label className="form-label" htmlFor="password">
          পাসওয়ার্ড
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="কমপক্ষে ৮ অক্ষর"
          minLength={8}
          required
        />

        <button
          className="btn btn-primary"
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            marginTop: 22,
            opacity: busy ? 0.65 : 1,
          }}
        >
          {busy
            ? "অপেক্ষা করুন…"
            : isSignup
              ? "অ্যাকাউন্ট তৈরি করুন"
              : "সাইন ইন করুন"}{" "}
          →
        </button>
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "20px 0",
          color: "#8b958b",
          fontSize: 12,
        }}
      >
        <span style={{ height: 1, background: "#e7ece4", flex: 1 }} />
        অথবা চালিয়ে যান
        <span style={{ height: 1, background: "#e7ece4", flex: 1 }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 9,
        }}
      >
        <button
          className="btn"
          type="button"
          onClick={() => socialSignIn("google")}
        >
          G Google
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => socialSignIn("github")}
        >
          ⌘ GitHub
        </button>
      </div>

      <p
        style={{
          fontSize: 13,
          textAlign: "center",
          marginTop: 22,
          color: "#69766b",
        }}
      >
        {isSignup ? "আগে থেকেই অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link
          href={isSignup ? "/signin" : "/signup"}
          style={{ color: "#236b43", fontWeight: 800 }}
        >
          {isSignup ? "সাইন ইন" : "নিবন্ধন করুন"}
        </Link>
      </p>
    </section>
  );
}
