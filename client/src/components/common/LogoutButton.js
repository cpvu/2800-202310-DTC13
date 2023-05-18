import { Button } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";

export default function LogoutButton() {
    const { data: session, status } = useSession();

    async function handleLogout(event) {
        signOut({redirect: false});

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {}
          };

          const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    
          try {
            let response = await fetch(baseURL + "/api/logout", options);    
          } catch (err) {
            console.log(err);
          }

    }

    return ( 
        <>  {status == "authenticated" ?  <Button width={"80px"} onClick={(event) => {handleLogout(event)}}>Logout</Button> : null}</>
    )
}