"use server"

import { RegisterBodyType } from './schema.type';

export async function setDataRegister(data: RegisterBodyType) : Promise<boolean> {
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const finalRes = await res.json()
        if (finalRes.statusMsg === 'fail') {
            return finalRes.message
        }

        
        return true

    }