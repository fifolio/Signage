// UI
import { Footer, Navbar } from "@/components/common";
import { Manage, Tools } from "@/components";

export default function Dashboard() {
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
                <div className="bg-transparent min-h-screen w-full pt-[55px]">2</div>

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
