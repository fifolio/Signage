// UI
import { Navbar } from "@/components/common";

export default function Dashboard() {
    return (
        <>
            <header className="fixed w-full">
                <Navbar />
            </header>
            <main className="flex justify-between">
                <div className="">1</div>
                <div className="">2</div>
                <div className="">3</div>
            </main>
        </>
    )
}
