import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="container">
        <h1>404</h1>
        <h2>পেজটি পাওয়া যায়নি</h2>
        <p>আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।</p>
        <Link href="/" className="btn btn-primary">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
