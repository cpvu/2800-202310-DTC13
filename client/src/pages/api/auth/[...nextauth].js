import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { LOGIN_ENDPOINT } from '@/constants/endpoints';

const nextAuthOptions = (req, res) => {
  return {

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
            credentials: "include",
            body: JSON.stringify(payload),
          };

          const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

          let response = await fetch(baseURL + LOGIN_ENDPOINT, options);
          let responseJSON = await response.json();

          if (responseJSON.authenticated) {
            const customCookie = response.headers.get("set-cookie")
            res.setHeader('Set-Cookie', [customCookie])

            return { id: 1, name: credentials.username };
          } else {
            throw new Error(responseJSON.message)
          }
        },
      }),
    ],
  }

  // Other NextAuth.js options
};

export default (req, res) => {return NextAuth(req, res, nextAuthOptions(req, res))};
