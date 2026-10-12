"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [isPending, user, router]);

  if (isPending || !user) {
    return (
      <main className="container section">
        <div className="panel">প্রোফাইল লোড হচ্ছে…</div>
      </main>
    );
  }

  return (
    <main className="container section">
      <section className="panel" style={{ maxWidth: 650, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {user.image ? (
            <Image
              src={user.image}
              alt="Profile picture"
              width={88}
              height={88}
              unoptimized
              style={{
                width: 88,
                height: 88,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: "#e9f3de",
                fontSize: 38,
              }}
            >
              👤
            </div>
          )}

          <div>
            <h1 className="page-title">আমার প্রোফাইল</h1>
            <p className="page-subtitle">আপনার অ্যাকাউন্টের তথ্য</p>
          </div>
        </div>

        <div
          style={{
            margin: "22px 0",
            padding: 18,
            background: "#f5f8f0",
            borderRadius: 14,
            lineHeight: 2,
          }}
        >
          <p>
            <strong>নাম:</strong> {user.name}
          </p>
          <p>
            <strong>ইমেইল:</strong> {user.email}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/profile/update" className="btn btn-primary">
            তথ্য আপডেট করুন →
          </Link>

          <button
            className="btn"
            onClick={async () => {
              await authClient.signOut();
              router.replace("/");
              router.refresh();
            }}
          >
            সাইন আউট
          </button>
        </div>
      </section>
    </main>
  );
}
