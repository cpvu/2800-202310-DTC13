import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const options = {
  providers: [
    CredentialsProvider({
      // Credentials provider options
      async authorize(credentials) {

        const payload = {
          username: credentials.username,
          password: credentials.password
        }
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          };

          console.log(credentials)
    
          try {
            let response = await fetch("http://localhost:8000/api/login", options);
            let responseJSON = await response.json();
            console.log(responseJSON);

            if (responseJSON.authenticated) {
                return { id: 1, name: 'Admin' };
              } 

          } catch (err) {
            console.log(err);
          }
      },
    }),
  ],
  // Other NextAuth.js options
};

export default (req, res) => NextAuth(req, res, options);
