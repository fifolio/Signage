// UI
import { Footer, Navbar } from "@/components/common";
import { Canvas, Manage, Tools } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dashboard() {

    // get current window measurements
    const height = window.innerHeight - 90;
    const width = window.innerWidth - 370;


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
                <div className="hidden md:block bg-white h-screen min-w-[290px] pt-[55px] border-l-[1px] border-gray-200">
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
