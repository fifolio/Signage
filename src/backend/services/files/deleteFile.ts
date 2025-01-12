import { databases } from "@/backend/configs/configs";
import { deleteScreen } from "./deleteScreen";

export async function deleteFile(fileId: string, screenDeleteId: string): Promise<boolean> {
    try {
        // Delete the document
        await databases.deleteDocument(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DOCS}`,
            fileId
        );

        // Delete the associated screen
        const screenDeleted = await deleteScreen(screenDeleteId);

        if (!screenDeleted) {
            console.error("Screen document could not be deleted");
            return false;
        }
        return true; // Return true if both deletions were successful
    } catch (err) {
        console.error(err)
        return false;
    }
}