import { account } from '../../configs/configs';

type Login = {
    email: string,
    password: string,
}

export async function login({ email, password }: Login) {

    const res = await account.createEmailPasswordSession(
        email,
        password,
    ).then((res) => {
        return res && true
    }).catch((err) => {
        return err.type && false
    })

    return res
}