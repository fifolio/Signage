import { useEffect } from "react";

// UI
import { CTA_Header, CTA_Main } from "@/components";

// SERVICES
import { userData } from "@/backend/services/auth/userData";

export default function CTA() {

    // get user data from the store
    useEffect(() => {
        userData();
    }, []);

    return (
        <div className="py-6 px-16">
            <CTA_Header />
            <CTA_Main />
        </div>
    )
}