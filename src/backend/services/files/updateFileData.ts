import { databases } from "@/backend/configs/configs";


export async function updateFileData(
    fileId: string,
    fileData: string,
    fileLatestEditor: string,
) {

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COLL_DOCS}`,
        `${fileId}`,
        { fileData: fileData, fileLatestEditor: fileLatestEditor }
    ).then((response) => {
        return response && true
    }).catch((err) => {
        return err && false
    })

    return res
}