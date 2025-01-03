import { uid } from 'uid';
import { createNewFile } from "@/backend/services/files/createNewFile";

// Handle Create New File
async function handleCreateNewFile(fileCreator: string, fileLatestEditor: string) {
    await createNewFile({
        fileId: uid(),
        fileName: "Untitled file",
        fileData: "",
        fileCreator: fileCreator,
        fileLatestEditor: fileLatestEditor,
    }).then((res) => {
        console.log(res)
        // Navigate to the new file
        window.location.href = `/${res.fileId}`;
    })
};

export default handleCreateNewFile;