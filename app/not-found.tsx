import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-ink-600">
        যে পেজটি খুঁজছেন সেটি মুছে ফেলা হয়েছে অথবা কখনো ছিল না।
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded bg-emerald-950 px-5 py-2.5 font-body font-medium text-cream-50 hover:bg-emerald-800"
      >
        হোমপেজে ফিরে যান
      </Link>
    </div>
  );
}
