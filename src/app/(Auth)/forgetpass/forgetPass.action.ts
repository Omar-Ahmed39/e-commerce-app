"use server"

export async function sendVerfiy(email: string) {
    console.log('ffffff', email);

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const final = await res.json()
    if (final.statusMsg === 'success') {
        return final.message
    }
    return false
}

