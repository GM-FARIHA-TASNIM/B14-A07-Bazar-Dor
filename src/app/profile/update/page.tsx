"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
      return;
    }

    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [isPending, user, router]);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("একটি image file নির্বাচন করুন।");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("ছবির সাইজ সর্বোচ্চ 2 MB হতে পারবে।");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };

    reader.onerror = () => toast.error("ছবিটি পড়া যায়নি।");
    reader.readAsDataURL(file);
  }

  async function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: image || null,
      });

      if (result.error) {
        throw new Error(result.error.message || "প্রোফাইল আপডেট করা যায়নি।");
      }

      toast.success("প্রোফাইল আপডেট হয়েছে!");
      router.replace("/profile");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "প্রোফাইল আপডেট করা যায়নি।",
      );
    } finally {
      setSaving(false);
    }
  }

  if (isPending || !user) {
    return (
      <main className="container section">
        <div className="panel">লোড হচ্ছে…</div>
      </main>
    );
  }

  return (
    <main className="container section">
      <section className="auth-card" style={{ margin: "0 auto" }}>
        <Link href="/profile" className="small-muted">
          ← প্রোফাইলে ফিরে যান
        </Link>

        <h1 className="page-title" style={{ marginTop: 22 }}>
          প্রোফাইল আপডেট
        </h1>
        <p className="page-subtitle">
          নাম পরিবর্তন করুন অথবা নতুন profile picture দিন।
        </p>

        <form onSubmit={saveProfile}>
          <label className="form-label" htmlFor="profile-image">
            Profile picture
          </label>

          <div style={{ margin: "12px 0 20px" }}>
            {image ? (
              <Image
                src={image}
                alt="Profile preview"
                width={100}
                height={100}
                unoptimized
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "1px solid #dce9d1",
                }}
              />
            ) : (
              <div style={{ fontSize: 52 }}>👤</div>
            )}
          </div>

          <input
            id="profile-image"
            className="form-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="small-muted" style={{ marginTop: 7 }}>
            PNG, JPG বা অন্য image format; সর্বোচ্চ 2 MB।
          </p>

          <label className="form-label" htmlFor="name">
            নাম
          </label>
          <input
            id="name"
            className="form-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label className="form-label" htmlFor="email">
            ইমেইল
          </label>
          <input
            id="email"
            className="form-input"
            value={user.email}
            readOnly
          />

          <button
            className="btn btn-primary"
            type="submit"
            disabled={saving}
            style={{
              width: "100%",
              marginTop: 22,
              opacity: saving ? 0.65 : 1,
            }}
          >
            {saving ? "সংরক্ষণ হচ্ছে…" : "পরিবর্তন সংরক্ষণ করুন"}
          </button>
        </form>
      </section>
    </main>
  );
}
