import { account } from "@/backend/configs/configs"



export async function checkSession() {
    const res = await account.getSession('current')
        .then((res) => {
            return res && true;
        }).catch((err) => {
            return err && false;
        })

    return res;
}