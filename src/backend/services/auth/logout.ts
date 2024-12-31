import { account } from "@/backend/configs/configs"


export async function logout() {
    const isLoggedOut = await account.deleteSession('current');
    return isLoggedOut ? true : false
}