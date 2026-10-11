"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/signin");
    router.refresh();
  }

  if (isPending) {
    return (
      <section className="profile-page">
        <div className="container">
          <p>প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (!session?.user) {
    return (
      <section className="profile-page">
        <div className="container">
          <h1>আমার প্রোফাইল</h1>
          <p>প্রোফাইল দেখতে প্রথমে সাইন ইন করো।</p>
          <Link href="/signin" className="btn btn-primary">
            সাইন ইন
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <div className="container">
        <div className="profile-card">
          <h1>আমার প্রোফাইল</h1>
          <p>
            <strong>নাম:</strong> {session.user.name || "নাম দেওয়া নেই"}
          </p>
          <p>
            <strong>ইমেইল:</strong> {session.user.email}
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignOut}
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </section>
  );
}
