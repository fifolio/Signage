import { ID, databases } from "@/backend/configs/configs";

interface createNewFile_interface {
    fileId: string;
    fileName: string;
    fileData: string;
    fileCreator: string;
    fileLatestEditor: string;
}

// CREATE
export async function createNewFile(payload: createNewFile_interface) {

    const fileData = {
        fileId: payload.fileId,
        fileName: payload.fileName,
        fileData: payload.fileData,
        fileCreator: payload.fileCreator,
        fileLatestEditor: payload.fileLatestEditor,
    };

    const res = await databases.createDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COLL_DOCS}`,
        ID.unique(),
        fileData
    ).then((response) => {
        return response
    }).catch((err) => {
        return err
    })

    return res
}