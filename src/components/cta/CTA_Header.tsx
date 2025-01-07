import { useState, useEffect } from "react";
import Confetti from "react-confetti";

// STORES
import useUserDataStore from "@/stores/backend/useUserDataStore";
import { useLoadingScreen } from "@/stores";

// UI
import { Button } from "../ui/button";

// ICONS
import { BiLogOut } from "react-icons/bi";

// HELPERS
import { handleLogout } from "@/helpers";

export default function CTA_Header() {

  // Loading screen
  const { setLoadingScreen } = useLoadingScreen();

  // get user data from the store
  const { userData } = useUserDataStore();

  // Is First-Time-User State
  const [isFTU, setIsFTU] = useState<boolean>(false);

  // Greeting Message State
  const [greeting, setGreeting] = useState<{
    isFTU: boolean;
    username: string;
    greetingMsg: string;
  }>({
    isFTU: false,
    username: "",
    greetingMsg: "",
  });


  function initialize() {
    setLoadingScreen(true);
    if (userData) {

      // Check if user is a First-time user
      const registrationTime = new Date(userData.registration);
      const currentTime = new Date();

      // Determine if First-Time-User based on a threshold (e.g., 10 hour)
      const thresholdInMilliseconds = 10 * 60 * 60 * 1000; // 10 hour
      const isFirstTimeUser = currentTime.getTime() - registrationTime.getTime() < thresholdInMilliseconds;
      setIsFTU(isFirstTimeUser);

      if (isFirstTimeUser) {
        // Change the page title to username
        document.title = `Welcome ${userData.name}! 🎉`;

        setGreeting({
          isFTU: true,
          username: `Welcome ${userData.name}! 🎉`,
          greetingMsg: `Excited to have you here!✨ Ready to unleash your creativity? Whether starting fresh with a new workspace or diving into an existing file, let your ideas come to life and create something truly amazing! 🚀`,
        });
      } else {
        // Change the page title to username
        document.title = `Welcome back, ${userData.name}! 👋`;

        setGreeting({
          isFTU: false,
          username: `Welcome back, ${userData.name}! 👋`,
          greetingMsg: `Great to see you again! 🌟 What's sparking your creativity today? Dive into a new workspace or breathe new life into an existing one. Let's continue making amazing things together! 🚀`,
        });
      }
    }
    setLoadingScreen(false);
  };

  useEffect(() => {
    initialize();
  }, [userData]);

  // handle Logout func.
  async function logout() {
    await handleLogout();
  }


  return (
    <>
      {/* Confetti effect for new users */}
      {isFTU && (
        <Confetti
          run={true}
          recycle={false}
          numberOfPieces={1000}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

      {/* Welcome Note */}
      <div className="text-center w-full my-6 space-y-8">
        <div className="fixed text-left m-0">
          <Button onClick={logout} variant={"destructive"} className="rounded-lg shadow-md font-semibold flex items-center space-x-2">
            <BiLogOut className="size-4" />
            Logout
          </Button>
        </div>
        <h1 className="text-5xl font-extrabold capitalize text-shadow-md">{greeting.username}</h1>
        <p className="w-[800px] text-gray-500 font-semibold mx-auto">{greeting.greetingMsg}</p>
      </div>
    </>
  );
}
