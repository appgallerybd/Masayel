import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // মূল প্যালেট — গভীর এমারেল্ড + নরম গোল্ড, সাধারণ AI-ক্লিশে টেরাকোটা/পিওর-ব্ল্যাক এড়িয়ে
        emerald: {
          950: "#0B2E22", // প্রাইমারি ডার্ক — হেডার, হাই-এম্ফাসিস টেক্সট
          800: "#12472F",
          700: "#1F6B4E", // ইন্টারঅ্যাক্টিভ অ্যাকসেন্ট (লিংক, বাটন)
          500: "#3C8964",
          100: "#E4EFE8", // সফট ট্যাগ/ব্যাজ ব্যাকগ্রাউন্ড
        },
        gold: {
          600: "#B8912B", // মিউটেড গোল্ড — স্কলার ব্যাজ, বিশেষ হাইলাইট
          400: "#D4B45C",
        },
        cream: {
          50: "#F8F6F0", // পেজ ব্যাকগ্রাউন্ড
          100: "#F1EEE4",
        },
        ink: {
          900: "#1B1F1B", // গ্রিন-টিন্টেড নিয়ার-ব্ল্যাক (পিওর #111 না)
          600: "#454B45",
          400: "#6E756D",
        },
      },
      fontFamily: {
        // হেডিং: বাংলা সেরিফ (ঐতিহ্যবাহী/ইসলামিক পাণ্ডুলিপির অনুভূতি)
        heading: ["var(--font-noto-serif-bengali)", "serif"],
        // বডি: পরিষ্কার বাংলা সান্স
        body: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;
