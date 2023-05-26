
import { Inter } from "next/font/google";
import { HomeHeader } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HomeHeader></HomeHeader>
    </>
  );
}
