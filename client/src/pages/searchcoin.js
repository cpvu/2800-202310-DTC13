import { useSession, getSession } from "next-auth/react"
import { Router, useRouter } from "next/router";

export default function SearchCoin() {
    const router = useRouter()
    const { data: session } = useSession()
    return (
        <>
        {session ? <> <h1>Welcome User!</h1>
        <p>Search a coin to get started!</p>
        <input type="input"></input>
        <h1>{session.user.name}</h1>   </>: <h1>Sign up or login to get access!</h1>}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
      props: {
        session: session,
      },
    };
  }