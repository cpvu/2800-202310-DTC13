import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { LOGIN_ENDPOINT } from '@/constants/endpoints';

const options = {
  secret: process.env.SECRET,
  csrf: false,
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

        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


        let response = await fetch(baseURL + LOGIN_ENDPOINT, options);
        let responseJSON = await response.json();

        if (responseJSON.authenticated) {
          return { id: 1, name: credentials.username };
        } else {
          throw new Error(responseJSON.message)
        }
      },
    }),
  ],

  // Other NextAuth.js options
};

export default (req, res) => NextAuth(req, res, options);
