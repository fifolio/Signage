import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// UI
import { Footer, Navbar } from "@/components/common";
import { Canvas, LoadingState, Manage, Tools } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area"

// STORES
import { useFileName, useFileDetails, useCanvasStore } from "@/stores";

// SERVICES
import { getFile } from "@/backend/services/files/getFile";

export default function Dashboard() {

    // get current window measurements
    const height = window.innerHeight - 90;
    const width = window.innerWidth - 370;

    // Get the file details from the URL params
    const { fileId } = useParams();

    // Loading state
    const [loadingScreen, setLoadingScreen] = useState<boolean>(true);

    // Save the file details to the store
    const { setFileDetails } = useFileDetails();

    // Get the file name from the store
    const { currentFileName, setCurrentFileName } = useFileName();

    // State to store the JSON data of the canvas
    const { setJsonData } = useCanvasStore();


    // Fetch the file details from the database
    async function getFileDetails() {
        await getFile(fileId as string)
            .then((res) => {
                setFileDetails(res);
                setCurrentFileName(res.fileName);
                setJsonData(res.fileData);
            }).finally(() => {
                setLoadingScreen(false);
            });
    };

    // Fetch the file details on page load
    useEffect(() => {
        getFileDetails();
    }, [fileId]);

    // Update the page title with the file name
    useEffect(() => {
        document.title = `${currentFileName === '' ? 'Loading...' : currentFileName} | Workspace`;
    }, [currentFileName]);

    

    // loading indicator
    if (loadingScreen) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <LoadingState setWidth="50" />
                {/* <p className="text-gray-500">Please wait..</p> */}
            </div>
        );
    }


    return (
        <>
            {/* HEADER SECTION */}
            <header className="fixed w-full">
                {/* NAVBAR */}
                <Navbar />
            </header>

            {/* MAIN SECTION */}
            <main className="flex justify-between">

                {/* TOOLS SECTION */}
                <div className="bg-white h-screen min-w-[79px] pt-[55px] border-r-[1px] border-gray-200">
                    <div className="w-full mt-3">
                        <Tools />
                    </div>
                </div>

                {/* CANVAS SECTION */}
                <ScrollArea style={{ height: height, maxWidth: width, }} className={`mt-[52.5px]`}>
                    <Canvas />
                </ScrollArea>

                {/* MANAGE SECTION */}
                <div className="block bg-white h-screen min-w-[290px] pt-[55px] border-l-[1px] border-gray-200">
                    <Manage />
                </div>
            </main>

            {/* FOOTER SECTION */}
            <footer className="fixed bottom-0 w-full">
                <Footer />
            </footer>
        </>
    )
}
