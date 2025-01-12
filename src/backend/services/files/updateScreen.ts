import { databases } from "@/backend/configs/configs";
import { Query } from "appwrite";


export async function updateScreen(
    fileId: string,
    fileData: string,
    fileVersion: number,
) {

    try {
        // Query the document by fileId
        const results = await databases.listDocuments(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DISP}`,
            [Query.equal('fileId', `${fileId}`)]
        );

        // Check if the document was found
        if (results.documents.length === 0) {
            throw new Error("Document not found");
        }

        // Get the document ID
        const screenId = results.documents[0].$id;

        // Update the document
        await databases.updateDocument(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DISP}`,
            `${screenId}`,
            { fileData: fileData, fileVersion: fileVersion }
        );

        // Return true if the updating was successful
        return true;
    } catch (error) {
        console.error("Error updating screen:", error);
        throw error;
    }
}