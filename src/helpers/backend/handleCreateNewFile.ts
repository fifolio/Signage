import { uid } from 'uid';
import { createNewFile } from "@/backend/services/files/createNewFile";
import { createNewScreen } from '@/backend/services/files/createNewScreen';

// Handle Create New File
async function handleCreateNewFile(fileCreator: string, fileLatestEditor: string) {
    try {
        // Step 1: Create a new file
        const newFile = await createNewFile({
            fileId: uid(),
            fileName: "Untitled file",
            fileData: "",
            fileCreator,
            fileLatestEditor,
        });

        // Step 2: Create a new screen for the file
        const newScreen = await createNewScreen({
            fileId: newFile.fileId,
            fileData: "",
        });

        // Step 3: Navigate to the new file
        window.location.href = `/${newScreen.fileId}`;
    } catch (error) {
        console.error("Error creating new file or screen:", error);
    }
}

export default handleCreateNewFile;
