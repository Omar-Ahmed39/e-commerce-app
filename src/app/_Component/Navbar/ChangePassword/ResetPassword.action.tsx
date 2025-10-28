"use server"

import { getUserToken } from "_/Utils/Utils";
import { ResetPasswordType } from "./ResetPasswordSchema";


export async function setResetPassword(data: ResetPasswordType) {
    console.log('xxxxx' , data);
    
    const userToken = await getUserToken()
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', {
        method: 'PUT',
        body: JSON.stringify( data ),
        headers: {
            token:userToken as string,
            'Content-Type': 'application/json'
        }
    })

    const finalRes = await res.json()
    console.log('ssss', finalRes);

    return finalRes

    // statusMsg: 'fail',
    //     message: 'There is no user with this email address undefined'

    // if (finalRes.statusMsg === 'fail') {
    //     return finalRes.message
    // }


    // return true

}