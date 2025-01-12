import { databases } from "@/backend/configs/configs";
import { Query } from "appwrite";

export async function deleteScreen(screenDeleteId: string) {
    try {
        // Query the document by fileId
        const results = await databases.listDocuments(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DISP}`,
            [Query.equal('fileId', `${screenDeleteId}`)]
        );

        // Check if the document was found
        if (results.documents.length === 0) {
            throw new Error("Document not found");
        }

        // Get the document ID
        const screenId = results.documents[0].$id;

        // Delete the document
        await databases.deleteDocument(
            `${import.meta.env.VITE_DATABASES_MAIN}`,
            `${import.meta.env.VITE_COLL_DISP}`,
            `${screenId}`
        );

        // Return true if the deletion was successful
        return true;
    } catch (error) {
        console.error("Error deleting screen:", error);
        throw error; 
    }
}