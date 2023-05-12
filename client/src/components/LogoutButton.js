import { Button } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";

export default function LogoutButton() {
    const { data: session, status } = useSession();

    async function handleLogout() {
        signOut();
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: {}
          };
    
          try {
            let response = await fetch("http://localhost:8000/logout", options);
            let responseJSON = await response.json();
            console.log(responseJSON)
    
            router.push("/");
          } catch (err) {
            //setErrors({ server: error.message });
            console.log(err);
          }

    }

    return ( 
        <>  {status == "authenticated" ?  <Button onClick={handleLogout}>Logout</Button> : null}</>
    )
}