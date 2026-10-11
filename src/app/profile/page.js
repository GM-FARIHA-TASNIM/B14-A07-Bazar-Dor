"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  if (isPending) {
    return <p className="container page-section">লোড হচ্ছে...</p>;
  }

  if (!session?.user) {
    router.replace("/signin");
    return <p className="container page-section">লগইন পেজে পাঠানো হচ্ছে...</p>;
  }

  async function updateProfile(event) {
    event.preventDefault();
    setMessage("");

    const result = await authClient.updateUser({ name });

    if (result.error) {
      setMessage(result.error.message || "প্রোফাইল আপডেট হয়নি।");
      return;
    }

    setMessage("প্রোফাইল আপডেট হয়েছে।");
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={updateProfile}>
        <p className="eyebrow">আপনার অ্যাকাউন্ট</p>
        <h1>প্রোফাইল</h1>

        <p>
          <strong>ইমেইল:</strong> {session.user.email}
        </p>

        <label htmlFor="name">নাম পরিবর্তন করুন</label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        {message && <p>{message}</p>}

        <button className="btn btn-primary full-width">প্রোফাইল আপডেট</button>

        <button
          type="button"
          className="btn btn-outline full-width"
          onClick={async () => {
            await authClient.signOut();
            router.replace("/");
          }}
        >
          লগআউট
        </button>
      </form>
    </section>
  );
}
