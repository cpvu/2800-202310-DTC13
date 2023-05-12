import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Heading } from "@chakra-ui/react";
import { HomeHeader, ResetPasswordForm } from "@/components";
import { ForgotPasswordForm } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function ResetPassword() {
  return (
    <>
        <ResetPasswordForm></ResetPasswordForm>
    </>
  );
}
