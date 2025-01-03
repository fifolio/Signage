import { useState, useEffect } from "react";

// STORES
import useUserDataStore from "@/stores/backend/useUserDataStore";

export function useGreeting() {

    // Is First-Time-User State
    const [isFTU, setIsFTU] = useState<boolean>(false);

    // Greeting Message State
    const [greeting, setGreeting] = useState<{
        isFTU: boolean;
        username: string;
        greetingMsg: string
    }>({
        isFTU: isFTU,
        username: "",
        greetingMsg: "",
    });

    // Get User Data from the store
    const userData = useUserDataStore((state) => state.userData);

    useEffect(() => {
        if (userData) {
            // Check if user is a First-time user
            const registrationTime = new Date(userData.registration);
            const accessedTime = new Date(userData.accessedAt);

            // Determine if First-Time-User
            setIsFTU(registrationTime.getTime() === accessedTime.getTime());

            if (isFTU) {
                setGreeting({
                    isFTU: true,
                    username: `Welcome ${userData.name}! 🎉`,
                    greetingMsg: `Excited to have you here! 🌟 Ready to unleash your creativity? Start a new workspace and let your ideas flow. Let's make something amazing together! 🚀`,
                });
            } else {
                setGreeting({
                    isFTU: false,
                    username: `Welcome back, ${userData.name}! 👋`,
                    greetingMsg: `Great to see you again! 🌟 What's sparking your creativity today? Dive into a new workspace or breathe new life into an existing one. Let's continue making amazing things together! 🚀`,
                });
            }
        }
    }, [userData, isFTU]);

    return greeting;
}

export function CTA_GreetingMsg() {
    const greeting = useGreeting();
    return {
        isFTU: greeting.isFTU,
        username: greeting.username,
        greetingMsg: greeting.greetingMsg
    }
}