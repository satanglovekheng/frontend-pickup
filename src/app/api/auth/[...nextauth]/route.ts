

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXTJS_LOGIN || "", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json"
          }
        });
        const response = await res.json();
        console.log("response", response);
        if (response.status === 'ok') {
          return { ...response, ...response.user };
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/login', // กำหนดหน้าเข้าสู่ระบบ
    signOut: '/login', // กำหนดหน้าออกจากระบบ
    error: '/login', // กำหนดหน้าแสดงข้อผิดพลาด
    verifyRequest: '/login' // กำหนดหน้าการยืนยันคำขอ
  },
});

export { handler as GET, handler as POST };


