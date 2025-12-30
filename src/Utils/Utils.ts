import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken () {
    const cookie = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieName ='__Secure-next-auth.session-token' ;

    const userToken = cookie.get(cookieName)?.value;
    const decodeToken =await decode({token:userToken, secret:process.env.AUTH_SECRET || ''})
    return decodeToken?.credentialToken;
}