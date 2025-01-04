import { databases } from "@/backend/configs/configs";

async function updateFileName(
    fileId: string, 
    newFileName: string,
    fileLatestEditor: string) {

    const res = await databases.updateDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COLL_DOCS}`,
        `${fileId}`,
        { fileName: newFileName, fileLatestEditor: fileLatestEditor }
    ).then((response) => {
        return response
    }).catch((err) => {
        return err
    })

    return res
}

export default updateFileName;