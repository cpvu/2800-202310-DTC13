import { Button, useToast } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";

export default function LogoutButton() {
  const { data: session, status } = useSession();
  const toast = useToast();

  async function handleLogout(event) {
    signOut({ redirect: false });

    toast({
      title: "Logging out",
      position: "top",
      status: "loading",
      duration: 1000,
      isClosable: true,
    });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    };

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      let response = await fetch(baseURL + "/api/logout", options);

    } catch (err) {
      console.log(err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Successfully logged out",
      position: "top",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

  }

  return (
    <>  {status == "authenticated" ? <Button width={"80px"} onClick={(event) => { handleLogout(event) }}>Logout</Button> : null}</>
  )
}