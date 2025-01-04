import { databases } from "@/backend/configs/configs";


export async function deleteFile(fileId: string) {
    const results = await databases.deleteDocument(
        `${import.meta.env.VITE_DATABASES_MAIN}`,
        `${import.meta.env.VITE_COLL_DOCS}`,
        `${fileId}`
    ).then((res) => {
        return res && true;
    }).catch((err) => {
        return err && false
    })

    return results
}

