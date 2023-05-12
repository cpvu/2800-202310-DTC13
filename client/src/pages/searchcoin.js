import { useSession, getSession } from "next-auth/react"

export default function SearchCoin() {
    const { data: session } = useSession()
    return (
        <>
        <h1>Welcome User!</h1>
        <p>Search a coin to get started!</p>
        <input type="input"></input>
        <h1>{session.user.name}</h1>
        </>
        
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    console.log(session)
    // Pass the session object as a prop to your page component
    return {
      props: {
        session: session,
      },
    };
  }