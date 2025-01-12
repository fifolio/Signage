import { ID, databases } from "@/backend/configs/configs";

interface createNewScreen_interface {
    fileId: string;
    fileData: string;
}

// CREATE
export async function createNewScreen(payload: createNewScreen_interface) {

    const fileData = {
        fileId: payload.fileId,
        fileData: payload.fileData,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COLL_DISP}`,
        ID.unique(),
        fileData
    ).then((response) => {
        return response
    }).catch((err) => {
        return err
    })

    return res
}