import * as zod from 'zod'



export const schema = zod.object({
    email: zod.email('email pattern is inavalid').nonempty('email is required'),
    password: zod.string().nonempty('password is required')
})