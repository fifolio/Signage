import { useEffect } from "react";

// ICONS
// import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";

// UI
import LoadingState from '../ui/LoadingState';

// STORES
import useIsSaving from '@/stores/footer/useIsSaving';

export default function Footer() {

    // Check on the saving status
    const { isSaving } = useIsSaving();

    useEffect(() => {
        const handleBeforeUnload = (event: { returnValue: string; }) => {
            if (isSaving) {
                const message = 'Data is still saving. Are you sure you want to leave?';
                event.returnValue = message; // Standard for most browsers
                return message; // For some older browsers
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSaving]);

    return (
        <div className="bg-white font-normal text-gray-500 text-sm w-full z-50 m-0 border-t-[1px] border-gray-200 px-3 py-2 flex justify-between items-center">

            {/* LEFT AREA */}
            <div className="flex justify-start">
                {/* PLATFORM VERSION */}
                <div>
                    SignCast Workspace v1.1.0
                </div>
            </div>

            {/* MID AREA */}
            <div className="flex justify-center items-center space-x-2">
                {isSaving ? (
                    <div className="flex items-center space-x-2">
                        <LoadingState setWidth="20" />
                        <span className="text-black">
                            Saving your changes..
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <FcOk className="!size-4" />
                        <span>File Saved</span>
                    </div>
                )}
            </div>

            {/* RIGHT AREA */}
            <div>Dimensions: 1920 × 1080 px</div>
        </div>
    )
}
