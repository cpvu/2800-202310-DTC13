import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Heading } from "@chakra-ui/react";
import styles from "@/styles/Home.module.css";
import { Navbar, HomeHeader } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HomeHeader></HomeHeader>
    </>
  );
}
