// UI
import { Navbar } from "@/components/common";
import { Tools } from "@/components";

export default function Dashboard() {
    return (
        <>
            <header className="fixed w-full">
                <Navbar />
            </header>
            <main className="flex justify-between">
                {/* TOOLS SECTION */}
                <div className="bg-white h-screen w-[80px] pt-[55px] border-r-[1px] border-gray-200">
                    <div className="w-full mt-3">
                        <Tools />
                    </div>
                </div>

                <div className="">2</div>
                <div className="">3</div>
            </main>
        </>
    )
}
