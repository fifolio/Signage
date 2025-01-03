import { account } from "@/backend/configs/configs"
import { setUserData } from "@/stores/backend/useUserDataStore";


export async function userData() {
    const res = await account.get()
        .then((res) => {
            setUserData(res);
            return true;
        }).catch(() => {
            return false;
        })

    return res;
}